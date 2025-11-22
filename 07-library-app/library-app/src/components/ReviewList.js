"use client";

export default function ReviewList({ reviews, onDeleteReview }) {
  // Sortowanie — najnowsze najpierw
  const sorted = [...reviews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="p-5 bg-neutral-900 rounded-xl border border-neutral-700/50 shadow-2xl text-neutral-200 mt-6">
      <h2 className="text-lg font-semibold mb-3 text-neutral-100">Recenzje</h2>

      {sorted.length === 0 ? (
        <p className="text-sm text-neutral-400">
          Brak recenzji. Dodaj pierwszą recenzję książki.
        </p>
      ) : (
        <ul className="space-y-4">
          {sorted.map((r) => (
            <li
              key={r.id}
              className="p-4 border border-neutral-700 rounded-lg bg-neutral-800"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <p className="text-neutral-100 font-medium text-lg">
                    {r.bookTitle}
                  </p>

                  <p className="text-neutral-400 text-sm">{r.userName}</p>

                  {/* GWIAZDKI */}
                  <div className="flex gap-1 text-yellow-400 text-lg">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= r.rating
                            ? "text-yellow-400"
                            : "text-neutral-600"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* RECOMMENDED */}
                  {r.recommended && (
                    <span className="text-xs px-2 py-1 rounded-full bg-green-900/20 text-green-300 border border-green-700/40 w-fit">
                      Polecam
                    </span>
                  )}

                  <p className="text-neutral-500 text-xs">
                    {new Date(r.date).toLocaleDateString("pl-PL")}
                    {r.dateRead && ` • przeczytano: ${r.dateRead}`}
                  </p>
                </div>

                <button
                  onClick={() => onDeleteReview(r.id)}
                  className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 
                             text-white rounded-lg border border-red-500/40 transition"
                >
                  Usuń
                </button>
              </div>

              <p className="mt-3 text-neutral-300 text-sm whitespace-pre-line">
                {r.reviewText}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
