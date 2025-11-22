"use client";
import { useState } from "react";

export default function LoanManager({
  books,
  users,
  loans,
  onBorrowBook,
  onReturnBook,
  addToast,
}) {
  const [form, setForm] = useState({ userId: "", bookId: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.userId || !form.bookId) {
      addToast("Wybierz użytkownika i książkę", "error");
      return;
    }

    const book = books.find((b) => b.id === Number(form.bookId));
    if (!book || book.available <= 0) {
      addToast("Ta książka nie jest dostępna do wypożyczenia", "error");
      return;
    }

    onBorrowBook(Number(form.bookId), Number(form.userId));
    setForm({ userId: "", bookId: "" });
  }

  return (
    <section className="p-5 bg-neutral-900 rounded-xl border border-neutral-700/50 shadow-2xl text-neutral-200 space-y-4">
      <h2 className="text-lg font-semibold text-neutral-100 tracking-wide">
        Zarządzanie wypożyczeniami
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <select
          name="userId"
          value={form.userId}
          onChange={handleChange}
          className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition"
        >
          <option value="">Wybierz użytkownika</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          name="bookId"
          value={form.bookId}
          onChange={handleChange}
          className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition"
        >
          <option value="">Wybierz książkę</option>
          {books
            .filter((b) => b.available > 0)
            .map((book) => (
              <option key={book.id} value={book.id}>
                {book.title} ({book.available} dostępnych)
              </option>
            ))}
        </select>

        <button
          type="submit"
          className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-lg border border-rose-500/30 shadow-md shadow-rose-900/20 transition"
        >
          Wypożycz
        </button>
      </form>

      <div>
        <h3 className="text-md font-semibold mb-2 text-neutral-100">
          Aktywne wypożyczenia
        </h3>
        {loans.length === 0 ? (
          <p className="text-sm text-neutral-400">Brak aktywnych wypożyczeń.</p>
        ) : (
          <ul className="space-y-3">
            {loans.map((loan) => (
              <li
                key={loan.id}
                className="flex items-center justify-between gap-4 bg-neutral-900 border border-neutral-700/60 rounded-2xl p-4 hover:border-rose-500/30 transition"
              >
                <div>
                  <p className="font-medium text-neutral-100">
                    {loan.bookTitle}
                  </p>
                  <p className="text-sm text-neutral-400">
                    Wypożyczona przez: {loan.userName}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Data: {loan.loanDate}
                  </p>
                </div>
                <button
                  onClick={() => onReturnBook(loan.id)}
                  className="px-3 py-1.5 text-sm rounded-lg transition border bg-rose-600 hover:bg-rose-700 text-white border-rose-500/30 shadow-md shadow-rose-900/20"
                >
                  Zwróć
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
