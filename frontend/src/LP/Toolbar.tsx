import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

const Coin = () => {
  const [result, setResult] = useState<"表" | "裏" | "-">("-");
  return (
    <div>
      <Button
        variant="outline-secondary"
        onClick={() => {
          setResult(Math.random() < 0.5 ? "表" : "裏");
        }}
      >
        コイン
      </Button>
      <div>{result}</div>
    </div>
  );
};

const LPLog = (props: Pick<Props, "showLPHistoryModal">) => (
  <Button variant="outline-secondary" onClick={props.showLPHistoryModal}>
    ログ
  </Button>
);

type Props = {
  showLPHistoryModal: () => void;
};

const Toolbar = (props: Props) => {
  const { showLPHistoryModal } = props;
  return (
    <Row>
      <Col>
        <Coin />
      </Col>
      <Col>
        <LPLog showLPHistoryModal={showLPHistoryModal} />
      </Col>
    </Row>
  );
};

export default Toolbar;
