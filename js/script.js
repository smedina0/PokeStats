// Javascript Variables





// Pokemon Scripts
let pokemonName = "";

const promise = $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/" + pokemonName,
  })
  
  promise.then(
    (data) => {
      console.log(data)
    },
    (error) => {
      console.log("bad request: ", error)
    }
  )
