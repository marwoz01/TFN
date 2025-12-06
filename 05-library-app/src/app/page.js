"use client";
import { useState, useEffect, useRef } from "react";
import BookForm from "@/components/BookForm";
import BookList from "@/components/BookList";
import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";
import LoanManager from "@/components/LoanManager";
import Statistics from "@/components/Statistics";
import ToastContainer from "@/components/ToastContainer";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [toasts, setToasts] = useState([]);

  const bookFormRef = useRef(null);
  const userFormRef = useRef(null);

  useEffect(() => {
    try {
      const savedBooks = localStorage.getItem("library-books");
      const savedUsers = localStorage.getItem("library-users");
      const savedLoans = localStorage.getItem("library-loans");

      if (savedBooks) {
        setBooks(JSON.parse(savedBooks));
      }

      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      }

      if (savedLoans) {
        setLoans(JSON.parse(savedLoans));
      }
    } catch (error) {
      console.error("Błąd przy wczytywaniu danych z localStorage:", error);
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

  const addToast = (message, type = "success", duration = 3000) => {
    setToasts((prev) => [
      ...prev,
      {
        id: Date.now(),
        message,
        type,
        duration,
      },
    ]);
  };

  const handleCloseToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

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

    addToast("Książka dodana pomyślnie", "success");

    if (bookFormRef.current) {
      bookFormRef.current.reset();
      bookFormRef.current.focusFirst();
    }
  };

  // Usuwanie książki
  const handleDeleteBook = (bookId) => {
    setBooks((prevBooks) => {
      const bookToDelete = prevBooks.find((book) => book.id === bookId);

      if (bookToDelete && bookToDelete.available < bookToDelete.total) {
        addToast(
          "Nie można usunąć książki, która jest aktualnie wypożyczona",
          "error",
        );
        return prevBooks;
      }

      return prevBooks.filter((book) => book.id !== bookId);
    });
  };

  // Dodawanie użytkownika
  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    addToast("Użytkownik dodany pomyślnie", "success");

    if (userFormRef.current) {
      userFormRef.current.reset();
      userFormRef.current.focusFirst();
    }
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
    addToast("Książka została wypożyczona", "success");
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
    addToast("Książka została zwrócona", "success");
  };

  const handleResetData = () => {
    localStorage.removeItem("library-books");
    localStorage.removeItem("library-users");
    localStorage.removeItem("library-loans");

    setBooks([]);
    setUsers([]);
    setLoans([]);

    addToast("Dane zostały zresetowane", "success");
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleResetData}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm font-medium"
            >
              Resetuj dane
            </button>
          </div>

          <Statistics books={books} users={users} loans={loans} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <section className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-6 min-h-[460px]">
                <BookForm ref={bookFormRef} onAddBook={handleAddBook} />
              </section>

              <section className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-6">
                <BookList books={books} onDeleteBook={handleDeleteBook} />
              </section>
            </div>

            <div className="flex flex-col gap-6">
              <section className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-6 min-h-[460px]">
                <UserForm
                  ref={userFormRef}
                  onAddUser={handleAddUser}
                  users={users}
                />
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
        <ToastContainer toasts={toasts} onCloseToast={handleCloseToast} />
      </main>
    </div>
  );
}
