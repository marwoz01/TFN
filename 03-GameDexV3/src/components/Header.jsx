const POKEMON_TYPES = [
  "",
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export default function Header({ onSearchSubmit }) {
  return (
    <header>
      <h1>PokéDex</h1>
      <form
        className="search-bar"
        onSubmit={(e) => {
          e.preventDefault();
          const text = e.currentTarget.elements.search.value;
          const type = e.currentTarget.elements.type.value;
          onSearchSubmit(text, type);
        }}
      >
        <select name="type" className="filter-icon" title="Filtruj po typie">
          {POKEMON_TYPES.map((type) => {
            const label = type === "" ? "wszystkie typy" : type;
            return (
              <option key={label} value={type}>
                {label}
              </option>
            );
          })}
        </select>
        <input name="search" type="search" placeholder="Szukaj pokémona..." />
        <button type="submit">Szukaj</button>
      </form>
    </header>
  );
}
