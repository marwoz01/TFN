export default function UserList({ users, loans, onDeleteUser }) {
  return (
    <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-blue-400 mb-4">
        Lista użytkowników
      </h2>

      {users.length === 0 && (
        <p className="text-zinc-400">Brak zarejestrowanych użytkowników.</p>
      )}

      <div className="flex flex-col gap-3">
        {users.map((user) => {
          const activeLoansCount = loans.filter(
            (loan) => loan.userId === user.id
          ).length;

          return (
            <div
              key={user.id}
              className="bg-zinc-800 border border-zinc-700 p-3 rounded-md flex flex-col gap-1"
            >
              <p className="text-zinc-200 font-semibold">{user.name}</p>
              <p className="text-zinc-400 text-sm">{user.email}</p>

              <p className="text-zinc-300 text-sm mt-1">
                Aktywne wypożyczenia:{" "}
                <span className="text-blue-400">{activeLoansCount}</span>
              </p>

              {activeLoansCount === 0 && (
                <div className="mt-2">
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="px-3 py-1 rounded-md text-sm bg-zinc-700 text-zinc-100
                               hover:bg-zinc-600 transition-colors"
                  >
                    Usuń
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
