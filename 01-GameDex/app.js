const pokemonUl = document.getElementById("pokemon-list");

async function show20Pokemons() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();

    pokemonUl.innerHTML = data.results.map(renderPokemon).join("");

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function renderPokemon(data) {
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

show20Pokemons();
