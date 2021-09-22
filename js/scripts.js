// Create pokemonRespository to wrap pokemonList
// Create an array called pokemonList with objects contating the pokemon's name,
// height and type.
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      types: ['Grass', 'Poison'],
      height: 0.7
    },
    {
      name: 'Ivysaur',
      types: ['Grass', 'Poison'],
      height: 1
    },
    {
      name: 'Venusaur',
      types: ['Grass', 'Poison'],
      height: 2
    }
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
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

  // Display pokemon's name when button is clicked
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  function addEventListener(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
