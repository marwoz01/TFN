const pokemonUl = document.getElementById("pokemon-list");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

async function findPokemon() {
  try {
    const pokemonName = searchInput.value.trim().toLowerCase();
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

function showMatchingPokemons(pokemon) {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  pokemonUl.innerHTML = `
  <li>
    <div class="pokemon-card">
      <img src="${imgUrl}" alt="${pokemon.name}">
      <h2>${pokemon.name}</h2>
    </div>
  </li>
`;
}

async function getDefaultPokemons() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();
    pokemonUl.innerHTML = data.results.map(showDefaultPokemons).join("");
  } catch (error) {
    console.log(error);
  }
}

function showDefaultPokemons(data) {
  const { name, url } = data;
  const parts = url.split("/");
  const id = parts[parts.length - 2];
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

getDefaultPokemons();
