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

const ControlPanel = (props: { addLP: (lp: number) => void }) => {
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
    </Container>
  );
};

const LP = () => {
  return (
    <>
      <AWANav />
      <Container>
        <Row>
          <Col>
            <LifePoint name="旋風BF" lp={8000} />
          </Col>
          <Col md={{ offset: 6 }}>
            <LifePoint name="代行天使" lp={3000} />
          </Col>
        </Row>
        <Row>
          {[1, 1].map((_, i) => {
            return (
              <Col key={i}>
                <ControlPanel addLP={(lp) => console.log(lp)} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default LP;
