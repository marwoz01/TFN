"use client";

export default function ReviewList({ reviews, onDeleteReview }) {
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const formatDate = (iso) => {
    if (!iso) return "-";
    return new Date(iso).toLocaleDateString("pl-PL");
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-wide text-neutral-100">
        Recenzje książek
      </h2>

      {sortedReviews.length === 0 ? (
        <p className="text-sm text-neutral-500">
          Brak recenzji do wyświetlenia.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/70 shadow-2xl">
          <table className="w-full table-auto min-h-[120px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-neutral-400 bg-neutral-900">
                <th className="py-3 px-3 font-medium">Książka</th>
                <th className="py-3 px-3 font-medium">Recenzent</th>
                <th className="py-3 px-3 font-medium">Ocena</th>
                <th className="py-3 px-3 font-medium">Polecane</th>
                <th className="py-3 px-3 font-medium">Data dodania</th>
                <th className="py-3 px-3 font-medium">Treść</th>
                <th className="py-3 px-3 font-medium">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {sortedReviews.map((review) => (
                <tr
                  key={review.id}
                  className="hover:bg-neutral-900 transition-colors align-top"
                >
                  <td className="py-3 px-3 text-neutral-100 text-xs align-middle">
                    <div className="font-semibold">
                      {review.bookTitle || review.bookId}
                    </div>
                  </td>

                  <td className="py-3 px-3 text-neutral-300 text-xs align-middle">
                    {review.userName}
                  </td>

                  {/* Ocena w gwiazdkach */}
                  <td className="py-3 px-3 text-xs align-middle">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => {
                        const star = idx + 1;
                        const active = review.rating >= star;
                        return (
                          <span
                            key={star}
                            className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] ${
                              active
                                ? "bg-yellow-400/90 text-neutral-900"
                                : "bg-neutral-800 text-neutral-500"
                            }`}
                          >
                            ★
                          </span>
                        );
                      })}
                    </div>
                  </td>

                  {/* Polecane */}
                  <td className="py-3 px-3 text-xs align-middle">
                    {review.recommended ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold bg-green-900/40 text-green-400">
                        Polecane
                      </span>
                    ) : (
                      <span className="text-neutral-500 text-xs">–</span>
                    )}
                  </td>

                  {/* Data */}
                  <td className="py-3 px-3 text-neutral-300 text-xs whitespace-nowrap align-middle">
                    {formatDate(review.dateRead || review.date)}
                  </td>

                  {/* Treść */}
                  <td className="py-3 px-3 text-neutral-200 text-xs max-w-xs align-middle">
                    <p className="line-clamp-3">{review.reviewText}</p>
                  </td>

                  {/* Akcje */}
                  <td className="py-3 px-3 align-middle">
                    <button
                      onClick={() => onDeleteReview?.(review.id)}
                      className="text-xs px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white transition "
                    >
                      Usuń
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
