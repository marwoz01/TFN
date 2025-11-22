"use client";

import { useActionState, useEffect, useRef } from "react";
import { createReservation } from "../app/actions/reservationActions";
import SubmitButton from "./SubmitButton";

export default function ReservationForm({
  books,
  onReservationCreated,
  onAddOptimistic,
  onServerError,
}) {
  const initialState = {
    success: false,
    errors: {},
    serverError: null,
    reservation: null,
  };

  const [state, formAction] = useActionState(createReservation, initialState);
  const formRef = useRef(null);
  const lastTempIdRef = useRef(null);

  async function handleFormAction(formData) {
    // generujemy tymczasowe ID rezerwacji
    const tempId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now());

    lastTempIdRef.current = tempId;

    const bookId = formData.get("bookId");
    const book = books.find((b) => String(b.id) === String(bookId));

    const optimisticReservation = {
      id: tempId,
      bookId,
      bookTitle: book ? book.title : "Nieznana książka",
      userName: formData.get("userName") || "",
      userEmail: formData.get("userEmail") || "",
      reservationDate: formData.get("reservationDate") || "",
      duration: Number(formData.get("duration")) || 0,
      notes: formData.get("notes") || "",
      status: "pending",
    };

    // optymistyczne dodanie do listy
    if (onAddOptimistic) {
      onAddOptimistic(optimisticReservation);
    }

    // delegujemy do Server Action (useActionState)
    formAction(formData);
  }

  useEffect(() => {
    const tempId = lastTempIdRef.current;

    // SUKCES – potwierdzamy rezerwację (pending -> confirmed)
    if (state.success && state.reservation && tempId) {
      const finalReservation = {
        ...state.reservation,
        id: tempId,
        status: "confirmed",
      };

      if (onReservationCreated) {
        onReservationCreated(finalReservation);
      }

      if (formRef.current) {
        formRef.current.reset();
      }

      lastTempIdRef.current = null;
    }

    // BŁĄD (losowy błąd serwera lub walidacja) – usuwamy pending
    if (
      !state.success &&
      tempId &&
      (state.serverError || Object.keys(state.errors || {}).length > 0)
    ) {
      if (onServerError) {
        onServerError(tempId);
      }
      lastTempIdRef.current = null;
    }
  }, [state, onReservationCreated, onServerError]);

  return (
    <form
      ref={formRef}
      action={handleFormAction}
      className="flex flex-col gap-3 p-5 bg-neutral-900 rounded-xl border border-neutral-700/50 shadow-2xl text-neutral-200"
    >
      <h2 className="text-lg font-semibold text-center text-neutral-100 mb-3 tracking-wide">
        Rezerwacja książki
      </h2>

      {/* ogólny błąd serwera */}
      {state.serverError && (
        <div className="bg-red-900/40 border border-red-700 text-red-300 p-3 rounded-lg text-sm">
          {state.serverError}
        </div>
      )}

      {/* WYBÓR KSIĄŻKI – tylko dostępne */}
      <label className="text-sm text-neutral-300">
        Wybierz książkę
        <select
          name="bookId"
          className={`mt-1 w-full bg-neutral-800 border rounded-lg p-2 text-neutral-100
          focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
          ${state.errors.bookId ? "border-red-700" : "border-neutral-700"}`}
          defaultValue=""
        >
          <option value="" disabled>
            -- wybierz książkę --
          </option>
          {books
            .filter((b) => b.available > 0)
            .map((b) => (
              <option key={b.id} value={b.id}>
                {b.title} ({b.available}/{b.total})
              </option>
            ))}
        </select>
      </label>
      {state.errors.bookId && (
        <p className="text-red-400 text-sm">{state.errors.bookId}</p>
      )}

      {/* IMIĘ I NAZWISKO */}
      <input
        name="userName"
        placeholder="Imię i nazwisko"
        autoComplete="off"
        className={`bg-neutral-800 border rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500
        focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
        ${state.errors.userName ? "border-red-700" : "border-neutral-700"}`}
      />
      {state.errors.userName && (
        <p className="text-red-400 text-sm">{state.errors.userName}</p>
      )}

      {/* EMAIL */}
      <input
        name="userEmail"
        type="email"
        placeholder="Email"
        autoComplete="off"
        className={`bg-neutral-800 border rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500
        focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
        ${state.errors.userEmail ? "border-red-700" : "border-neutral-700"}`}
      />
      {state.errors.userEmail && (
        <p className="text-red-400 text-sm">{state.errors.userEmail}</p>
      )}

      {/* DATA REZERWACJI */}
      <input
        name="reservationDate"
        type="date"
        autoComplete="off"
        className={`bg-neutral-800 border rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500
        focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
        ${
          state.errors.reservationDate ? "border-red-700" : "border-neutral-700"
        }`}
      />
      {state.errors.reservationDate && (
        <p className="text-red-400 text-sm">{state.errors.reservationDate}</p>
      )}

      {/* CZAS REZERWACJI */}
      <input
        name="duration"
        type="number"
        placeholder="Czas rezerwacji (dni)"
        autoComplete="off"
        className={`bg-neutral-800 border rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500
        focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
        ${state.errors.duration ? "border-red-700" : "border-neutral-700"}`}
      />
      {state.errors.duration && (
        <p className="text-red-400 text-sm">{state.errors.duration}</p>
      )}

      {/* UWAGI */}
      <textarea
        name="notes"
        placeholder="Uwagi (opcjonalnie)"
        className={`bg-neutral-800 border rounded-lg p-2 text-neutral-100 placeholder:text-neutral-500 h-24
        focus:outline-none focus:ring-2 focus:ring-rose-500/70 transition
        ${state.errors.notes ? "border-red-700" : "border-neutral-700"}`}
      />
      {state.errors.notes && (
        <p className="text-red-400 text-sm">{state.errors.notes}</p>
      )}

      <SubmitButton>Zarezerwuj</SubmitButton>
    </form>
  );
}
