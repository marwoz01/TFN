"use client";

import { useState } from "react";

export default function LoanManager({
  books = [],
  users = [],
  loans = [],
  onBorrowBook,
  onReturnBook,
}) {
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState("");

  const availableBooks = books.filter((book) => book.available > 0);

  const handleBorrow = (e) => {
    e.preventDefault();
    setError("");

    if (!selectedUser) {
      setError("Wybierz użytkownika");
      return;
    }

    if (!selectedBook) {
      setError("Wybierz książkę");
      return;
    }

    const book = books.find((b) => b.id === Number(selectedBook));
    if (!book || book.available <= 0) {
      setError("Wybrana książka nie jest dostępna");
      return;
    }

    onBorrowBook({
      bookId: Number(selectedBook),
      userId: Number(selectedUser),
      bookTitle: book.title,
      userName: users.find((u) => u.id === Number(selectedUser))?.name || "",
      loanDate: new Date().toISOString(),
    });

    setSelectedBook("");
    setSelectedUser("");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold tracking-wide text-neutral-100">
        Zarządzanie wypożyczeniami
      </h2>

      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl shadow-2xl p-6">
        <h3 className="text-md font-medium text-neutral-200 mb-4">
          Nowe wypożyczenie
        </h3>

        <form onSubmit={handleBorrow} className="space-y-4">
          <div>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full rounded-xl bg-neutral-900/80 border border-neutral-700 px-4 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-cyan-400 transition"
            >
              <option value="">Wybierz użytkownika</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              className="w-full rounded-xl bg-neutral-900/80 border border-neutral-700 px-4 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-cyan-400 transition"
            >
              <option value="">Wybierz książkę</option>
              {availableBooks.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title} - {book.author} (Dostępne: {book.available})
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full mt-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 text-sm tracking-wide transition"
          >
            Wypożycz książkę
          </button>
        </form>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl">
        <h3 className="text-md font-medium text-neutral-200 p-6 pb-0 mb-4">
          Aktywne wypożyczenia
        </h3>

        {loans.length === 0 ? (
          <p className="p-6 text-sm text-neutral-500">
            Brak aktywnych wypożyczeń.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto min-h-[140px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-neutral-400 bg-neutral-950">
                  <th className="py-3 px-3 font-medium">Książka</th>
                  <th className="py-3 px-3 font-medium">Użytkownik</th>
                  <th className="py-3 px-3 font-medium">Data wypożyczenia</th>
                  <th className="py-3 px-3 font-medium">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {loans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="hover:bg-neutral-900 transition-colors"
                  >
                    <td className="py-3 px-3 text-neutral-100 text-xs align-middle">
                      <div className="font-semibold">{loan.bookTitle}</div>
                    </td>
                    <td className="py-3 px-3 text-neutral-300 text-xs align-middle">
                      {loan.userName}
                    </td>
                    <td className="py-3 px-3 text-neutral-300 text-xs align-middle">
                      {new Date(loan.loanDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 align-middle">
                      <button
                        onClick={() => onReturnBook(loan.id, loan.bookId)}
                        className="px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-medium transition"
                      >
                        Zwróć
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
