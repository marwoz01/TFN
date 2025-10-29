// src/api/pokeapi.js
const API = "https://pokeapi.co/api/v2";

export async function fetchPokemons(offset = 0, limit = 20) {
  const res = await fetch(`${API}/pokemon?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to load Pokemon list");
  return res.json();
}

export async function fetchPokemon(nameOrId) {
  const res = await fetch(`${API}/pokemon/${nameOrId}`);
  if (!res.ok) throw new Error("Failed to load Pokemon");
  return res.json();
}

export const fetchAllPokemonList = (offset = 0, limit = 20) =>
  fetchPokemons(offset, limit);

export const fetchPokemonDetails = (nameOrId) => fetchPokemon(nameOrId);

export async function fetchPokemonIdsByType(type) {
  const res = await fetch(`${API}/type/${type}`);
  if (!res.ok) throw new Error("Failed to load by type");
  const data = await res.json();
  return data.pokemon
    .map((p) => {
      const m = p.pokemon.url.match(/\/pokemon\/(\d+)\//);
      return m ? Number(m[1]) : null;
    })
    .filter(Boolean);
}
