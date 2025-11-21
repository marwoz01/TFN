"use client";

export default function Statistics({ books, users, loans }) {
  const totalBooks = books.reduce((sum, b) => sum + Number(b.total || 0), 0);
  const availableBooks = books.reduce(
    (sum, b) => sum + Number(b.available || 0),
    0
  );
  const borrowedBooks = Math.max(0, totalBooks - availableBooks);
  const usersCount = users.length;
  const activeLoans = loans.length;
  const cardBase =
    "flex flex-col items-center justify-center gap-1 bg-neutral-900 border border-neutral-700/60 rounded-xl p-4 shadow-md";
  const valueBase = "text-2xl font-semibold text-neutral-100";
  const labelBase = "text-sm text-neutral-400";

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <div className={cardBase}>
        <span className={valueBase}>{totalBooks}</span>
        <span className={labelBase}>Wszystkie książki</span>
      </div>
      <div className={cardBase}>
        <span className={valueBase}>{availableBooks}</span>
        <span className={labelBase}>Dostępne</span>
      </div>
      <div className={cardBase}>
        <span className={`${valueBase} text-rose-400`}>{borrowedBooks}</span>
        <span className={labelBase}>Wypożyczone</span>
      </div>
      <div className={cardBase}>
        <span className={valueBase}>{usersCount}</span>
        <span className={labelBase}>Użytkownicy</span>
      </div>
      <div className={cardBase}>
        <span className={valueBase}>{activeLoans}</span>
        <span className={labelBase}>Aktywne wypożyczenia</span>
      </div>
    </section>
  );
}
