"use client";
import { useState } from "react";

export default function UserForm({ users, onAddUser }) {
  const [form, setForm] = useState({ name: "", email: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Imię i nazwisko oraz e-mail są wymagane");
      return;
    }

    const normalizedEmail = form.email.trim().toLowerCase();
    if (!normalizedEmail.includes("@")) {
      alert("Podaj poprawny adres e-mail (musi zawierać @)");
      return;
    }

    const emailTaken = users.some(
      (u) => String(u.email).trim().toLowerCase() === normalizedEmail
    );
    if (emailTaken) {
      alert("Użytkownik z takim adresem e-mail już istnieje");
      return;
    }

    onAddUser({ name: form.name.trim(), email: normalizedEmail });
    setForm({ name: "", email: "" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-5 bg-neutral-900 rounded-xl border border-neutral-700/50 shadow-2xl text-neutral-200"
    >
      <h2 className="text-lg font-semibold text-center text-neutral-100 mb-3 tracking-wide">
        Dodaj użytkownika
      </h2>

      <input
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        placeholder="Imię i nazwisko"
        autoComplete="off"
        className="bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition"
      />

      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Adres e-mail"
        autoComplete="off"
        className="bg-neutral-800 border border-neutral-700 rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition"
      />

      <button
        type="submit"
        className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-lg border border-rose-500/30 shadow-md shadow-rose-900/20 transition"
      >
        Dodaj użytkownika
      </button>
    </form>
  );
}
