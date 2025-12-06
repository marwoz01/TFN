"use client";
import { useState } from "react";
import BookForm from "@/components/BookForm";
import BookList from "@/components/BookList";
import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";
import LoanManager from "@/components/LoanManager";
import Statistics from "@/components/Statistics";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);

  // Dodawanie książki
  const handleAddBook = (newBook) => {
    setBooks((prevBooks) => [
      ...prevBooks,
      {
        ...newBook,
        id: Date.now(),
        available: newBook.total,
      },
    ]);
  };

  // Usuwanie książki
  const handleDeleteBook = (bookId) => {
    setBooks((prevBooks) => {
      const bookToDelete = prevBooks.find((book) => book.id === bookId);
      if (bookToDelete && bookToDelete.available < bookToDelete.total) {
        alert("Nie można usunąć książki, która jest aktualnie wypożyczona");
        return prevBooks;
      }
      return prevBooks.filter((book) => book.id !== bookId);
    });
  };

  // Dodawanie użytkownika
  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // Usuwanie użytkownika
  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  // Dodawanie wypożyczenia
  const handleBorrowBook = (loanData) => {
    const newLoan = {
      id: Date.now(),
      bookId: Number(loanData.bookId),
      userId: Number(loanData.userId),
      bookTitle: loanData.bookTitle,
      userName: loanData.userName,
      loanDate: loanData.loanDate,
    };
    setLoans((prevLoans) => [...prevLoans, newLoan]);

    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === loanData.bookId
          ? { ...book, available: book.available - 1 }
          : book,
      ),
    );
  };

  // Zwrot książki
  const handleReturnBook = (loanId, bookId) => {
    setLoans((prevLoans) =>
      prevLoans.filter((loan) => loan.id !== Number(loanId)),
    );

    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === Number(bookId)
          ? { ...book, available: book.available + 1 }
          : book,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col">
      <header className="w-full border-b border-neutral-800 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-center">
          <h1 className="text-3xl font-semibold tracking-wide text-white">
            Library App
          </h1>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-6">
          <Statistics books={books} users={users} loans={loans} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <section className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-6 min-h-[460px]">
                <BookForm onAddBook={handleAddBook} />
              </section>

              <section className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-6">
                <BookList books={books} onDeleteBook={handleDeleteBook} />
              </section>
            </div>

            <div className="flex flex-col gap-6">
              <section className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-6 min-h-[460px]">
                <UserForm onAddUser={handleAddUser} users={users} />
              </section>

              <section className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-6">
                <UserList users={users} onDeleteUser={handleDeleteUser} />
              </section>
            </div>
          </div>

          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-6">
            <LoanManager
              books={books}
              users={users}
              loans={loans}
              onBorrowBook={handleBorrowBook}
              onReturnBook={handleReturnBook}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
