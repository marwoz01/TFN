"use client";

export default function UserList({ users = [], onDeleteUser }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold tracking-wide text-neutral-100">
        Lista użytkowników
      </h2>

      {users.length === 0 ? (
        <p className="text-sm text-neutral-500">
          Brak użytkowników do wyświetlenia.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/70 shadow-2xl">
          <table className="w-full table-auto min-h-[120px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-neutral-400 bg-neutral-900">
                <th className="py-3 px-3 font-medium">Użytkownik</th>
                <th className="py-3 px-3 font-medium">Email</th>
                <th className="py-3 px-3 font-medium">Wypożyczenia</th>
                <th className="py-3 px-3 font-medium">Akcje</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-neutral-900 transition-colors"
                >
                  <td className="py-3 px-3 text-neutral-100 align-middle text-xs">
                    <div className="font-semibold">{user.name}</div>
                  </td>
                  <td className="py-3 px-3 text-neutral-300 align-middle text-xs">
                    {user.email}
                  </td>
                  <td className="py-3 px-3 text-neutral-400 text-xs">
                    {user.loans?.length || 0}
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => onDeleteUser(user.id)}
                      disabled={user.loans?.length > 0}
                      className={`text-xs px-3 py-1 rounded-lg transition ${
                        user.loans?.length > 0
                          ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                      title={
                        user.loans?.length > 0
                          ? "Nie można usunąć użytkownika z aktywnymi wypożyczeniami"
                          : "Usuń użytkownika"
                      }
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
