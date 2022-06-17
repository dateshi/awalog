import { Button, Col, Container, Row } from "react-bootstrap";
import { Mode } from ".";

const quickButtons = [
  [-50, -100, -200],
  [-300, -400, -500],
  [-600, -800, -900],
  [-1000, -2000, -3000],
];

const manualButtons = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["0", "00", "="],
];

type Props = {
  addLP: (lp: number) => void;
  halfLP: () => void;
  mode: Mode;
  changeMode: (mode: Mode) => void;
  pushKey: (key: string) => void;
};

const Controller = (props: Props) => {
  if (props.mode === "normal") {
    return (
      <Container>
        {quickButtons.map((row, i) => {
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
  return (
    <Container>
      {manualButtons.map((row, i) => {
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

export default Controller;
