"use client";

export default function Statistics({ books = [], users = [], loans = [] }) {
  const totalBooks = books.reduce((sum, book) => sum + (book.total || 0), 0);
  const availableBooks = books.reduce(
    (sum, book) => sum + (book.available || 0),
    0,
  );
  const borrowedBooks = totalBooks - availableBooks;

  const registeredUsers = users.length;
  const activeLoans = loans.length;

  const statCardBase =
    "flex flex-col gap-1 bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-3 shadow-xl";
  const numberBase = "text-2xl font-semibold text-white tracking-wide";
  const labelBase = "text-xs uppercase tracking-wide text-neutral-400";

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 mb-4">
      <h2 className="text-lg font-semibold tracking-wide text-neutral-100 mb-4">
        Statystyki biblioteki
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className={statCardBase}>
          <span className={labelBase}>Wszystkie książki</span>
          <span className={numberBase}>{totalBooks}</span>
        </div>

        <div className={statCardBase}>
          <span className={labelBase}>Dostępne książki</span>
          <span className={numberBase}>{availableBooks}</span>
        </div>

        <div className={statCardBase}>
          <span className={labelBase}>Wypożyczone książki</span>
          <span className={numberBase}>{borrowedBooks}</span>
        </div>

        <div className={statCardBase}>
          <span className={labelBase}>Użytkownicy</span>
          <span className={numberBase}>{registeredUsers}</span>
        </div>

        <div className={statCardBase}>
          <span className={labelBase}>Aktywne wypożyczenia</span>
          <span className={numberBase}>{activeLoans}</span>
        </div>
      </div>
    </section>
  );
}
