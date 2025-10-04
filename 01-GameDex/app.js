const pokemonUl = document.getElementById("pokemon-list");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// Funkcja tworząca kartę Pokemona
function createPokemonCard(name, id) {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  return `
  <li>
    <div class="pokemon-card">
      <img src="${imgUrl}" alt="${name}">
      <h2>${name}</h2>
    </div>
  </li>
`;
}

// Funkcja do wyświetlania listy startowej Pokemonów
function showDefaultPokemons(data) {
  const { name, url } = data;
  const parts = url.split("/");
  const id = parts[parts.length - 2];
  return createPokemonCard(name, id);
}

// Funkcja do wyświetlania wyszukanego Pokemona
function showMatchingPokemons(pokemon) {
  const { name, id } = pokemon;
  pokemonUl.classList.add("single");
  pokemonUl.innerHTML = createPokemonCard(name, id);
}

// Pobieranie i renderowanie listy startowej
async function getDefaultPokemons() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();
    pokemonUl.innerHTML = data.results.map(showDefaultPokemons).join("");
    pokemonUl.classList.remove("single");
  } catch (error) {
    console.log(error);
  }
}

getDefaultPokemons();

// Funkcja do obsługi wyszukiwania
async function findPokemon() {
  try {
    const pokemonName = searchInput.value.trim().toLowerCase();

    if (!pokemonName) {
      getDefaultPokemons();
      return;
    }

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      return (pokemonUl.innerHTML = `<li>Brak wyników</li>`);
    }

    const data = await response.json();
    console.log(data);
    showMatchingPokemons(data);
  } catch (error) {
    console.log(error);
  }
}

searchBtn.addEventListener("click", findPokemon);
