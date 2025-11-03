const pokemonListElement = document.getElementById("pokemonList");
const searchInputElement = document.getElementById("searchInput");
const searchButtonElement = document.getElementById("searchBtn");

const modalEl = document.getElementById("modal");
const modalBodyEl = document.getElementById("modalBody");
const modalCloseEl = document.getElementById("modalClose");
const modalBackdropEl = document.getElementById("modalBackdrop");

const loaderEl = document.getElementById("loader");

function showLoader() {
  loaderEl.classList.remove("hidden");
}

function hideLoader() {
  loaderEl.classList.add("hidden");
}

const getPokemonIdFromUrl = (url) => url.split("/").filter(Boolean).pop();

function renderPokemonItem(pokemon) {
  const pokemonId = getPokemonIdFromUrl(pokemon.url);
  const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  return `
    <li class="pokemon-item" data-id="${pokemonId}">
      <img src="${pokemonImageUrl}" alt="${pokemon.name}" loading="lazy" width="56" height="56">
      <span class="name">${pokemon.name}</span>
      <span class="id">#${pokemonId}</span>
    </li>`;
}

function renderPokemonList(pokemonList) {
  pokemonListElement.innerHTML = pokemonList.length
    ? pokemonList.map(renderPokemonItem).join("")
    : `<p>Brak wyników.</p>`;
}

let starterPokemonList = [];

async function loadStarterPokemonList() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    );
    if (!response.ok)
      throw new Error("Błąd podczas pobierania listy Pokémonów");
    const data = await response.json();
    renderPokemonList(data.results);
    starterPokemonList = data.results;
  } catch (error) {
    console.error(error);
    pokemonListElement.innerHTML = "<p>Nie udało się pobrać listy.</p>";
  }
}

let allPokemonIndex = null;
async function getAllPokemonIndex() {
  if (allPokemonIndex) return allPokemonIndex;
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0"
  );
  if (!response.ok)
    throw new Error("Nie udało się pobrać pełnej listy Pokémonów");
  const data = await response.json();
  allPokemonIndex = data.results;
  return allPokemonIndex;
}

async function handleSearch() {
  const searchTerm = searchInputElement.value.trim().toLowerCase();
  showLoader();

  // opóźnienie
  const delay = new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    if (!searchTerm) {
      await delay;
      renderPokemonList(starterPokemonList);
      hideLoader();
      return;
    }

    try {
      const exactResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );
      if (exactResponse.ok) {
        const pokemonData = await exactResponse.json();
        const singlePokemonList = [
          {
            name: pokemonData.name,
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonData.id}/`,
          },
        ];
        await delay;
        renderPokemonList(singlePokemonList);
        hideLoader();
        return;
      }
    } catch (_) {}

    // wyszukiwanie fragmentu
    const pokemonIndex = await getAllPokemonIndex();
    const filteredPokemonList = pokemonIndex
      .filter((pokemon) => pokemon.name.includes(searchTerm))
      .slice(0, 20);

    await delay;
    renderPokemonList(filteredPokemonList);
  } catch (error) {
    console.error(error);
    await delay;
    pokemonListElement.innerHTML = "<p>Nie udało się wyszukać Pokémonów.</p>";
  } finally {
    hideLoader();
  }
}

/* szczegóły Pokemona  */

function openModal() {
  modalEl.classList.remove("hidden");
  modalEl.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modalEl.classList.add("hidden");
  modalEl.setAttribute("aria-hidden", "true");
  modalBodyEl.innerHTML = "";
}

async function showPokemonDetails(id) {
  modalBodyEl.textContent = "Ładowanie…";
  openModal();

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error("Nie udało się pobrać szczegółów Pokémona");
    const d = await res.json();

    const types = d.types.map((t) => t.type.name).join(", ");
    const stats = d.stats
      .map((s) => `${s.stat.name}: ${s.base_stat}`)
      .join("<br>");
    const artwork =
      d.sprites?.other?.["official-artwork"]?.front_default ||
      d.sprites?.front_default ||
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    modalBodyEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
        <img src="${artwork}" alt="${d.name}" width="96" height="96">
        <div>
          <h2 style="margin:0;text-transform:capitalize;">${d.name}</h2>
          <div>#${String(d.id).padStart(3, "0")}</div>
        </div>
      </div>
      <p><strong>Typy:</strong> ${types}</p>
      <p><strong>Wzrost:</strong> ${d.height}</p>
      <p><strong>Waga:</strong> ${d.weight}</p>
      <p><strong>Statystyki:</strong><br>${stats}</p>
    `;
  } catch (error) {
    console.error(error);
    modalBodyEl.innerHTML = "<p>Nie udało się pobrać szczegółów.</p>";
  }
}

/* pokaż modal */
pokemonListElement.addEventListener("click", (e) => {
  const item = e.target.closest(".pokemon-item");
  if (!item) return;
  const id = item.dataset.id;
  if (id) showPokemonDetails(id);
});

/* zamykanie modala */
modalCloseEl.addEventListener("click", closeModal);
modalBackdropEl.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* wyszukiwarka */
searchButtonElement.addEventListener("click", handleSearch);
searchInputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") handleSearch();
});

/* start */
loadStarterPokemonList();
