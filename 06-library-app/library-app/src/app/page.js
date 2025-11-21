"use client";
import { useState, useEffect } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import LoanManager from "../components/LoanManager";
import Statistics from "../components/Statistics";
import dynamic from "next/dynamic";

const ToastContainer = dynamic(() => import("../components/ToastContainer"), {
  ssr: false,
});

export default function Home() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const savedBooks = localStorage.getItem("library-books");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
    const savedUsers = localStorage.getItem("library-users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    const savedLoans = localStorage.getItem("library-loans");
    if (savedLoans) {
      setLoans(JSON.parse(savedLoans));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("library-books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("library-users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("library-loans", JSON.stringify(loans));
  }, [loans]);

  function addToast(message, type = "success", duration = 3000) {
    setToasts((prev) => [
      ...prev,
      {
        id: Date.now(),
        message,
        type,
        duration,
      },
    ]);
  }

  function removeToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  // --- WYPOŻYCZENIA ---
  function handleBorrowBook(bookId, userId) {
    const book = books.find((b) => b.id === bookId);
    const user = users.find((u) => u.id === userId);
    if (!book || !user) return;

    const newLoan = {
      id: Date.now(),
      bookId,
      userId,
      bookTitle: book.title,
      userName: user.name,
      loanDate: new Date().toLocaleDateString("pl-PL"),
    };

    setLoans((prev) => [newLoan, ...prev]);
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId ? { ...b, available: b.available - 1 } : b
      )
    );
    addToast("Wypożyczono książkę");
  }

  function handleReturnBook(loanId) {
    const loan = loans.find((l) => l.id === loanId);
    if (!loan) return;

    setLoans((prev) => prev.filter((l) => l.id !== loanId));
    setBooks((prev) =>
      prev.map((b) =>
        b.id === loan.bookId ? { ...b, available: b.available + 1 } : b
      )
    );
    addToast("Zwrócono książkę");
  }

  // --- KSIĄŻKI ---
  function handleAddBook(data) {
    const newBook = {
      id: Date.now(),
      title: data.title,
      author: data.author,
      isbn: data.isbn,
      genre: data.genre,
      total: Number(data.total),
      available: Number(data.total),
    };
    setBooks((prev) => [newBook, ...prev]);
    addToast("Dodano książkę");
  }

  function handleDeleteBook(bookId) {
    const book = books.find((b) => b.id === bookId);
    if (!book) return;
    if (book.available !== book.total) {
      addToast("Nie można usunąć książki, która jest wypożyczona.", "error");
      return;
    }
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    addToast("Usunięto książkę");
  }

  // --- UŻYTKOWNICY ---
  function handleAddUser(data) {
    const normalizedEmail = String(data.email).trim().toLowerCase();
    const exists = users.some(
      (u) => String(u.email).trim().toLowerCase() === normalizedEmail
    );
    if (exists) {
      addToast("Użytkownik z takim adresem e-mail już istnieje", "error");
      return;
    }
    const newUser = {
      id: Date.now(),
      name: data.name,
      email: normalizedEmail,
    };
    setUsers((prev) => [newUser, ...prev]);
    addToast("Dodano użytkownika");
  }

  function handleDeleteUser(userId) {
    const hasLoans = loans.some((l) => l.userId === userId);
    if (hasLoans) {
      addToast(
        "Nie można usunąć użytkownika z aktywnymi wypożyczeniami.",
        "error"
      );
      return;
    }
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    addToast("Usunięto użytkownika");
  }

  function handleResetData() {
    setBooks([]);
    setUsers([]);
    setLoans([]);
    addToast("Zresetowano dane biblioteki");
    localStorage.removeItem("library-books");
    localStorage.removeItem("library-users");
    localStorage.removeItem("library-loans");
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Statistics books={books} users={users} loans={loans} />

        <button
          onClick={handleResetData}
          className="px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-sm"
        >
          Resetuj dane
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          <BookForm onAddBook={handleAddBook} addToast={addToast} />
          <UserForm
            users={users}
            onAddUser={handleAddUser}
            addToast={addToast}
          />
          <BookList books={books} onDeleteBook={handleDeleteBook} />
          <UserList
            users={users}
            loans={loans}
            onDeleteUser={handleDeleteUser}
          />
        </div>

        <LoanManager
          books={books}
          users={users}
          loans={loans}
          onBorrowBook={handleBorrowBook}
          onReturnBook={handleReturnBook}
          addToast={addToast}
        />

        <ToastContainer toasts={toasts} onClose={removeToast} />
      </div>
    </main>
  );
}
