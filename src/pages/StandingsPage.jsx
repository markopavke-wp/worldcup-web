import { useEffect, useState } from 'react';
import { api } from '../api/client';
import PageHeader from '../components/PageHeader';

export default function StandingsPage() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getStandings()
      .then((data) => setStandings(data.standings))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        icon="🌍"
        title="Tabele grupa"
        subtitle="Rang po završenim utakmicama. Timovi su prikazani sa zastavom i skraćenicom."
      />

      {loading && <p className="empty">Učitavam...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && standings.length === 0 && (
        <p className="empty">Tabele još nisu dostupne.</p>
      )}

      <div className="groups-grid">
        {standings.map((group) => (
          <div key={group.group} className="card wc-card group-card group-card--wc">
            <h3>{group.group}</h3>
            <div className="table-wrap">
              <table className="standings-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tim</th>
                    <th>O</th>
                    <th>P</th>
                    <th>N</th>
                    <th>I</th>
                    <th>GR</th>
                    <th>Bod</th>
                  </tr>
                </thead>
                <tbody>
                  {group.teams.map((team) => (
                    <tr key={team.team}>
                      <td>{team.rank}</td>
                      <td className="team-cell">
                        {team.logo && <img src={team.logo} alt="" className="team-flag" />}
                        <span className="team-code">{team.code || team.team.slice(0, 3).toUpperCase()}</span>
                        <span className="team-full">{team.team}</span>
                      </td>
                      <td>{team.played}</td>
                      <td>{team.won}</td>
                      <td>{team.draw}</td>
                      <td>{team.lost}</td>
                      <td>{team.goalDiff > 0 ? `+${team.goalDiff}` : team.goalDiff}</td>
                      <td><strong>{team.points}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
