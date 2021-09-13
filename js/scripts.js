// Create an array called pokemonList with objects contating the pokemon's name, height and type.
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

// Created a for loop that iterates over each item in pokemonList.
for (let i=0; i < pokemonList.length; i++){
// Created two variable "pokemonList.name" and "pokemonlist.height."
  let pokemonName = pokemonList[i].name;
  let pokemonHeight = pokemonList[i].height;

  if (pokemonList[i].height > 1.5){
    document.write(
      '<p>' +
      pokemonName +
      ' ' +
      '(height: ' +
      pokemonHeight +
      ')' +
      " - Wow, that's big!" +
      '</p>'
  );
} else {
  document.write(
    '<p>' + pokemonName + ' ' + '(height: ' + pokemonHeight + ')' + '</p>'
  );
}
}
