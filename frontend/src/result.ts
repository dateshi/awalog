type Player = {
  lp: number;
}
type Duel = [Player, Player];
type Match = [Duel, Duel] | [Duel, Duel, Duel];
export type Result = {decks: [string, string]} & ({ duel: Duel, format: 'Single'} | { match: Match, format: 'Match'});

const winner = (duel: Duel) => {
  if (duel[0].lp > 0) {
    return 0;
  }
  else if (duel[1].lp > 0) {
    return 1;
  }
  return -1;
}

export const findWinner = (result: Result) => {
  if (result.format === 'Single') {
    return winner(result.duel);
  }
  const s = result.match.reduce((res, duel) => {
    const w = winner(duel);
    if (w === 0) {
      return res + 1;
    }
    if (w === 1) {
      return res - 1;
    }
    return res;
  }, 0)
  if (s > 0) {
    return 0;
  }
  if (s < 0) {
    return 1;
  }
  return -1;
}
