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
// const $pokemonType = $('#pokemonType')


// Taking the input
const $input = $('input[type="text"]');

$("form").on("submit", handleGetData);

function handleGetData(event) {
  event.preventDefault()
  pokemonName = $input.val().toLowerCase();
  $input.val('');
$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/" + pokemonName,
  }).then(
    (data) => {
      pokemonData = data;
      console.log(data)
      statSet();
      weakStrengthSet();

      
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

  function weakStrengthSet() {
    $pokemonType = pokemonData.types[0].type.name;
  }