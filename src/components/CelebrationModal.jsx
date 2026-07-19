import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import TrophyIcon from './icons/TrophyIcon';
import Fireworks from './Fireworks';
import './CelebrationModal.css';

function dismissedKey(userId) {
  return `wc2026-champion-dismissed-${userId}`;
}

export default function CelebrationModal() {
  const { user } = useAuth();
  const [winner, setWinner] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user?.id) return undefined;

    if (localStorage.getItem(dismissedKey(user.id))) {
      return undefined;
    }

    let cancelled = false;

    Promise.all([api.getMatches(), api.getLeaderboard()])
      .then(([matchesData, boardData]) => {
        if (cancelled) return;

        const finalDone = (matchesData.matches || []).some(
          (m) => m.stage === 'Final' && m.status === 'FINISHED',
        );
        const champion = boardData.leaderboard?.[0];
        if (!finalDone || !champion) return;

        setWinner(champion);
        setOpen(true);
      })
      .catch(() => {
        // Tiho — celebration nije kritičan za app
      });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const dismiss = () => {
    if (user?.id) {
      localStorage.setItem(dismissedKey(user.id), '1');
    }
    setOpen(false);
  };

  if (!open || !winner) return null;

  return (
    <div className="celebration-overlay" role="dialog" aria-modal="true" aria-labelledby="celebration-title">
      <div className="celebration-backdrop" onClick={dismiss} aria-hidden="true" />
      <Fireworks />

      <div className="celebration-modal">
        <button type="button" className="celebration-close" onClick={dismiss} aria-label="Zatvori">
          ×
        </button>

        <div className="celebration-glow" aria-hidden="true" />
        <TrophyIcon className="celebration-trophy" />

        <p className="celebration-eyebrow">FIFA World Cup 2026</p>
        <h2 id="celebration-title" className="celebration-title">
          Pobednik lige tipova
        </h2>

        <p className="celebration-name">{winner.displayName}</p>
        <p className="celebration-points">
          {winner.totalPoints}
          {' '}
          poena
        </p>

        {(winner.exactHits != null || winner.outcomeHits != null) && (
          <p className="celebration-meta">
            {winner.outcomeHits != null && `${winner.outcomeHits} ishoda`}
            {winner.outcomeHits != null && winner.exactHits != null && ' · '}
            {winner.exactHits != null && `${winner.exactHits} tačnih`}
          </p>
        )}

        <div className="celebration-actions">
          <Link to="/leaderboard" className="btn btn-primary" onClick={dismiss}>
            Pogledaj tabelu
          </Link>
          <button type="button" className="btn btn-ghost" onClick={dismiss}>
            Zatvori
          </button>
        </div>
      </div>
    </div>
  );
}
