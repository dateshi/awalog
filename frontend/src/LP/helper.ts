import { useState } from "react";

export type Mode = "normal" | "+" | "-";

export type LPLog = {
  playerID: number;
  from: number;
  to: number;
}

export type LPHistory = {
  logs: LPLog[];
  head: number;
}
export type LPHistoryCtl = ReturnType<typeof useLPHistory>["ctl"];

export type Player = {
  id: number;
  deck: string;
  lp: number;
  mode: Mode;
  buf: number;
};

export type PlayertCtl = ReturnType<typeof usePlayer>["ctl"];

const initHistory = {logs: [], head: -1}

export const useLPHistory = () => {
  const [lpHistory, setHistory] = useState<LPHistory>(initHistory);
  const addLog = (i: number, from: number, to: number) => {
    setHistory({
      logs: [
        ...lpHistory.logs.slice(0, lpHistory.head + 1),
        {
          playerID: i,
          from,
          to,
        }
      ],
      head: lpHistory.head + 1
    });
  }
  const undo = () => {
    const res = lpHistory.logs[lpHistory.head];
    setHistory({
      logs: lpHistory.logs,
      head: lpHistory.head - 1
    });
    return res;
  }
  const redo = () => {
    const res = lpHistory.logs[lpHistory.head + 1];
    setHistory({
      logs: lpHistory.logs,
      head: lpHistory.head + 1
    });
    return res;
  }
  const reset = () => {
    setHistory(initHistory);
  }
  return {
    lpHistory: lpHistory,
    ctl: {
      addLog,
      undo,
      redo,
      reset,
    }
  }
}


export const usePlayer = (id: number, decks: string[], historyCtl: LPHistoryCtl, showSaveModal: () => void) => {
  const [player, setPlayer] = useState<Player>({
    id,
    deck: decks[0],
    lp: 8000,
    mode: "normal" as Mode,
    buf: 0,
  });
  const enhancedSetPlayer = (p: Player) => {
    setPlayer(p);
    if (p.lp <= 0) {
      showSaveModal();
    }
  };

  const setDeck = (deck: string) => {
    setPlayer({...player, deck})
  }
  const addLP = (lp: number) => {
    const from = player.lp;
    const to = Math.max(0, player.lp + lp)
    enhancedSetPlayer({ ...player, lp: to });
    historyCtl.addLog(id, from, to );
    console.log(lp)
  };
  const halfLP = () => {
    const from = player.lp;
    const to = Math.ceil(player.lp / 2);
    enhancedSetPlayer({ ...player, lp: to });
    historyCtl.addLog(id, from, to );
  };
  const undoLP = (log: LPLog) => {
    if (log.playerID === player.id) {
      setPlayer({ ...player, lp: log.from });
    }
  };
  const redoLP = (log: LPLog) => {
    if (log.playerID === player.id) {
      setPlayer({ ...player, lp: log.to });
    }
  };
  const reset = () => {
    setPlayer({...player,
    lp: 8000,
    mode: "normal" as Mode,
    buf: 0,
    });
  };
  const changeMode = (mode: Mode) => {
    setPlayer({ ...player, buf: mode === "normal" ? 0 : player.buf, mode });
  };
  const pushKey = (key: string) => {
    if (key === "=") {
      const sign = player.mode === "+" ? 1 : -1;
      const from = player.lp;
      const to = Math.max(0, player.lp + sign * player.buf);
      enhancedSetPlayer({
        ...player,
        lp: to,
        mode: "normal",
        buf: 0,
      });
      historyCtl.addLog(id, from, to);
    } else {
      setPlayer({ ...player, buf: Number(`${player.buf}${key}`) });
    }
  };

  return {
    player,
    ctl: {
      setDeck,
      addLP,
      halfLP,
      undoLP,
      redoLP,
      reset,
      changeMode,
      pushKey,
    },
  };
};
