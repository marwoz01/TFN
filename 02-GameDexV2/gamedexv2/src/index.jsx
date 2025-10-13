import { createRoot } from "react-dom/client";
import App from "./App";
import {
  fetchAllPokemonList,
  fetchPokemonDetails,
  fetchPokemonIdsByType,
} from "./api/pokeapi";

const root = createRoot(document.getElementById("root"));

const state = {
  allPokemons: [],
  query: "",
  visibleCount: 20,

  selectedId: null,
  selectedDetails: null,

  selectedType: "",
  typeFilterIds: null,
};

// Pobranie pokemonów z API
async function init() {
  try {
    const list = await fetchAllPokemonList();
    state.allPokemons = list;
    render();
  } catch {
    state.error = {
      scope: "list",
      message: "Nie udało się pobrać listy Pokémonów.",
    };
    render();
  }
}

// Filtrowanie wyszukiwania pokemonów
function filterPokemons(list, searchText) {
  const normalizedSearch = searchText.trim().toLowerCase();
  if (!normalizedSearch) return list;

  const isNumberSearch = /^\d+$/.test(normalizedSearch);

  return list.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(normalizedSearch) ||
      (isNumberSearch && pokemon.id === Number(normalizedSearch))
  );
}

// Zwracanie pokemonów do wyświetlenia
function getPokemonsToRender() {
  const searchActive = state.query.trim() !== "";
  let pokemonsToShow = state.allPokemons;
  // Filtrowanie po typie
  if (state.selectedType && state.typeFilterIds) {
    pokemonsToShow = pokemonsToShow.filter((pokemon) =>
      state.typeFilterIds.includes(pokemon.id)
    );
  }
  // Filtrowanie po nazwie lub numerze
  if (searchActive) {
    return filterPokemons(pokemonsToShow, state.query);
  }
  // Zwrócenie 20 pokemonów
  if (state.selectedType) {
    return pokemonsToShow;
  } else {
    return pokemonsToShow.slice(0, state.visibleCount);
  }
}
// Wyświetlanie pokemonów
function render() {
  root.render(
    <App
      pokemons={getPokemonsToRender()}
      onSearchSubmit={(text, type) => {
        state.query = text;
        state.selectedType = type || "";
        state.typeFilterIds = null;

        if (state.selectedType) {
          render();
          fetchPokemonIdsByType(state.selectedType).then((ids) => {
            state.typeFilterIds = ids;
            render();
          });
        } else {
          render();
        }
      }}
      onPokemonClick={(id) => {
        state.selectedId = id;
        state.selectedDetails = null;
        render();

        const minDelay = new Promise((resolve) => setTimeout(resolve, 500));
        Promise.all([fetchPokemonDetails(id), minDelay]).then(([details]) => {
          state.selectedDetails = details;
          render();
        });
      }}
      onCloseModal={() => {
        state.selectedId = null;
        state.selectedDetails = null;
        render();
      }}
      isModalOpen={state.selectedId != null}
      modalDetails={state.selectedDetails}
      error={state.error}
    />
  );
}

init();
