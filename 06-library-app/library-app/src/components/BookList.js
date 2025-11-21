"use client";
import { useState } from "react";

export default function BookList({ books, onDeleteBook }) {
  const [searchInput, setSearchInput] = useState("");

  const searchQuery = searchInput.trim().toLowerCase();
  const filteredBooks = searchQuery
    ? books.filter((book) =>
        [book.title, book.author].some((fieldValue) =>
          (fieldValue || "").toLowerCase().includes(searchQuery)
        )
      )
    : books;

  return (
    <section className="p-5 bg-neutral-900 rounded-xl border border-neutral-700/50 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-neutral-100">
          Lista książek
        </h2>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Szukaj po tytule lub autorze..."
          autoComplete="off"
          className="w-full sm:w-72 bg-neutral-800 text-neutral-100 placeholder:text-neutral-500 border border-neutral-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition"
        />
      </div>

      {filteredBooks.length === 0 ? (
        <p className="text-sm text-neutral-400">
          Brak książek do wyświetlenia.
        </p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredBooks.map((book) => {
            const totalCount = Number(book.total ?? 0);
            const availableCount = Number(book.available ?? 0);
            const borrowedCount = Math.max(0, totalCount - availableCount);
            const cannotDelete = borrowedCount > 0;

            return (
              <article
                key={book.id}
                className="bg-neutral-900 border border-neutral-700/60 rounded-2xl p-5 hover:border-rose-500/30 transition"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-semibold text-neutral-100">
                    {book.title}
                  </h3>
                  <p className="text-sm text-neutral-300">
                    Autor: {book.author}
                  </p>
                  <p className="text-xs text-neutral-500">ISBN: {book.isbn}</p>
                  <p className="text-xs text-neutral-500">
                    Gatunek: {book.genre}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-lg bg-neutral-800 text-neutral-200 border border-neutral-700/60"
                    title={`Wypożyczone: ${borrowedCount}`}
                  >
                    {availableCount} z {totalCount} dostępnych
                  </span>

                  <button
                    onClick={() => onDeleteBook(book.id)}
                    disabled={cannotDelete}
                    className={`px-3 py-1.5 text-sm rounded-lg transition border
                      ${
                        cannotDelete
                          ? "bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed"
                          : "bg-rose-600 hover:bg-rose-700 text-white border-rose-500/30 shadow-md shadow-rose-900/20"
                      }`}
                    title={
                      cannotDelete
                        ? "Nie można usunąć — książka jest wypożyczona"
                        : "Usuń książkę"
                    }
                  >
                    Usuń
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
