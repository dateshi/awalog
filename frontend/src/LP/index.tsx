import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AWANav from "../AWANav";
import Window from "./Window";
import "./style.scss";
import Controller from "./Controller";

export type Mode = "normal" | "+" | "-";

const LP = () => {
  const [players, setPlayers] = useState([
    { lp: 8000, mode: "normal" as Mode, buf: 0 },
    { lp: 8000, mode: "normal" as Mode, buf: 0 },
  ]);
  const addLP = (i: number) => (lp: number) => {
    const player = players[i];
    const to = Math.max(0, player.lp + lp);
    setPlayers(
      players.map((player, j) => {
        if (j === i) {
          return { ...player, lp: to };
        }
        return player;
      })
    );
  };
  const halfLP = (i: number) => () => {
    const player = players[i];
    const to = Math.ceil(player.lp / 2);
    setPlayers(
      players.map((player, j) => {
        if (j === i) {
          return { ...player, lp: to };
        }
        return player;
      })
    );
  };
  const changeMode = (i: number) => (mode: Mode) => {
    setPlayers(
      players.map((player, j) => {
        if (j === i) {
          return { ...player, mode: mode };
        }
        return player;
      })
    );
  };
  const pushKey = (i: number) => (key: string) => {
    const player = players[i];
    if (key === "=") {
      const sign = player.mode === "+" ? 1 : -1;
      setPlayers(
        players.map((player, j) => {
          if (j === i) {
            return {
              ...player,
              lp: player.lp + sign * player.buf,
              buf: 0,
            };
          }
          return player;
        })
      );
    } else {
      setPlayers(
        players.map((player, j) => {
          if (j === i) {
            return { ...player, buf: Number(`${player.buf}${key}`) };
          }
          return player;
        })
      );
    }
  };
  return (
    <>
      <AWANav />
      <Container>
        <Row>
          <Col>
            <Window name="旋風BF" lp={players[0].lp} />
          </Col>
          <Col>{players[0].buf}</Col>
          <Col md={{ offset: 5 }}>{players[1].buf}</Col>
          <Col>
            <Window name="代行天使" lp={players[1].lp} />
          </Col>
        </Row>
        <Row>
          {players.map((player, i) => {
            return (
              <Col key={i}>
                <Controller
                  addLP={addLP(i)}
                  halfLP={halfLP(i)}
                  mode={players[i].mode}
                  changeMode={changeMode(i)}
                  pushKey={pushKey(i)}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default LP;
