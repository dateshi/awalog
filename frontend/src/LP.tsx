import { useState } from "react";
import { Button, Col, Container, ProgressBar, Row } from "react-bootstrap";
import AWANav from "./AWANav";
import "./LP.scss";

const lifeValues = [
  [-50, -100, -200],
  [-300, -400, -500],
  [-600, -800, -900],
  [-1000, -2000, -3000],
];

const LifePoint = (props: { name: string; lp: number }) => {
  const { name, lp } = props;
  const now = Math.floor(lp / 80);
  const variant = (() => {
    if (lp > 4000) {
      return "success";
    } else if (lp > 2000) {
      return "warning";
    } else {
      return "danger";
    }
  })();
  return (
    <div className="lp-parent bg-light text-black">
      <div className="lp-header">{name}</div>
      <ProgressBar variant={variant} now={now}></ProgressBar>
      <div className="lp">{props.lp}</div>
    </div>
  );
};

type Mode = "normal" | "+" | "-";

const ControlPanel = (props: {
  addLP: (lp: number) => void;
  halfLP: () => void;
  mode: Mode;
  changeMode: (mode: Mode) => void;
  pushKey: (key: string) => void;
}) => {
  if (props.mode === "normal") {
    return (
      <Container>
        {lifeValues.map((row, i) => {
          return (
            <Row style={{ padding: 15 }} key={i}>
              {row.map((val, j) => {
                return (
                  <Col key={j}>
                    <Button
                      variant="outline-secondary"
                      style={{
                        width: "100px",
                        height: "60px",
                      }}
                      onClick={() => props.addLP(val)}
                    >
                      {val}
                    </Button>
                  </Col>
                );
              })}
            </Row>
          );
        })}
        <Row style={{ padding: 15 }}>
          <Col>
            <Button
              variant="outline-secondary"
              style={{
                width: "100px",
                height: "60px",
              }}
              onClick={() => props.changeMode("+")}
            >
              +
            </Button>
          </Col>
          <Col>
            <Button
              variant="outline-secondary"
              style={{
                width: "100px",
                height: "60px",
              }}
              onClick={() => props.changeMode("-")}
            >
              -
            </Button>
          </Col>
          <Col>
            <Button
              variant="outline-secondary"
              style={{
                width: "100px",
                height: "60px",
              }}
              onClick={props.halfLP}
            >
              1/2
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
  const buttons = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0", "00", "="],
  ];
  return (
    <Container>
      {buttons.map((row, i) => {
        return (
          <Row style={{ padding: 15 }} key={i}>
            {row.map((val, j) => {
              return (
                <Col key={j}>
                  <Button
                    variant="outline-secondary"
                    style={{
                      width: "100px",
                      height: "60px",
                    }}
                    onClick={() => props.pushKey(val)}
                  >
                    {val}
                  </Button>
                </Col>
              );
            })}
          </Row>
        );
      })}
      <Row style={{ padding: 15 }}>
        <Col>
          <Button
            variant="outline-secondary"
            style={{
              width: "100px",
              height: "60px",
            }}
            onClick={() => props.changeMode("+")}
          >
            +
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-secondary"
            style={{
              width: "100px",
              height: "60px",
            }}
            onClick={() => props.changeMode("-")}
          >
            -
          </Button>
        </Col>
        <Col>
          <Button
            variant="outline-secondary"
            style={{
              width: "100px",
              height: "60px",
            }}
            onClick={() => {
              props.halfLP();
              props.changeMode("normal");
            }}
          >
            1/2
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

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
            <LifePoint name="旋風BF" lp={players[0].lp} />
          </Col>
          <Col>{players[0].buf}</Col>
          <Col md={{ offset: 5 }}>{players[1].buf}</Col>
          <Col>
            <LifePoint name="代行天使" lp={players[1].lp} />
          </Col>
        </Row>
        <Row>
          {players.map((player, i) => {
            return (
              <Col key={i}>
                <ControlPanel
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
