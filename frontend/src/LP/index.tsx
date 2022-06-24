import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AWANav from "../AWANav";
import Window from "./Window";
import "./style.scss";
import Controller from "./Controller";
import Toolbar from "./Toolbar";

export type Mode = "normal" | "+" | "-";

type Player = {
  lp: number;
  mode: Mode;
  buf: number;
};

const usePlayer = () => {
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

const LP = () => {
  const { player: p1, ctl: ctl1 } = usePlayer();
  const { player: p2, ctl: ctl2 } = usePlayer();
  return (
    <>
      <AWANav />
      <Container>
        <Toolbar />
        <Row>
          <Col>
            <Window name="旋風BF" lp={p1.lp} buf={p1.buf} mode={p1.mode} />
          </Col>
          <Col md={{ offset: 7 }}>
            <Window name="代行天使" lp={p2.lp} buf={p2.buf} mode={p2.mode} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Controller
              mode={p1.mode}
              addLP={ctl1.addLP}
              halfLP={ctl1.halfLP}
              changeMode={ctl1.changeMode}
              pushKey={ctl1.pushKey}
            />
          </Col>
          <Col>
            <Controller
              mode={p2.mode}
              addLP={ctl2.addLP}
              halfLP={ctl2.halfLP}
              changeMode={ctl2.changeMode}
              pushKey={ctl2.pushKey}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LP;
