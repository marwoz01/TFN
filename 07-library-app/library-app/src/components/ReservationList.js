"use client";

import { useOptimistic, useEffect } from "react";

export default function ReservationList({
  reservations,
  onCancel,
  registerAddOptimistic,
}) {
  const [optimisticReservations, addOptimisticReservation] = useOptimistic(
    reservations,
    (current, incoming) => {
      // incoming = nowy optimistic lub confirmed
      // jeśli id się zgadza → zastępujemy pending wersją z serwera
      const updated = current.filter((r) => r.id !== incoming.id);
      return [incoming, ...updated];
    }
  );

  // przekazujemy funkcję parentowi (ReservationForm)
  useEffect(() => {
    registerAddOptimistic(addOptimisticReservation);
  }, [registerAddOptimistic, addOptimisticReservation]);

  return (
    <div className="p-5 bg-neutral-900 rounded-xl border border-neutral-700/50 shadow-2xl text-neutral-200">
      <h2 className="text-lg font-semibold mb-3 text-neutral-100">
        Rezerwacje
      </h2>

      {optimisticReservations.length === 0 ? (
        <p className="text-sm text-neutral-400">
          Brak rezerwacji. Zarezerwuj książkę, aby pojawiła się na liście.
        </p>
      ) : (
        <ul className="space-y-3">
          {optimisticReservations.map((r) => (
            <li
              key={r.id}
              className="p-3 border border-neutral-700 rounded-lg bg-neutral-800 flex flex-col gap-1"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-neutral-100 font-medium">{r.bookTitle}</p>
                  <p className="text-neutral-400 text-sm">{r.userName}</p>
                  <p className="text-neutral-500 text-xs">
                    {r.reservationDate} • {r.duration} dni
                  </p>
                </div>

                <span
                  className={`text-xs self-start px-2 py-1 rounded-full border
                    ${
                      r.status === "pending"
                        ? "border-yellow-500/60 text-yellow-300 bg-yellow-900/20"
                        : r.status === "confirmed"
                        ? "border-green-500/60 text-green-300 bg-green-900/20"
                        : "border-red-500/60 text-red-300 bg-red-900/20"
                    }`}
                >
                  {r.status}
                </span>
              </div>

              <button
                onClick={() => onCancel(r.id)}
                className="mt-2 self-end px-3 py-1 text-xs bg-red-600 hover:bg-red-700 
                           text-white rounded-lg border border-red-500/40 transition"
              >
                Anuluj rezerwację
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
