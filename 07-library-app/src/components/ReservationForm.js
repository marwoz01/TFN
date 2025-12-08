"use client";

import {
  useActionState,
  useEffect,
  useRef,
  startTransition,
  useState,
} from "react";
import { createReservationAction } from "../actions/reservationActions";
import SubmitButton from "./SubmitButton";

const initialState = {
  success: false,
  errors: {},
  serverError: null,
  reservation: null,
};

export default function ReservationForm({
  books = [],
  onReservationAdded,
  onOptimisticReservation,
}) {
  const [formState, formAction, pending] = useActionState(
    createReservationAction,
    initialState,
  );

  const [successMessage, setSuccessMessage] = useState("");

  const formRef = useRef(null);
  const tempIdRef = useRef(null);

  const errors = formState.errors || {};
  const availableBooks = books.filter((book) => book.available > 0);
  const todayStr = new Date().toISOString().split("T")[0];

  const inputBase =
    "w-full rounded-xl bg-neutral-900/80 border border-neutral-700 px-4 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition";

  // Optymistyczny wpis przed wysłaniem formularza
  const handleOptimisticSubmit = (event) => {
    if (!onOptimisticReservation) return;

    const fd = new FormData(event.currentTarget);

    const bookId = fd.get("bookId");
    const userName = (fd.get("userName") || "").toString().trim();
    const userEmail = (fd.get("userEmail") || "").toString().trim();
    const reservationDate = fd.get("reservationDate");
    const durationStr = fd.get("duration");
    const duration = durationStr ? Number(durationStr) : null;
    const notes = (fd.get("notes") || "").toString().trim();

    // Jeśli brakuje podstawowych pól, nie dodajemy optymistycznego wpisu
    if (!bookId || !userName || !userEmail || !reservationDate || !duration) {
      return;
    }

    const bookTitle =
      books.find((b) => String(b.id) === String(bookId))?.title || "";

    const tempId = `temp-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    tempIdRef.current = tempId;

    const optimisticReservation = {
      id: tempId,
      bookId,
      bookTitle,
      userName,
      userEmail,
      reservationDate,
      duration,
      notes,
      status: "pending",
    };

    startTransition(() => {
      onOptimisticReservation(optimisticReservation);
    });
  };

  // Reset formularza po udanym zapisie
  useEffect(() => {
    if (formState.success && formRef.current) {
      formRef.current.reset();
    }
  }, [formState.success]);

  // Toast sukcesu
  useEffect(() => {
    if (formState.success) {
      setSuccessMessage("Rezerwacja została pomyślnie utworzona.");
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [formState.success]);

  // Po zakończeniu akcji aktualizacja optymistycznej rezerwacji na confirmed
  useEffect(() => {
    if (!onReservationAdded) return;

    if (formState.success && formState.reservation) {
      const tempId = tempIdRef.current;
      const reservationFromServer = formState.reservation;

      const finalReservation = {
        ...reservationFromServer,
        id: tempId || reservationFromServer.id,
        status: "confirmed",
      };

      onReservationAdded(finalReservation);
      tempIdRef.current = null;
    }
  }, [formState]);

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold tracking-wide text-neutral-100">
        Rezerwacja książki
      </h2>

      {successMessage && (
        <p className="text-sm text-green-500">{successMessage}</p>
      )}

      {formState.serverError && (
        <p className="text-sm text-red-500">{formState.serverError}</p>
      )}

      {formState.serverError && (
        <p className="text-sm text-red-500">{formState.serverError}</p>
      )}

      <form
        ref={formRef}
        action={formAction}
        onSubmit={handleOptimisticSubmit}
        className="space-y-4"
      >
        {/* Książka */}
        <div className="space-y-1">
          <label
            htmlFor="reservation-bookId"
            className="block text-sm text-neutral-200"
          >
            Książka
          </label>
          <select
            id="reservation-bookId"
            name="bookId"
            aria-invalid={errors.bookId ? "true" : undefined}
            aria-describedby={
              errors.bookId ? "reservation-bookId-error" : undefined
            }
            className={inputBase}
            defaultValue=""
            disabled={pending}
          >
            <option value="">Wybierz książkę</option>
            {availableBooks.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
          {errors.bookId && (
            <p id="reservation-bookId-error" className="text-sm text-red-500">
              {errors.bookId}
            </p>
          )}
        </div>

        {/* Imię i nazwisko */}
        <div className="space-y-1">
          <label
            htmlFor="reservation-userName"
            className="block text-sm text-neutral-200"
          >
            Imię i nazwisko
          </label>
          <input
            id="reservation-userName"
            name="userName"
            type="text"
            aria-invalid={errors.userName ? "true" : undefined}
            aria-describedby={
              errors.userName ? "reservation-userName-error" : undefined
            }
            disabled={pending}
            className={inputBase}
          />
          {errors.userName && (
            <p id="reservation-userName-error" className="text-sm text-red-500">
              {errors.userName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label
            htmlFor="reservation-userEmail"
            className="block text-sm text-neutral-200"
          >
            E-mail
          </label>
          <input
            id="reservation-userEmail"
            name="userEmail"
            type="email"
            aria-invalid={errors.userEmail ? "true" : undefined}
            aria-describedby={
              errors.userEmail ? "reservation-userEmail-error" : undefined
            }
            disabled={pending}
            className={inputBase}
          />
          {errors.userEmail && (
            <p
              id="reservation-userEmail-error"
              className="text-sm text-red-500"
            >
              {errors.userEmail}
            </p>
          )}
        </div>

        {/* Data rezerwacji */}
        <div className="space-y-1">
          <label
            htmlFor="reservation-date"
            className="block text-sm text-neutral-200"
          >
            Data rezerwacji
          </label>
          <input
            id="reservation-date"
            name="reservationDate"
            type="date"
            min={todayStr}
            aria-invalid={errors.reservationDate ? "true" : undefined}
            aria-describedby={
              errors.reservationDate ? "reservation-date-error" : undefined
            }
            disabled={pending}
            className={inputBase}
          />
          {errors.reservationDate && (
            <p id="reservation-date-error" className="text-sm text-red-500">
              {errors.reservationDate}
            </p>
          )}
        </div>

        {/* Czas w dniach */}
        <div className="space-y-1">
          <label
            htmlFor="reservation-duration"
            className="block text-sm text-neutral-200"
          >
            Czas (dni)
          </label>
          <input
            id="reservation-duration"
            name="duration"
            type="number"
            min={1}
            max={30}
            aria-invalid={errors.duration ? "true" : undefined}
            aria-describedby={
              errors.duration ? "reservation-duration-error" : undefined
            }
            disabled={pending}
            className={inputBase}
          />
          {errors.duration && (
            <p id="reservation-duration-error" className="text-sm text-red-500">
              {errors.duration}
            </p>
          )}
        </div>

        {/* Uwagi (opcjonalne) */}
        <div className="space-y-1">
          <label
            htmlFor="reservation-notes"
            className="block text-sm text-neutral-200"
          >
            Uwagi (opcjonalne)
          </label>
          <textarea
            id="reservation-notes"
            name="notes"
            rows={3}
            aria-invalid={errors.notes ? "true" : undefined}
            aria-describedby={
              errors.notes ? "reservation-notes-error" : undefined
            }
            disabled={pending}
            className={inputBase}
          />
          {errors.notes && (
            <p id="reservation-notes-error" className="text-sm text-red-500">
              {errors.notes}
            </p>
          )}
        </div>

        <SubmitButton pendingLabel="Rezerwuję...">
          Zarezerwuj książkę
        </SubmitButton>
      </form>
    </div>
  );
}
