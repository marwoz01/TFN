"use client";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const BookForm = forwardRef(function BookForm({ onAddBook, addToast }, ref) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    total: "",
  });

  const firstInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    reset() {
      setForm({ title: "", author: "", isbn: "", genre: "", total: "" });
    },
    focusFirst() {
      firstInputRef.current?.focus();
    },
  }));

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.title ||
      !form.author ||
      !form.isbn ||
      !form.genre ||
      !form.total
    ) {
      addToast("Wszystkie pola są wymagane", "error");
      return;
    }

    const cleanedIsbn = form.isbn.replace(/[\s-]/g, "");
    if (cleanedIsbn.length !== 13 || !/^\d{13}$/.test(cleanedIsbn)) {
      addToast("Podaj prawidłowy ISBN (dokładnie 13 cyfr)", "error");
      return;
    }

    const totalParsed = Number(form.total);
    if (!Number.isFinite(totalParsed) || totalParsed <= 0) {
      addToast("Liczba egzemplarzy musi być dodatnia", "error");
      return;
    }

    onAddBook({
      title: form.title.trim(),
      author: form.author.trim(),
      isbn: cleanedIsbn,
      genre: form.genre.trim(),
      total: totalParsed,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-5 bg-neutral-900 rounded-xl border border-neutral-700/50 shadow-2xl text-neutral-200"
    >
      <h2 className="text-lg font-semibold text-center text-neutral-100 mb-3 tracking-wide">
        Dodaj nową książkę
      </h2>

      <input
        ref={firstInputRef}
        name="title"
        type="text"
        value={form.title}
        onChange={handleChange}
        placeholder="Tytuł"
        autoComplete="off"
        className="bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition"
      />
      <input
        name="author"
        type="text"
        value={form.author}
        onChange={handleChange}
        placeholder="Autor"
        autoComplete="off"
        className="bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition"
      />
      <input
        name="isbn"
        type="text"
        value={form.isbn}
        onChange={handleChange}
        placeholder="ISBN (13 cyfr)"
        autoComplete="off"
        className="bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition"
      />
      <input
        name="genre"
        type="text"
        value={form.genre}
        onChange={handleChange}
        placeholder="Gatunek"
        autoComplete="off"
        className="bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition"
      />
      <input
        name="total"
        type="number"
        value={form.total}
        onChange={handleChange}
        placeholder="Liczba egzemplarzy"
        autoComplete="off"
        className="bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition"
      />

      <button
        type="submit"
        className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-lg border border-rose-500/30 shadow-md shadow-rose-900/20 transition"
      >
        Dodaj
      </button>
    </form>
  );
});

export default BookForm;
