type Player = {
  lp: number;
}
export type Duel = [Player, Player];
export type Result = {decks: [string, string], duels: Duel[], format: 'Single' | 'Match'}

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
  const { duels } = result;
  if (result.format === 'Single') {
    if (duels.length === 0) {
      return null;
    }
    return winner(duels[0]);
  }
  // Matchの場合
  if (duels.length <= 1) {
    return null;
  }
  const s = result.duels.reduce((res, duel) => {
    const w = winner(duel);
    if (w === 0) {
      return res + 1;
    }
    if (w === 1) {
      return res - 1;
    }
    return res;
  }, 0);
  if (duels.length === 2 && Math.abs(s) <= 1) {
    return null;
  }
  if (s > 0) {
    return 0;
  }
  if (s < 0) {
    return 1;
  }
  return -1;
}
