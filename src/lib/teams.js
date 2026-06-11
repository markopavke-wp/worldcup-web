export function getTeamDisplay(match, side) {
  const info = side === 'home' ? match.homeTeamInfo : match.awayTeamInfo;
  const name = side === 'home' ? match.homeTeam : match.awayTeam;
  return {
    name,
    code: info?.code || name.slice(0, 3).toUpperCase(),
    flagUrl: info?.flagUrl || (side === 'home' ? match.homeTeamLogo : match.awayTeamLogo),
  };
}
