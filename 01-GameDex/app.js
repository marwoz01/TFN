const pokemonUl = document.getElementById("pokemon-list");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const modal = document.getElementById("pokemon-modal");
const modalContent = document.getElementById("modal-content");
const closeBtn = document.getElementById("close-btn");
const modalBody = document.getElementById("modal-body");

// Funkcja tworząca kartę Pokemona
function createPokemonCard(name, id) {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  return `
  <li>
    <div class="pokemon-card" data-id="${id}">
      <img src="${imgUrl}" alt="${name}">
      <h5>#${id}</h5>
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
  pokemonUl.innerHTML = createPokemonCard(name, id);
}

// Pobieranie i renderowanie listy startowej
async function getDefaultPokemons() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();
    pokemonUl.innerHTML = data.results.map(showDefaultPokemons).join("");
  } catch (error) {
    console.log(error);
  }
}

getDefaultPokemons();

// Funkcja do obsługi wyszukiwania
async function findPokemon() {
  const pokemonName = searchInput.value.trim().toLowerCase();

  if (!pokemonName) {
    getDefaultPokemons();
    return;
  }

  pokemonUl.innerHTML = "<li>Ładowanie...</li>";
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (!response.ok) {
      return (pokemonUl.innerHTML = `<li>Brak wyników</li>`);
    }
    const data = await response.json();
    setTimeout(() => {
      showMatchingPokemons(data);
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}

// Wyszukiwanie
searchBtn.addEventListener("click", findPokemon);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    findPokemon();
  }
});

// Otwarcie modala
pokemonUl.addEventListener("click", async (e) => {
  const card = e.target.closest(".pokemon-card");
  if (!card) return;
  const id = card.dataset.id;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  modal.classList.remove("hidden");
  modalBody.innerHTML = "Ładowanie…";
  if (!response.ok) {
    modalBody.textContent = "Nie udało się pobrać szczegółów.";
    return;
  }
  const data = await response.json();

  const statsGrid = data.stats
    .map(
      (s) => `
    <div class="stat-name">${s.stat.name.toUpperCase()}</div>
    <div class="stat-value">${s.base_stat}</div>
  `
    )
    .join("");

  setTimeout(() => {
    modalBody.innerHTML = `
        <div class="modal-header">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${
      data.name
    }">
          <h3>#${id} ${data.name.toUpperCase()}</h3>
        </div>
        <div class="modal-info">
          <p><strong>Typ:</strong> ${data.types
            .map((t) => t.type.name)
            .join(", ")}</p>
          <p><strong>Wzrost:</strong> ${data.height * 10} cm</p>
          <p><strong>Waga:</strong> ${data.weight / 10} kg</p>
          <p><strong>Umiejętności:</strong> ${data.abilities
            .map((a) => a.ability.name)
            .join(", ")}</p>
        </div>
        <h4>Statystyki bazowe</h4>
        <div class="stats-grid">${statsGrid}</div>
      `;
  }, 1000);
});

// Zamknięcie po kliknięciu w krzyżyk
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Zamknięcie po kliknięciu w tło
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});
