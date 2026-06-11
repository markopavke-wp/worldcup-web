import { useState } from 'react';
import { api } from '../api/client';
import { getTeamDisplay } from '../lib/teams';
import { formatPrediction, scoresMatchOutcome } from '../lib/outcome';
import TeamBadge from './TeamBadge';
import './MatchCard.css';

function formatDate(iso) {
  return new Date(iso).toLocaleString('sr-RS', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function statusBadge(match) {
  if (match.status === 'FINISHED') return <span className="badge badge-finished">Završeno</span>;
  if (!match.canEdit) return <span className="badge badge-locked">Zaključano</span>;
  return <span className="badge badge-open">Otvoreno</span>;
}

export default function MatchCard({ match, onSaved }) {
  const homeTeam = getTeamDisplay(match, 'home');
  const awayTeam = getTeamDisplay(match, 'away');
  const existing = match.prediction;

  const [outcome, setOutcome] = useState(existing?.outcomePred || '');
  const [home, setHome] = useState(
    existing?.homeScorePred !== null && existing?.homeScorePred !== undefined
      ? existing.homeScorePred
      : ''
  );
  const [away, setAway] = useState(
    existing?.awayScorePred !== null && existing?.awayScorePred !== undefined
      ? existing.awayScorePred
      : ''
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const showScore = match.status === 'FINISHED' || match.status === 'LIVE';
  const hasExactInput = home !== '' || away !== '';
  const scoresValid = !hasExactInput || scoresMatchOutcome(outcome, home, away);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!match.canEdit) return;

    if (!outcome) {
      setError('Izaberi ishod: 1, X ili 2');
      return;
    }

    if (hasExactInput && (home === '' || away === '')) {
      setError('Unesi oba dela tačnog rezultata ili ostavi prazno');
      return;
    }

    if (!scoresValid) {
      setError('Tačan rezultat mora da odgovara ishodu (npr. X = nerešen rezultat)');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const payload = { outcome };
      if (hasExactInput) {
        payload.homeScore = Number(home);
        payload.awayScore = Number(away);
      }
      await api.savePrediction(match.id, payload);
      onSaved?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="match-card card">
      <div className="match-meta">
        <span>{match.groupName || match.stage}</span>
        <span>{formatDate(match.kickoffAt)}</span>
        {statusBadge(match)}
      </div>

      <div className="match-teams">
        <TeamBadge team={homeTeam} score={showScore ? match.homeScore : undefined} />
        <span className="vs">vs</span>
        <TeamBadge team={awayTeam} score={showScore ? match.awayScore : undefined} />
      </div>

      {existing && (
        <p className="my-prediction">
          Tvoja prognoza: <strong>{formatPrediction(existing)}</strong>
          {existing.pointsAwarded !== null && (
            <span className="points"> — {existing.pointsAwarded} poena</span>
          )}
        </p>
      )}

      {match.canEdit && (
        <form className="prediction-panel" onSubmit={handleSave}>
          <p className="prediction-label">Ishod (1 poen)</p>
          <div className="outcome-buttons">
            {['1', 'X', '2'].map((value) => (
              <button
                key={value}
                type="button"
                className={`outcome-btn ${outcome === value ? 'active' : ''}`}
                onClick={() => setOutcome(value)}
                title={value === '1' ? 'Pobeda domaćina' : value === '2' ? 'Pobeda gosta' : 'Nerešeno'}
              >
                {value}
              </button>
            ))}
          </div>

          <p className="prediction-label">Tačan rezultat — opciono (2 poena, ukupno do 3)</p>
          <div className="prediction-form">
            <input
              className={`input score-input ${!scoresValid ? 'input-error' : ''}`}
              type="number"
              min="0"
              max="20"
              value={home}
              onChange={(e) => setHome(e.target.value)}
              placeholder="D"
            />
            <span>:</span>
            <input
              className={`input score-input ${!scoresValid ? 'input-error' : ''}`}
              type="number"
              min="0"
              max="20"
              value={away}
              onChange={(e) => setAway(e.target.value)}
              placeholder="G"
            />
            <button className="btn btn-primary" type="submit" disabled={saving || !outcome}>
              {saving ? 'Čuvam...' : 'Sačuvaj prognozu'}
            </button>
          </div>

          {!scoresValid && (
            <p className="error hint">
              Rezultat ne odgovara ishodu {outcome}. Za X unesi nerešen (npr. 1:1), za 1 domaćin mora imati više golova.
            </p>
          )}
        </form>
      )}

      {error && <p className="error">{error}</p>}
    </article>
  );
}
