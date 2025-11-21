"use client";

export default function UserList({ users, loans, onDeleteUser }) {
  const hasNoUsers = users.length === 0;

  return (
    <section className="p-5 bg-neutral-900 rounded-xl border border-neutral-700/50 shadow-2xl">
      <h2 className="text-lg font-semibold text-neutral-100 mb-4">
        Lista użytkowników
      </h2>

      {hasNoUsers ? (
        <p className="text-sm text-neutral-400">
          Brak użytkowników do wyświetlenia.
        </p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => {
            const activeLoansCount = loans.filter(
              (l) => l.userId === user.id
            ).length;
            const canDelete = activeLoansCount === 0;

            return (
              <li
                key={user.id}
                className="flex items-center justify-between gap-4 bg-neutral-900 border border-neutral-700/60 rounded-2xl p-4 hover:border-rose-500/30 transition"
              >
                <div className="min-w-0">
                  <p className="font-medium text-neutral-100 truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-neutral-400 truncate">
                    {user.email}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-medium px-2 py-1 rounded-lg bg-neutral-800 text-neutral-200 border border-neutral-700/60"
                    title="Aktywne wypożyczenia"
                  >
                    {activeLoansCount} wypoż.
                  </span>

                  <button
                    onClick={() => onDeleteUser(user.id)}
                    disabled={!canDelete}
                    className={`px-3 py-1.5 text-sm rounded-lg transition border
                      ${
                        canDelete
                          ? "bg-rose-600 hover:bg-rose-700 text-white border-rose-500/30 shadow-md shadow-rose-900/20"
                          : "bg-neutral-800 text-neutral-500 border-neutral-700 cursor-not-allowed"
                      }`}
                    title={
                      canDelete
                        ? "Usuń użytkownika"
                        : "Nie można usunąć — użytkownik ma aktywne wypożyczenia"
                    }
                  >
                    Usuń
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
