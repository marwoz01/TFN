import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import PokemonModal from "./components/PokemonModal";

export default function App({
  pokemons,
  onSearchSubmit,
  onPokemonClick,
  isModalOpen,
  modalDetails,
  onCloseModal,
  error,
  onRetryList,
}) {
  if (error?.scope === "list") {
    return (
      <div className="error">
        <p>{error.message}</p>
        <button onClick={onRetryList}>Spróbuj ponownie</button>
      </div>
    );
  }
  return (
    <>
      <Header onSearchSubmit={onSearchSubmit} />
      <main className="container">
        <PokemonList pokemons={pokemons} onPokemonClick={onPokemonClick} />
      </main>
      <PokemonModal
        isOpen={isModalOpen}
        details={modalDetails}
        onClose={onCloseModal}
      />
    </>
  );
}
