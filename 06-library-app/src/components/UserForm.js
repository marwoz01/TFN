import { useState } from "react";

export default function UserForm({ onAddUser, existingUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email) {
      setError("Wszystkie pola są wymagane.");
      return;
    }

    if (!email.includes("@")) {
      setError("Email musi zawierać znak @.");
      return;
    }

    const emailExists = existingUsers.some((u) => u.email === email);
    if (emailExists) {
      setError("Użytkownik z takim emailem już istnieje.");
      return;
    }

    onAddUser({
      name,
      email,
    });

    setName("");
    setEmail("");
  };

  return (
    <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-blue-400 mb-4">
        Dodaj użytkownika
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block mb-1 text-zinc-300">Imię i nazwisko</label>
          <input
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-zinc-200
                       focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-zinc-300">Email</label>
          <input
            className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-zinc-200
                       focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

        <button
          type="submit"
          className="mt-2 inline-flex justify-center items-center px-4 py-2 rounded-md
                     bg-blue-600 text-white font-medium hover:bg-blue-500
                     transition-colors"
        >
          Dodaj użytkownika
        </button>
      </form>
    </div>
  );
}
