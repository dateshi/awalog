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
  return winner(result.match[result.match.length - 1]);
}
