import { useState } from "react";
import ToastContainer from "../components/ToastContainer";

export default function BookForm({ onAddBook, addToast }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [total, setTotal] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title || !author || !isbn || !genre || !total) {
      setError("Wszystkie pola są wymagane.");
      return;
    }

    if (isbn.length !== 13) {
      setError("ISBN musi mieć dokładnie 13 znaków.");
      return;
    }

    const totalNumber = Number(total);

    if (Number.isNaN(totalNumber) || totalNumber <= 0) {
      setError("Liczba egzemplarzy musi być większa od zera.");
      return;
    }

    onAddBook({
      title,
      author,
      isbn,
      genre,
      total: totalNumber,
    });

    setTitle("");
    setAuthor("");
    setIsbn("");
    setGenre("");
    setTotal("");
  };

  return (
    <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-lg">
      <h2 className="text-xl font-semibold text-blue-400 mb-4">
        Dodaj książkę
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block mb-1 text-zinc-300">Tytuł</label>
          <input
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-zinc-200
                       focus:outline-none focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-zinc-300">Autor</label>
          <input
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-zinc-200
                       focus:outline-none focus:border-blue-500"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-zinc-300">ISBN (13 cyfr)</label>
          <input
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-zinc-200
                       focus:outline-none focus:border-blue-500"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-zinc-300">Gatunek</label>
          <input
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-zinc-200
                       focus:outline-none focus:border-blue-500"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-zinc-300">Liczba egzemplarzy</label>
          <input
            type="number"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-zinc-200
                       focus:outline-none focus:border-blue-500"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

        <button
          type="submit"
          className="mt-2 inline-flex justify-center items-center px-4 py-2 rounded-md
                     bg-blue-600 text-white font-medium hover:bg-blue-500
                     transition-colors"
        >
          Dodaj książkę
        </button>
      </form>
    </div>
  );
}
