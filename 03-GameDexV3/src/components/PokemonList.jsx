import PokemonCard from "./PokemonCard";
export default function PokemonList({ pokemons, onPokemonClick }) {
  return (
    <ul className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <li
          key={pokemon.id}
          className="pokemon"
          onClick={() => onPokemonClick(pokemon.id)}
        >
          <PokemonCard
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
          />
        </li>
      ))}
    </ul>
  );
}
