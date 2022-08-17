import { findWinner } from "./result";

describe('findWinner', () => {
  describe('0番目のプレイヤーが勝利のパターン', () => {
    it('oo-のマッチは0番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 1000}, {lp: 0}],
          [{lp: 2000}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(0)
    });
    it('oxoのマッチは0番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 1000}, {lp: 0}],
          [{lp: 0}, {lp: 2000}],
          [{lp: 3000}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(0)
    });
    it('xooのマッチは0番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 2000}],
          [{lp: 1000}, {lp: 0}],
          [{lp: 3000}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(0)
    });
    it('odoのマッチは0番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 1000}, {lp: 0}],
          [{lp: 0}, {lp: 0}],
          [{lp: 3000}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(0)
    });
    it('oddのマッチは0番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 1000}, {lp: 0}],
          [{lp: 0}, {lp: 0}],
          [{lp: 0}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(0)
    });
    it('dooのマッチは0番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 0}],
          [{lp: 1000}, {lp: 0}],
          [{lp: 3000}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(0)
    });
    it('dodのマッチは0番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 0}],
          [{lp: 1000}, {lp: 0}],
          [{lp: 0}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(0)
    });
    it('ddoのマッチは0番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 0}],
          [{lp: 0}, {lp: 0}],
          [{lp: 1000}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(0)
    });
  });
  describe('1番目のプレイヤーが勝利のパターン', () => {
    it('xx-のマッチは1番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 1000}],
          [{lp: 0}, {lp: 2000}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(1)
    });
    it('xoxのマッチは1番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 1000}],
          [{lp: 2000}, {lp: 0}],
          [{lp: 0}, {lp: 3000}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(1)
    });
    it('oxxのマッチは1番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 2000}, {lp: 0}],
          [{lp: 0}, {lp: 1000}],
          [{lp: 0}, {lp: 3000}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(1)
    });
    it('xdxのマッチは1番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 1000}],
          [{lp: 0}, {lp: 0}],
          [{lp: 0}, {lp: 3000}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(1)
    });
    it('xddのマッチは1番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 1000}],
          [{lp: 0}, {lp: 0}],
          [{lp: 0}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(1)
    });
    it('dxxのマッチは1番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 0}],
          [{lp: 0}, {lp: 1000}],
          [{lp: 0}, {lp: 3000}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(1)
    });
    it('dxdのマッチは0番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 0}],
          [{lp: 0}, {lp: 1000}],
          [{lp: 0}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(1)
    });
    it('ddxのマッチは0番目のプレイヤーの勝利', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 0}],
          [{lp: 0}, {lp: 0}],
          [{lp: 0}, {lp: 2000}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(1)
    });
  });
  describe('引き分けのパターン', () => {
    it('dddのマッチは引き分け', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 0}],
          [{lp: 0}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(-1)
    });
    it('oxdのマッチは引き分け', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 1000}, {lp: 0}],
          [{lp: 0}, {lp: 2000}],
          [{lp: 0}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(-1)
    });
    it('xodのマッチは引き分け', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 2000}],
          [{lp: 1000}, {lp: 0}],
          [{lp: 0}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(-1)
    });
    it('odxのマッチは引き分け', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 2000}, {lp: 0}],
          [{lp: 0}, {lp: 0}],
          [{lp: 0}, {lp: 3000}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(-1)
    });
    it('xdoのマッチは引き分け', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 3000}],
          [{lp: 0}, {lp: 0}],
          [{lp: 2000}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(-1)
    });
    it('doxのマッチは引き分け', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 0}],
          [{lp: 2000}, {lp: 0}],
          [{lp: 0}, {lp: 3000}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(-1)
    });
    it('dxoのマッチは引き分け', () => {
      const winner = findWinner({
        decks: ['旋風BF', '代行天使'],
        match: [
          [{lp: 0}, {lp: 0}],
          [{lp: 0}, {lp: 3000}],
          [{lp: 2000}, {lp: 0}],
        ],
        format: 'Match',
      });
      expect(winner).toEqual(-1)
    });
  });
});
