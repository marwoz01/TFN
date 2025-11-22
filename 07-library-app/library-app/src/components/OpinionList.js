"use client";

const audienceLabel = {
  children: "Dzieci",
  teens: "Młodzież",
  adults: "Dorośli",
  all: "Wszyscy",
};

const recommendLabel = {
  yes: "Tak",
  no: "Nie",
  maybe: "Nie wiem",
};

export default function OpinionList({ opinions, onDeleteOpinion }) {
  const sorted = [...opinions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="p-5 bg-neutral-900 rounded-xl border border-neutral-700/50 shadow-2xl text-neutral-200 mt-6">
      <h2 className="text-lg font-semibold mb-3 text-neutral-100">
        Opinie czytelników
      </h2>

      {sorted.length === 0 ? (
        <p className="text-sm text-neutral-400">
          Brak opinii. Dodaj pierwszą opinię o książce.
        </p>
      ) : (
        <ul className="space-y-4">
          {sorted.map((o) => (
            <li
              key={o.id}
              className="p-4 border border-neutral-700 rounded-lg bg-neutral-800"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-neutral-100 font-medium text-lg">
                    {o.bookTitle}
                  </p>
                  <p className="text-neutral-400 text-sm">{o.readerName}</p>
                  <p className="text-neutral-500 text-xs">
                    {new Date(o.date).toLocaleDateString("pl-PL")}
                  </p>

                  <p className="text-sm text-neutral-300 mt-1">
                    <span className="font-semibold">Czy poleca:</span>{" "}
                    {recommendLabel[o.wouldRecommend] || "—"}
                  </p>

                  <p className="text-sm text-neutral-300">
                    <span className="font-semibold">Dla kogo:</span>{" "}
                    {audienceLabel[o.targetAudience] || "—"}
                  </p>
                </div>

                <button
                  onClick={() => onDeleteOpinion(o.id)}
                  className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 
                             text-white rounded-lg border border-red-500/40 transition"
                >
                  Usuń
                </button>
              </div>

              <div className="mt-3 space-y-2 text-sm text-neutral-300">
                <p>
                  <span className="font-semibold">Mocne strony:</span>{" "}
                  {o.strengths}
                </p>
                <p>
                  <span className="font-semibold">Słabe strony:</span>{" "}
                  {o.weaknesses && o.weaknesses.trim()
                    ? o.weaknesses
                    : "Brak wskazanych słabych stron."}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
