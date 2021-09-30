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

  // Display pokemon's details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // Make the modal container a global varaible
  let modalContainer = document.querySelector('#modal-container');

  // Created a modal to show each pokemon and details
    function showModal(pokemon) {

        // Remove all existing modal content
        modalContainer.innerHTML = '';

        // Created a div within the modal container
        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Created a close button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        // Created Modal title
        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        // Created an element for pokemon's height
        let contentElement = document.createElement('p');
        contentElement.innerText = 'Height: ' + pokemon.height

        // Display pokemon front sprite
        let container = document.querySelector('#image-container');
        let contentImage = document.createElement('img');
        contentImage.classList.add('content-image');
        contentImage.src = pokemon.imageUrl;

        // Appended each new element created to it's parent element.
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(contentImage);
        modalContainer.appendChild(modal);

        // Added the is-visible class to the modal when the function is called.
        modalContainer.classList.add('is-visible');
      }

      // Created a function to hide the modal.
      function hideModal() {
        modalContainer.classList.remove('is-visible');
      }

      // Hide modal when 'Esc' button is pressed
      window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modalContainer.classList. contains('is-visible')) {
              hideModal();
          }
      });

      // Hide modal when modal container is clicked out
      modalContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === modalContainer) {
              hideModal();
          }
      });

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
          showModal(item);
        });
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
