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
  lp: number;
  mode: Mode;
  buf: number;
};

export type PlayertCtl = ReturnType<typeof usePlayer>["ctl"];

export const useLPHistory = () => {
  const [lpHistory, setHistory] = useState<LPHistory>({logs: [], head: -1});
  const addLog = (i: number, from: number, to: number) => {
    setHistory({
      logs: [
        ...lpHistory.logs,
        {
          playerID: i,
          from,
          to,
        }
      ],
      head: lpHistory.head + 1
    });
  }
  return {
    lpHistory: lpHistory,
    ctl: {
      addLog,
    }
  }
}

export const usePlayer = (id: number, historyCtl: LPHistoryCtl) => {
  const [player, setPlayer] = useState<Player>({
    id,
    lp: 8000,
    mode: "normal" as Mode,
    buf: 0,
  });

  const addLP = (lp: number) => {
    const from = player.lp;
    const to = Math.max(0, player.lp + lp)
    setPlayer({ ...player, lp: to });
    historyCtl.addLog(id, from, to );
  };
  const halfLP = () => {
    setPlayer({ ...player, lp: Math.ceil(player.lp / 2) });
  };
  const changeMode = (mode: Mode) => {
    setPlayer({ ...player, buf: mode === "normal" ? 0 : player.buf, mode });
  };
  const pushKey = (key: string) => {
    if (key === "=") {
      const sign = player.mode === "+" ? 1 : -1;
      setPlayer({
        ...player,
        lp: Math.max(0, player.lp + sign * player.buf),
        mode: "normal",
        buf: 0,
      });
    } else {
      setPlayer({ ...player, buf: Number(`${player.buf}${key}`) });
    }
  };

  return {
    player,
    ctl: {
      addLP,
      halfLP,
      changeMode,
      pushKey,
    },
  };
};
