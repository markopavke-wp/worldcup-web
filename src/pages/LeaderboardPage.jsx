import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getLeaderboard()
      .then((data) => setLeaderboard(data.leaderboard))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="page-title">Tabela takmičara</h1>
      <p className="page-subtitle">1 poen ishod · 2 poena rezultat · 3 poena oba</p>

      {loading && <p className="empty">Učitavam...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="leaderboard-cards">
            {leaderboard.map((row) => (
              <div
                key={row.userId}
                className={`leaderboard-card card ${row.userId === user?.id ? 'me' : ''}`}
              >
                <div className="leaderboard-card-top">
                  <span className="leaderboard-rank">#{row.rank}</span>
                  <span className="leaderboard-name">{row.displayName}</span>
                  <strong className="leaderboard-points">{row.totalPoints}</strong>
                </div>
                <div className="leaderboard-card-stats">
                  <div className="leaderboard-stat">
                    <span className="leaderboard-stat-label">Tačni</span>
                    <strong>{row.exactHits}</strong>
                  </div>
                  <div className="leaderboard-stat">
                    <span className="leaderboard-stat-label">Ishodi</span>
                    <strong>{row.outcomeHits}</strong>
                  </div>
                  <div className="leaderboard-stat">
                    <span className="leaderboard-stat-label">Tipova</span>
                    <strong>{row.predictionsCount}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card table-wrap leaderboard-table-desktop">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Igrač</th>
                  <th>Poeni</th>
                  <th>Tačni</th>
                  <th>Ishodi</th>
                  <th>Tipova</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((row) => (
                  <tr key={row.userId} className={row.userId === user?.id ? 'me' : ''}>
                    <td>{row.rank}</td>
                    <td>{row.displayName}</td>
                    <td><strong>{row.totalPoints}</strong></td>
                    <td>{row.exactHits}</td>
                    <td>{row.outcomeHits}</td>
                    <td>{row.predictionsCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
