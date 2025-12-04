import { useState } from "react";

export default function LoanManager({
  users,
  books,
  loans,
  onBorrowBook,
  onReturnBook,
}) {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!selectedUser || !selectedBook) {
      setError("Musisz wybrać użytkownika i książkę.");
      return;
    }

    onBorrowBook(selectedBook, selectedUser);

    setSelectedUser("");
    setSelectedBook("");
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-lg">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">
          Wypożycz książkę
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-zinc-300">Użytkownik</label>
            <select
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-zinc-200
                         focus:outline-none focus:border-blue-500"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Wybierz użytkownika</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-zinc-300">Książka</label>
            <select
              className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-zinc-200
                         focus:outline-none focus:border-blue-500"
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
            >
              <option value="">Wybierz książkę</option>
              {books
                .filter((book) => book.available > 0)
                .map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} — dostępne {book.available}/{book.total}
                  </option>
                ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
          >
            Wypożycz
          </button>
        </form>
      </div>

      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-lg">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">
          Aktywne wypożyczenia
        </h2>

        {loans.length === 0 && (
          <p className="text-zinc-400">Brak aktywnych wypożyczeń.</p>
        )}

        <div className="flex flex-col gap-3">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="bg-zinc-800 border border-zinc-700 p-3 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="text-zinc-200 font-semibold">{loan.bookTitle}</p>
                <p className="text-zinc-400 text-sm">
                  Użytkownik: {loan.userName}
                </p>
                <p className="text-zinc-500 text-sm">Data: {loan.loanDate}</p>
              </div>

              <button
                onClick={() => onReturnBook(loan.id)}
                className="px-3 py-1 rounded-md text-sm bg-zinc-700 text-zinc-100
                           hover:bg-zinc-600 transition-colors"
              >
                Zwróć
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
