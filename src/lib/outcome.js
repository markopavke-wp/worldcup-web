export function getOutcome(homeScore, awayScore) {
  if (homeScore > awayScore) return '1';
  if (homeScore < awayScore) return '2';
  return 'X';
}

export function scoresMatchOutcome(outcome, home, away) {
  if (home === '' || away === '' || home === null || away === null) return true;
  const h = Number(home);
  const a = Number(away);
  if (Number.isNaN(h) || Number.isNaN(a)) return true;
  return getOutcome(h, a) === outcome;
}

export function formatPrediction(prediction) {
  if (!prediction) return null;
  const score =
    prediction.homeScorePred !== null && prediction.awayScorePred !== null
      ? `, rezultat ${prediction.homeScorePred}:${prediction.awayScorePred}`
      : '';
  return `ishod ${prediction.outcomePred}${score}`;
}
