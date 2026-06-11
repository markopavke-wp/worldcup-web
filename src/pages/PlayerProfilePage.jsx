import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { formatPrediction } from '../lib/outcome';
import PageHeader from '../components/PageHeader';

export default function PlayerProfilePage() {
  const { userId } = useParams();
  const { user: me } = useAuth();
  const [player, setPlayer] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId === me?.id) return;

    setLoading(true);
    setError('');

    Promise.all([api.getUserPredictions(userId), api.getLeaderboard()])
      .then(([predData, lbData]) => {
        setPlayer(predData.user);
        setPredictions(predData.predictions);
        setStats(lbData.leaderboard.find((row) => row.userId === userId) || null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId, me?.id]);

  if (userId === me?.id) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div>
      <Link to="/leaderboard" className="back-link">← Nazad na tabelu</Link>

      {loading && <p className="empty">Učitavam...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && player && (
        <>
          <PageHeader
            icon="⚽"
            title={player.displayName}
            subtitle="Tipovi na završenim utakmicama"
          />

          {stats && (
            <div className="profile-grid player-stats-grid">
              <div className="card wc-card">
                <p><span className="label">Ukupno poena:</span> <strong>{stats.totalPoints}</strong></p>
                <p><span className="label">Rang:</span> #{stats.rank}</p>
              </div>
              <div className="card wc-card">
                <p><span className="label">Ishodi (1/X/2):</span> {stats.outcomeHits}</p>
                <p><span className="label">Tačni rezultati:</span> {stats.exactHits}</p>
                <p><span className="label">Ukupno tipova:</span> {stats.predictionsCount}</p>
              </div>
            </div>
          )}

          <h2 className="profile-section-title">Odigrani tipovi ({predictions.length})</h2>
          {predictions.length === 0 ? (
            <p className="empty">Nema tipova na završenim utakmicama.</p>
          ) : (
            <div className="card wc-card table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Utakmica</th>
                    <th>Tip</th>
                    <th>Rezultat</th>
                    <th>Poeni</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((p) => (
                    <tr key={p.id}>
                      <td>{p.match.homeTeam} vs {p.match.awayTeam}</td>
                      <td>{formatPrediction(p)}</td>
                      <td>{p.match.homeScore}:{p.match.awayScore}</td>
                      <td>{p.pointsAwarded ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
