export default function BookList({ books, onDeleteBook }) {
  return (
    <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-blue-400 mb-4">
        Lista książek
      </h2>

      {books.length === 0 && (
        <p className="text-zinc-400">Brak książek w bibliotece.</p>
      )}

      <div className="flex flex-col gap-3">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-zinc-800 border border-zinc-700 p-3 rounded-md flex flex-col gap-1"
          >
            <div>
              <p className="text-zinc-200 font-semibold">{book.title}</p>
              <p className="text-zinc-400 text-sm">{book.author}</p>
            </div>

            <p className="text-zinc-400 text-sm">
              Gatunek: <span className="text-zinc-300">{book.genre}</span>
            </p>

            <p className="text-zinc-400 text-sm">
              ISBN: <span className="text-zinc-300">{book.isbn}</span>
            </p>

            <p className="text-zinc-300 text-sm">
              Dostępne: <span className="text-blue-400">{book.available}</span>{" "}
              / {book.total}
            </p>

            <div className="mt-2">
              <button
                onClick={() => onDeleteBook(book.id)}
                className="px-3 py-1 rounded-md text-sm bg-zinc-700 text-zinc-100
                           hover:bg-zinc-600 transition-colors"
              >
                Usuń
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
