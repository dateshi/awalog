import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import AWANav from "./AWANav";
import "./LP.scss";

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
      </Container>
    </>
  );
};

export default LP;
