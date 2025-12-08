"use client";

export default function ReservationList({ reservations, onCancelReservation }) {
  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-wide text-neutral-100">
        Rezerwacje książek
      </h2>

      {reservations.length === 0 ? (
        <p className="text-sm text-neutral-500">
          Brak rezerwacji do wyświetlenia.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/70 shadow-2xl">
          <table className="w-full table-auto min-h-[120px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-neutral-400 bg-neutral-900">
                <th className="py-3 px-3 font-medium">Książka</th>
                <th className="py-3 px-3 font-medium">Użytkownik</th>
                <th className="py-3 px-3 font-medium">E-mail</th>
                <th className="py-3 px-3 font-medium whitespace-nowrap">
                  Data rezerwacji
                </th>
                <th className="py-3 px-3 font-medium whitespace-nowrap">
                  Czas (dni)
                </th>
                <th className="py-3 px-3 font-medium">Status</th>
                <th className="py-3 px-3 font-medium">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="hover:bg-neutral-900 transition-colors"
                >
                  <td className="py-3 px-3 text-neutral-100 text-xs align-middle">
                    <div className="font-semibold">
                      {reservation.bookTitle || reservation.bookId}
                    </div>
                  </td>

                  <td className="py-3 px-3 text-neutral-300 text-xs align-middle">
                    {reservation.userName}
                  </td>

                  <td className="py-3 px-3 text-neutral-300 text-xs align-middle">
                    {reservation.userEmail}
                  </td>

                  <td className="py-3 px-3 text-neutral-300 text-xs align-middle text-xs whitespace-nowrap">
                    {reservation.reservationDate}
                  </td>

                  <td className="py-3 px-3 text-neutral-300 text-xs align-middle text-center">
                    {reservation.duration}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 align-middle">
                    <span
                      className={`inline-flex items-center justify-center px-2 py-1.5 rounded-full text-xs font-semibold
                        ${
                          reservation.status === "pending"
                            ? "bg-amber-900/40 text-amber-400"
                            : reservation.status === "cancelled"
                              ? "bg-red-900/40 text-red-400"
                              : "bg-green-900/40 text-green-400"
                        }`}
                    >
                      {reservation.status === "pending"
                        ? "Oczekuje"
                        : reservation.status === "cancelled"
                          ? "Anulowana"
                          : "Potwierdzona"}
                    </span>
                  </td>

                  {/* Akcje */}
                  <td className="py-3 px-3">
                    <button
                      onClick={() => onCancelReservation?.(reservation.id)}
                      disabled={reservation.status === "cancelled"}
                      className={`text-xs px-3 py-1 rounded-lg transition ${
                        reservation.status === "cancelled"
                          ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                    >
                      Anuluj
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
