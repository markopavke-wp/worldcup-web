import './TeamBadge.css';

export default function TeamBadge({ team, score, align = 'center' }) {
  return (
    <div className={`team-badge align-${align}`}>
      {team.flagUrl && (
        <img className="team-flag" src={team.flagUrl} alt="" loading="lazy" />
      )}
      <span className="team-code">{team.code}</span>
      <span className="team-name">{team.name}</span>
      {score !== undefined && <strong className="team-score">{score ?? '-'}</strong>}
    </div>
  );
}
