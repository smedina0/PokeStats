// Pokemon Scripts
let pokemonData;

const empty = "";

// Pokemon Stats
const $hp = $('#hp');
const $atk = $('#atk');
const $def = $('#def');
const $specialAtk = $('#specialAtk');
const $specialDef = $('#specialDef');
const $speed = $('#speed');
const $nameReplace = $('#pkmnName');
const $pokemonImg = $('#pokemonImg');
const $typed = $('#typed');
const $type1 = $('#type1');

// Damage Changes

const $doubleDamage = $('#doubleDamage');


// Taking the input
const $input = $('input[type="text"]');

$("form").on("submit", handleGetData);

function handleGetData(event) {
  event.preventDefault()
  pokemonName = $input.val().toLowerCase();
  $input.val('');
  $('#doubleDamageList').empty()
  $('#halfDamageList').empty()
  $('#noDamageList').empty()
  $('#regularDamage').empty()
  
$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/" + pokemonName,
  }).then(
    (data) => {
      pokemonData = data;
      statSet();
    if(pokemonData.types.length == 1){
      determineType1();
    }

    if(pokemonData.types.length == 2){
      determineType2();
    }


    },
    (error) => {
      console.log("bad request: ", error)
    }
  )
}

  function statSet() {
    $hp.text(pokemonData.stats['0'].base_stat);
    $atk.text(pokemonData.stats['1'].base_stat);
    $def.text(pokemonData.stats['2'].base_stat);
    $specialAtk.text(pokemonData.stats['3'].base_stat);
    $specialDef.text(pokemonData.stats['4'].base_stat);
    $speed.text(pokemonData.stats['5'].base_stat);
    $nameReplace.text(pokemonData.name)
    $pokemonImg.attr("src",pokemonData.sprites.front_default);
    
  }


  // This function will only run if the pokemon has one type
  function determineType1() {

    $pokemonType1 = pokemonData.types[0].type.name;
    console.log("pokemon first type is " + $pokemonType1);
    $typed.text($pokemonType1);
    $type1.text($pokemonType1);

    // When the first type is determined, it's weaknesses will be determined
    determineWeakness1()
   
  }

  //this function will only run if the pokemon has two types
  function determineType2() {
    
    $pokemonType1 = pokemonData.types[0].type.name;
    $pokemonType2 = pokemonData.types[1].type.name;
    console.log("pokemon with two types is " + $pokemonType1 + " and " + $pokemonType2);
    $typed.text($pokemonType1 + "/" + $pokemonType2);
    determineWeakness1();
    determineWeakness2();
  
  }


// Type logic




function determineWeakness1() {
  $.ajax({
    url: "https://pokeapi.co/api/v2/type/" + $pokemonType1,
  }).then(
    (data) => {
      damageType1 = data;
      // console.log(data)

      assignDamage1()
  
    },
    (error) => {
      console.log("bad request: ", error)
    }
  )
}

function determineWeakness2() {
  $.ajax({
    url: "https://pokeapi.co/api/v2/type/" + $pokemonType2,
  }).then(
    (data) => {
      damageType2 = data;
      assignDamage2();
    },
    (error) => {
      console.log("bad request: ", error)
    }
  )
}

// FIRST TYPE


// This determines the first type's values and assigns them to a location in the dom appropriate with their relative effectiveness

function assignDamage1(){

  // Initializing Damage Arrays for first type

  const doubleDamageArr1 = [];
  const halfDamageArr1 = [];
  

  // This ensures all types that are not mentioned are indicated as "normal" damage

  $("#regularDamage").append(`<li> All other types</li>`)
  
  // These for loops go through all damage relation arrays and lists the specific types associated with each damage change for the first type

  for (let i = 0; i < damageType1.damage_relations.double_damage_from.length; i++) {
    // console.log(damageType1.damage_relations.double_damage_from[i].name)  
 
    $("#doubleDamageList").append(`<li>${damageType1.damage_relations.double_damage_from[i].name}</li>`);

    // This creates an array containing all double damage weaknesses to the first type
  
   doubleDamageArr1.push(damageType1.damage_relations.double_damage_from[i].name);
  }

   // logs the new array for testing
   console.log("double damage array for first type is " + doubleDamageArr1);

  for (let i = 0; i < damageType1.damage_relations.half_damage_from.length; i++) {
    $("#halfDamageList").append(`<li>${damageType1.damage_relations.half_damage_from[i].name}</li>`)

     // This creates an array containing all half damage weaknesses to the first type
  
   halfDamageArr1.push(damageType1.damage_relations.half_damage_from[i].name);
  }

  console.log("half damage array for first type is " + halfDamageArr1);

  for (let i = 0; i < damageType1.damage_relations.no_damage_from.length; i++) {
    // console.log(damageType1.damage_relations.half_damage_from[i].name)
    $("#noDamageList").append(`<li>${damageType1.damage_relations.no_damage_from[i].name}</li>`)

  }
}


// SECOND TYPE


// This determines the second type's values and assigns them to a location in the dom appropriate with their relative effectiveness
  function assignDamage2(){

    // Initializing Damage Arrays for second type
  const doubleDamageArr2 = [];
  const halfDamageArr2 = [];



  for (let i = 0; i < damageType2.damage_relations.double_damage_from.length; i++) {
 
    // console.log(damageType2.damage_relations.double_damage_from[i].name)
    $("#doubleDamageList").append(`<li>${damageType2.damage_relations.double_damage_from[i].name}</li>`);
 
   

// This creates an array containing all double damage weaknesses to the second type
  
doubleDamageArr2.push(damageType2.damage_relations.double_damage_from[i].name);

// logs the new array for testing


  }

  console.log("double damage array for second type is " + doubleDamageArr2);

  for (let i = 0; i < damageType2.damage_relations.half_damage_from.length; i++) {
    $("#halfDamageList").append(`<li>${damageType2.damage_relations.half_damage_from[i].name}</li>`)


     // This creates an array containing all half damage weaknesses to the first type
  
   halfDamageArr2.push(damageType1.damage_relations.half_damage_from[i].name);

  }

  console.log("half damage array for second type is " + halfDamageArr2);

  for (let i = 0; i < damageType2.damage_relations.no_damage_from.length; i++) {
    // console.log(damageType1.damage_relations.half_damage_from[i].name)
    $("#noDamageList").append(`<li>${damageType2.damage_relations.no_damage_from[i].name}</li>`)

  }

  

 



//pseudo code for what I want:
// I want to check if any of the damage relation values are the same or different for both of the types
// I want to take that and use it to add a value of 4x of 1/4 damage, which are currently not included in the API



}