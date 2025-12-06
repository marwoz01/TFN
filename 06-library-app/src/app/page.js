"use client";

import { useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import LoanManager from "../components/LoanManager";
import Statistics from "../components/Statistics";
import ToastContainer from "../components/ToastContainer";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleAddBook = (bookData) => {
    setBooks((prevBooks) => [
      ...prevBooks,
      {
        id: Date.now(),
        title: bookData.title,
        author: bookData.author,
        isbn: bookData.isbn,
        genre: bookData.genre,
        total: bookData.total,
        available: bookData.total,
      },
    ]);
    addToast("Książka dodana pomyślnie", "success");
  };

  const handleDeleteBook = (bookId) => {
    const hasActiveLoan = loans.some((loan) => loan.bookId === bookId);
    if (hasActiveLoan) {
      alert("Nie można usunąć książki, która jest aktualnie wypożyczona.");
      return;
    }
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    addToast("Książka usunięta pomyślnie", "success");
  };

  const handleAddUser = (userData) => {
    setUsers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
      },
    ]);
    addToast("Użytkownik dodany pomyślnie", "success");
  };

  const handleDeleteUser = (userId) => {
    const hasActiveLoan = loans.some((loan) => loan.userId === userId);
    if (hasActiveLoan) {
      alert("Nie można usunąć użytkownika z aktywnymi wypożyczeniami.");
      return;
    }
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    addToast("Użytkownik usunięty pomyślnie", "success");
  };

  const handleBorrowBook = (bookIdFromForm, userIdFromForm) => {
    const bookId = Number(bookIdFromForm);
    const userId = Number(userIdFromForm);

    const book = books.find((b) => b.id === bookId);
    const user = users.find((u) => u.id === userId);
    if (!book || !user) return;

    if (book.available <= 0) {
      addToast("Ta książka nie jest dostępna do wypożyczenia", "error");
      return;
    }

    const newLoan = {
      id: Date.now(),
      bookId,
      userId,
      bookTitle: book.title,
      userName: user.name,
      loanDate: new Date().toLocaleDateString(),
    };

    setLoans((prev) => [...prev, newLoan]);

    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId ? { ...b, available: b.available - 1 } : b
      )
    );
  };

  const handleReturnBook = (loanId) => {
    const loan = loans.find((l) => l.id === loanId);
    if (!loan) return;

    setBooks((prev) =>
      prev.map((b) =>
        b.id === loan.bookId ? { ...b, available: b.available + 1 } : b
      )
    );

    setLoans((prev) => prev.filter((l) => l.id !== loanId));
    addToast("Książka zwrócona pomyślnie", "success");
  };

  return (
    <>
      <main className="min-h-screen bg-zinc-900 text-zinc-200">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4 text-blue-400">Biblioteka</h1>

          <Statistics books={books} users={users} loans={loans} />

          <section className="grid gap-6 md:grid-cols-2">
            <BookForm onAddBook={handleAddBook} />
            <BookList books={books} onDeleteBook={handleDeleteBook} />
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <UserForm onAddUser={handleAddUser} existingUsers={users} />
            <UserList
              users={users}
              loans={loans}
              onDeleteUser={handleDeleteUser}
            />
          </section>

          <section className="mt-8">
            <LoanManager
              users={users}
              books={books}
              loans={loans}
              onBorrowBook={handleBorrowBook}
              onReturnBook={handleReturnBook}
            />
          </section>
        </div>
      </main>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}
