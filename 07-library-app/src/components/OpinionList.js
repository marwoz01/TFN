"use client";

const formatDate = (iso) => {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("pl-PL");
};

const audienceLabels = {
  children: "Dzieci",
  teens: "Młodzież",
  adults: "Dorośli",
  all: "Wszyscy",
};

export default function OpinionList({ opinions, onDeleteOpinion }) {
  const sortedOpinions = [...opinions].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-wide text-neutral-100">
        Opinie czytelników
      </h2>

      {sortedOpinions.length === 0 ? (
        <p className="text-sm text-neutral-500">Brak opinii do wyświetlenia.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/70 shadow-2xl">
          <table className="w-full table-auto min-h-[120px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-neutral-400 bg-neutral-900">
                <th className="py-3 px-3 font-medium">Książka</th>
                <th className="py-3 px-3 font-medium">Czytelnik</th>
                <th className="py-3 px-3 font-medium">Poleca?</th>
                <th className="py-3 px-3 font-medium">Mocne strony</th>
                <th className="py-3 px-3 font-medium">Słabe strony</th>
                <th className="py-3 px-3 font-medium whitespace-nowrap">
                  Dla kogo
                </th>
                <th className="py-3 px-3 font-medium whitespace-nowrap">
                  Data
                </th>
                <th className="py-3 px-3 font-medium">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {sortedOpinions.map((opinion) => (
                <tr
                  key={opinion.id}
                  className="hover:bg-neutral-900 transition-colors"
                >
                  <td className="py-3 px-3 text-neutral-100 text-xs align-middle">
                    <div className="font-semibold">
                      {opinion.bookTitle || opinion.bookId}
                    </div>
                  </td>

                  <td className="py-3 px-3 text-neutral-300 text-xs align-middle">
                    {opinion.readerName}
                  </td>

                  {/* Poleca? */}
                  <td className="py-3 px-3 text-xs align-middle">
                    {opinion.wouldRecommend === "yes" && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold bg-green-900/40 text-green-400">
                        Tak
                      </span>
                    )}
                    {opinion.wouldRecommend === "no" && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold bg-red-900/40 text-red-400">
                        Nie
                      </span>
                    )}
                    {opinion.wouldRecommend === "maybe" && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold bg-amber-900/40 text-amber-300">
                        Nie wiem
                      </span>
                    )}
                  </td>

                  {/* Mocne strony */}
                  <td className="py-3 px-3 text-neutral-200 text-xs max-w-xs align-middle">
                    <p className="line-clamp-3">{opinion.strengths}</p>
                  </td>

                  {/* Słabe strony */}
                  <td className="py-3 px-3 text-neutral-300 text-xs max-w-xs align-middle">
                    {opinion.weaknesses ? (
                      <p className="line-clamp-3">{opinion.weaknesses}</p>
                    ) : (
                      <span className="text-neutral-500 text-xs">–</span>
                    )}
                  </td>

                  {/* Dla kogo */}
                  <td className="py-3 px-3 text-neutral-300 text-xs whitespace-nowrap align-middle">
                    {audienceLabels[opinion.targetAudience] || "-"}
                  </td>

                  {/* Data */}
                  <td className="py-3 px-3 text-neutral-300 text-xs whitespace-nowrap align-middle">
                    {formatDate(opinion.date)}
                  </td>

                  {/* Akcje */}
                  <td className="py-3 px-3 align-middle">
                    <button
                      onClick={() => onDeleteOpinion?.(opinion.id)}
                      className="text-xs px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
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
