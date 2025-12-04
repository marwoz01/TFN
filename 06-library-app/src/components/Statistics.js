export default function Statistics({ books, users, loans }) {
  const totalBooks = books.reduce((sum, book) => sum + book.total, 0);
  const availableBooks = books.reduce((sum, book) => sum + book.available, 0);
  const borrowedBooks = totalBooks - availableBooks;
  const registeredUsers = users.length;
  const activeLoans = loans.length;

  return (
    <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-lg mb-6">
      <h2 className="text-xl font-semibold text-blue-400 mb-4">
        Statystyki biblioteki
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
        <div className="bg-zinc-800 border border-zinc-700 rounded-md p-3">
          <p className="text-zinc-400">Wszystkie książki</p>
          <p className="text-2xl font-semibold text-zinc-100">{totalBooks}</p>
        </div>

        <div className="bg-zinc-800 border border-zinc-700 rounded-md p-3">
          <p className="text-zinc-400">Dostępne książki</p>
          <p className="text-2xl font-semibold text-zinc-100">
            {availableBooks}
          </p>
        </div>

        <div className="bg-zinc-800 border border-zinc-700 rounded-md p-3">
          <p className="text-zinc-400">Wypożyczone książki</p>
          <p className="text-2xl font-semibold text-zinc-100">
            {borrowedBooks}
          </p>
        </div>

        <div className="bg-zinc-800 border border-zinc-700 rounded-md p-3">
          <p className="text-zinc-400">Użytkownicy</p>
          <p className="text-2xl font-semibold text-zinc-100">
            {registeredUsers}
          </p>
        </div>

        <div className="bg-zinc-800 border border-zinc-700 rounded-md p-3">
          <p className="text-zinc-400">Aktywne wypożyczenia</p>
          <p className="text-2xl font-semibold text-zinc-100">{activeLoans}</p>
        </div>
      </div>
    </div>
  );
}
