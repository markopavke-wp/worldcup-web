import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { formatPrediction } from '../lib/outcome';
import PageHeader from '../components/PageHeader';

export default function ProfilePage() {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getMyPredictions(), api.getLeaderboard()])
      .then(([predData, lbData]) => {
        setPredictions(predData.predictions);
        setLeaderboard(lbData.leaderboard);
      })
      .finally(() => setLoading(false));
  }, []);

  const myStats = leaderboard.find((row) => row.userId === user?.id);

  return (
    <div>
      <PageHeader icon="👤" title="Moj profil" subtitle="Tvoji podaci i odigrani tipovi" />

      <div className="profile-grid">
        <div className="card wc-card">
          <h3>📋 Podaci</h3>
          <p><span className="label">Ime:</span> {user?.displayName}</p>
          <p><span className="label">Email:</span> {user?.email}</p>
        </div>

        <div className="card wc-card">
          <h3>🏆 Statistika</h3>
          {loading ? (
            <p className="empty">Učitavam...</p>
          ) : (
            <>
              <p><span className="label">Ukupno poena:</span> <strong>{myStats?.totalPoints ?? 0}</strong></p>
              <p><span className="label">Rang:</span> {myStats?.rank ?? '-'}</p>
              <p><span className="label">Ishodi:</span> {myStats?.outcomeHits ?? 0}</p>
              <p><span className="label">Tipovi:</span> {myStats?.predictionsCount ?? 0}</p>
            </>
          )}
        </div>
      </div>

      <h2 className="profile-section-title">Moje prognoze ({predictions.length})</h2>
      {predictions.length === 0 ? (
        <p className="empty">Još nisi uneo nijednu prognozu.</p>
      ) : (
        <div className="card wc-card table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Utakmica</th>
                <th>Prognoza</th>
                <th>Rezultat</th>
                <th>Poeni</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p) => (
                <tr key={p.id}>
                  <td>{p.match.homeTeam} vs {p.match.awayTeam}</td>
                  <td>{formatPrediction(p)}</td>
                  <td>
                    {p.match.status === 'FINISHED'
                      ? `${p.match.homeScore}:${p.match.awayScore}`
                      : '—'}
                  </td>
                  <td>{p.pointsAwarded ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
