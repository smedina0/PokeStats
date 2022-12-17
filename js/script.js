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
      // console.log(data)
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
      console.log(data)

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

function assignDamage1(){

  $("#regularDamage").append(`<li> All other types</li>`)
  

  for (let i = 0; i < damageType1.damage_relations.double_damage_from.length; i++) {
 
    $("#doubleDamageList").append(`<li>${damageType1.damage_relations.double_damage_from[i].name}</li>`)
  }

  for (let i = 0; i < damageType1.damage_relations.half_damage_from.length; i++) {
    $("#halfDamageList").append(`<li>${damageType1.damage_relations.half_damage_from[i].name}</li>`)
  }

  for (let i = 0; i < damageType1.damage_relations.no_damage_from.length; i++) {
    // console.log(damageType1.damage_relations.half_damage_from[i].name)
    $("#noDamageList").append(`<li>${damageType1.damage_relations.no_damage_from[i].name}</li>`)

  }
}
  function assignDamage2(){

  for (let i = 0; i < damageType2.damage_relations.double_damage_from.length; i++) {
 
    $("#doubleDamageList").append(`<li>${damageType2.damage_relations.double_damage_from[i].name}</li>`)
    // If statement - check type for first and if it compares (use i -- )
  }

  for (let i = 0; i < damageType2.damage_relations.half_damage_from.length; i++) {
    $("#halfDamageList").append(`<li>${damageType2.damage_relations.half_damage_from[i].name}</li>`)
  }

  for (let i = 0; i < damageType2.damage_relations.no_damage_from.length; i++) {
    // console.log(damageType1.damage_relations.half_damage_from[i].name)
    $("#noDamageList").append(`<li>${damageType2.damage_relations.no_damage_from[i].name}</li>`)

  }



  
  // $doubleDamage.text(damageType1.damage_relations.double_damage_from['0'].name);
  // console.log(damageType1.damage_relations.double_damage_from['0'].name)

}