// Create pokemonRespository to wrap pokemonList
// Create an array called pokemonList with objects contating the pokemon's name,
// height and type.
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Check to see if the pokemon is an object as well as the name
  function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon
  ) {
    pokemonList.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
}

  function getAll() {
    return pokemonList;
  }

  // Display pokemonList with the DOM
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;

    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    addEventListener(button, pokemon);
  }

  // GET the complete list of Pokémon
  function loadList() {
   return fetch(apiUrl).then(function (response) {
     return response.json();
   }).then(function (json) {
     json.results.forEach(function (item) {
       let pokemon = {
         name: item.name,
         detailsUrl: item.url
       };
       add(pokemon);
     });
   }).catch(function (e) {
     console.error(e);
   })
 }

  // Display pokemon's name when button is clicked
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  function addEventListener(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // Expect a parameter with a pokemon object as a parameter
 //  GET the Pokémon details using the URL from the pokemon object
 // in the parameter
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Load the pokemon details from the API
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

// Call the LoadList() function and getAll
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    // Call the addListItem() function
    pokemonRepository.addListItem(pokemon);
  });
});
