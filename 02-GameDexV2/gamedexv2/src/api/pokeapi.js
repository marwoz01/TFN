export async function fetchAllPokemonList() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20000&offset=0"
  );
  const data = await response.json();

  return data.results.map(({ name, url }) => {
    const id = Number(url.match(/\/pokemon\/(\d+)\//)[1]);
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    return { id, name, image };
  });
}

export async function fetchPokemonDetails(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
    height: data.height,
    weight: data.weight,
    types: data.types.map((t) => t.type.name),
    abilities: data.abilities.map(({ ability, is_hidden }) => ({
      name: ability.name,
      hidden: is_hidden,
    })),
    stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
  };
}

export async function fetchPokemonIdsByType(typeName) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
  const data = await res.json();
  return data.pokemon.map(({ pokemon }) => {
    return Number(pokemon.url.match(/\/pokemon\/(\d+)\//)[1]);
  });
}
