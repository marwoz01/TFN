"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const BookForm = forwardRef(({ onAddBook }, ref) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    total: "",
  });
  const [error, setError] = useState("");

  const firstInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setFormData({
        title: "",
        author: "",
        isbn: "",
        genre: "",
        total: "",
      });
      setError("");
    },
    focusFirst: () => {
      firstInputRef.current?.focus();
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => !field)) {
      setError("Wszystkie pola są wymagane");
      return;
    }
    if (formData.isbn.length !== 13) {
      setError("ISBN musi mieć 13 znaków");
      return;
    }
    if (Number(formData.total) <= 0) {
      setError("Liczba egzemplarzy musi być większa od zera");
      return;
    }

    onAddBook({
      ...formData,
      total: Number(formData.total),
      available: Number(formData.total),
    });

    setFormData({
      title: "",
      author: "",
      isbn: "",
      genre: "",
      total: "",
    });
    setError("");
  };

  const inputBase =
    "w-full rounded-xl bg-neutral-900/80 border border-neutral-700 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition";

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold tracking-wide text-neutral-100">
        Dodaj nową książkę
      </h2>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            ref={firstInputRef}
            type="text"
            name="title"
            placeholder="Tytuł"
            value={formData.title}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
        <div>
          <input
            type="text"
            name="author"
            placeholder="Autor"
            value={formData.author}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
        <div>
          <input
            type="text"
            name="isbn"
            placeholder="ISBN (13 cyfr)"
            value={formData.isbn}
            onChange={handleChange}
            maxLength={13}
            className={inputBase}
          />
        </div>
        <div>
          <input
            type="text"
            name="genre"
            placeholder="Gatunek"
            value={formData.genre}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
        <div>
          <input
            type="number"
            name="total"
            min={1}
            placeholder="Liczba egzemplarzy"
            value={formData.total}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
        <button
          type="submit"
          className="w-full mt-2 rounded-xl bg-cyan-600 hover:bg-cyan-400 text-white font-semibold py-2.5 text-sm tracking-wide transition"
        >
          Dodaj
        </button>
      </form>
    </div>
  );
});

export default BookForm;
