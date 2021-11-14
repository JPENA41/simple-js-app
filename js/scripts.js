// Create pokemon_Repository to wrap pokemonList
// Create an array called pokemonList with objects containing  the pokemon's name,
// height and type.
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Check to see if the pokemon is an object as well as the name
  function add(pokemon) {
  if (typeof pokemon === "object" && "name" in pokemon) {
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
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    addEventListener(button, pokemon);
    button.setAttribute('data-target', '#modal-container');
    button.setAttribute('data-toggle', 'modal');

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
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

  // Display pokemon's details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
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
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Modal title is defined
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    // Clear the content after use to be ready for the next
    modalTitle.empty();
    modalBody.empty();

    // Details of Pokemon is defined
    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + ' dm' + '</p>');
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + ' kg' + '</p>');
    let typesElement = $('<p>' + 'Types: ' + pokemon.types.map(pokemon => ' ' + pokemon.type.name) + '</p>');
    let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities.map(pokemon => ' ' + pokemon.ability.name) + '</p>');

    let imageElement = $('<img class = "modal-img" style="width:50%">');
      imageElement.attr('src', pokemon.imageUrl);

    let imageElementBack = $('<img class = "modal-img" style="width:50%">');
      imageElementBack.attr('src', pokemon.imageUrlBack);

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    }

      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal
      };
    })();

    // Call the LoadList() function and getAll
    pokemonRepository.loadList().then(function () {
      pokemonRepository.getAll().forEach(function (pokemon) {
        // Call the addListItem() function
        pokemonRepository.addListItem(pokemon);
      });
    });

    // When button is clicked, the user goes to the top of the page
    let backbutton= document.getElementById('bck-to-top');
    window.onscroll = function() {
     scrollFunction();
    };
    function scrollFunction() {
     if (
       document.body.scrollTop > 200 ||
       document.documentElement.scrollTop > 200
     ) {
      backbutton.style.display = 'block';
     } else {
      backbutton.style.display = 'none';
     }
    }

    backbutton.addEventListener('click', backToTop);

    function backToTop() {
     document.body.scrollTop = 0;
     document.documentElement.scrollTop = 0;
    }

    // Search each Pokemon
    $(document).ready(function() {
        $('#form1').on('keyup', function() {
          let value = $(this).val().toLowerCase();
          $('.pokemon-list *').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
