export default function PokemonModal({ isOpen, details, onClose }) {
  if (!isOpen) return null;

  const loading = !details;

  function barClass(value) {
    if (value >= 100) return "bar high";
    if (value >= 60) return "bar mid";
    return "bar low";
  }

  function barStyle(value) {
    const percent = Math.min(100, Math.round((value / 200) * 100));
    return { width: percent + "%" };
  }

  let total = 0;
  if (details && details.stats) {
    total = details.stats.reduce((sum, s) => sum + s.value, 0);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {loading ? (
          <div>Ładowanie…</div>
        ) : (
          <div>
            <div className="modal-header">
              <img
                className="modal-img"
                src={details.image}
                alt={details.name}
                width="128"
                height="128"
              />
              <div className="modal-title">
                <h2 className="modal-name">{details.name}</h2>
                <div className="modal-id">#{details.id}</div>

                <div className="modal-types">
                  {details.types.map((t) => (
                    <span key={t} className={`type-chip type-${t}`}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="modal-meta">
                  <span>Wzrost: {(details.height / 10).toFixed(1)} m</span>
                  <span>Waga: {(details.weight / 10).toFixed(1)} kg</span>
                </div>

                <div className="abilities-list">
                  {details.abilities.map((a) => (
                    <span
                      key={a.name}
                      className={`ability-chip${a.hidden ? " hidden" : ""}`}
                    >
                      {a.name}{" "}
                      {a.hidden && <span className="hidden-badge">ukryta</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="stats">
              <h3>Statystyki</h3>
              <ul className="stats-list">
                {details.stats.map((s) => (
                  <li key={s.name} className="stat-row">
                    <span className="stat-name">
                      {s.name.replace("special-", "sp-")}
                    </span>
                    <span className="stat-value">{s.value}</span>
                    <div className="stat-bar">
                      <div
                        className={barClass(s.value)}
                        style={barStyle(s.value)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="stats-total">
                Suma statystyk: <strong>{total}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
