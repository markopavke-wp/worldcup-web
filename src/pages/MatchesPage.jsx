import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/client';
import MatchCard from '../components/MatchCard';
import PageHeader from '../components/PageHeader';

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getMatches();
      let list = data.matches;

      if (filter === 'open') {
        list = list.filter((m) => m.canEdit);
      } else if (filter === 'finished') {
        list = list.filter((m) => m.status === 'FINISHED');
      }

      setMatches(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <PageHeader
        icon="⚽"
        title="Utakmice"
        subtitle="Izaberi ishod (1 poen) i opciono tačan rezultat (2 poena). Oba pogodjena = 3 poena."
      >
        <div className="filters">
          {['all', 'open', 'finished'].map((f) => (
            <button
              key={f}
              type="button"
              className={`btn ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Sve' : f === 'open' ? 'Otvorene' : 'Završene'}
            </button>
          ))}
        </div>
      </PageHeader>

      {loading && <p className="empty">Učitavam utakmice...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && matches.length === 0 && (
        <p className="empty">
          Nema utakmica. Pokreni sinhronizaciju na API-ju (<code>npm run sync</code>).
        </p>
      )}

      {matches.map((match) => (
        <MatchCard key={match.id} match={match} onSaved={load} />
      ))}
    </div>
  );
}
