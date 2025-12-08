"use client";

export default function BookList({ books, onDeleteBook }) {
  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-wide text-neutral-100">
        Lista książek
      </h2>

      {books.length === 0 ? (
        <p className="text-sm text-neutral-500">
          Brak książek do wyświetlenia.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/70 shadow-2xl">
          <table className="w-full table-auto min-h-[120px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-neutral-400 bg-neutral-900">
                <th className="py-3 px-3 font-medium">Tytuł</th>
                <th className="py-3 px-3 font-medium">Autor</th>
                <th className="py-3 px-3 font-medium">ISBN</th>
                <th className="py-3 px-3 font-medium">Gatunek</th>
                <th className="py-3 px-3 font-medium">Dostęp</th>
                <th className="py-3 px-3 font-medium">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-neutral-900 transition-colors"
                >
                  <td className="py-3 px-3 text-neutral-100 text-xs align-middle">
                    <div className="font-semibold">{book.title}</div>
                  </td>
                  <td className="py-3 px-3 text-neutral-300 text-xs align-middle text-sm">
                    {book.author}
                  </td>
                  <td className="py-3 px-3 text-neutral-300 font-mono text-xs whitespace-nowrap align-middle">
                    {book.isbn}
                  </td>
                  <td className="py-3 px-3 align-middle">
                    <span className="px-2 py-1 bg-neutral-900 rounded-full text-xs text-neutral-200 inline-block">
                      {book.genre}
                    </span>
                  </td>
                  <td className="py-3 px-3 align-middle">
                    <span
                      className={`inline-flex items-center justify-center px-2 py-1.5 rounded-full text-xs font-semibold ${
                        book.available > 0
                          ? "bg-green-900/40 text-green-400"
                          : "bg-red-900/40 text-red-400"
                      }`}
                    >
                      {book.available} / {book.total}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => onDeleteBook(book.id)}
                      disabled={book.available < book.total}
                      className={`text-xs px-3 py-1 rounded-lg transition ${
                        book.available < book.total
                          ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                      title={
                        book.available < book.total
                          ? "Nie można usunąć wypożyczonej książki"
                          : "Usuń książkę"
                      }
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
