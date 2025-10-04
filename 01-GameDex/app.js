async function show20Pokemons() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

show20Pokemons();
