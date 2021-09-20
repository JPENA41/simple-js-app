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

  return {
    getAll: getAll,
    add: add
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(pokemon.name + " (height: " + pokemon.height + ")" + "<p>");
});
