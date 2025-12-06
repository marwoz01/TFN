"use client";

import { useState } from "react";

export default function UserForm({ onAddUser, users = [] }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email) {
      setError("Wszystkie pola są wymagane");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Email musi zawierać znak @");
      return;
    }

    if (users.some((user) => user.email === formData.email)) {
      setError("Podany adres email istnieje już w systemie");
      return;
    }

    onAddUser({
      id: Date.now(),
      name: formData.name,
      email: formData.email,
    });
    setFormData({ name: "", email: "" });
    setError("");
  };

  const inputBase =
    "w-full rounded-xl bg-neutral-900/80 border border-neutral-700 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition";

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold tracking-wide text-neutral-100">
        Dodaj nowego użytkownika
      </h2>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Imię i nazwisko"
            value={formData.name}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Adres e-mail"
            value={formData.email}
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
}
