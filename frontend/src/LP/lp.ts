import { useState } from "react";

export type Mode = "normal" | "+" | "-";

export type Player = {
  lp: number;
  mode: Mode;
  buf: number;
};

export type PlayertCtl = ReturnType<typeof usePlayer>["ctl"]

export const usePlayer = () => {
  const [player, setPlayer] = useState<Player>({
    lp: 8000,
    mode: "normal" as Mode,
    buf: 0,
  });

  const addLP = (lp: number) => {
    setPlayer({ ...player, lp: Math.max(0, player.lp + lp) });
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
