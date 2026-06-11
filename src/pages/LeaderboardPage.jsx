import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
      <p className="page-subtitle">
        1 poen ishod · 2 poena rezultat · 3 poena oba. Klikni na igrača za tipove na završenim utakmicama.
      </p>

      {loading && <p className="empty">Učitavam...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="card table-wrap leaderboard-wrap">
          <table className="data-table leaderboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Igrač</th>
                <th>Poeni</th>
                <th>Ishodi</th>
                <th>Tipovi</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((row) => (
                <tr key={row.userId} className={row.userId === user?.id ? 'me' : ''}>
                  <td>{row.rank}</td>
                  <td className="player-cell">
                    {row.userId === user?.id ? (
                      <Link to="/profile" className="player-link">{row.displayName}</Link>
                    ) : (
                      <Link to={`/igrac/${row.userId}`} className="player-link">
                        {row.displayName}
                      </Link>
                    )}
                  </td>
                  <td><strong>{row.totalPoints}</strong></td>
                  <td>{row.outcomeHits}</td>
                  <td>{row.predictionsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
