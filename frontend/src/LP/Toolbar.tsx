import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { LPHistoryCtl, PlayertCtl } from "./lp";

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

const Undo = (props: { undo: () => void }) => (
  <Button variant="outline-secondary" onClick={props.undo}>
    戻る
  </Button>
);

const Redo = (props: { redo: () => void }) => (
  <Button variant="outline-secondary" onClick={props.redo}>
    進む
  </Button>
);

const LPLog = (props: Pick<Props, "showLPHistoryModal">) => (
  <Button variant="outline-secondary" onClick={props.showLPHistoryModal}>
    ログ
  </Button>
);

type Props = {
  showLPHistoryModal: () => void;
  lpHistoryCtl: LPHistoryCtl;
  player1Ctl: PlayertCtl;
  player2Ctl: PlayertCtl;
};

const Toolbar = (props: Props) => {
  const { showLPHistoryModal, lpHistoryCtl, player1Ctl, player2Ctl } = props;
  const undo = () => {
    const log = lpHistoryCtl.undo();
    player1Ctl.undoLP(log);
    player2Ctl.undoLP(log);
  };
  const redo = () => {
    const log = lpHistoryCtl.redo();
    player1Ctl.redoLP(log);
    player2Ctl.redoLP(log);
  };
  return (
    <Row>
      <Col>
        <Coin />
      </Col>
      <Col>
        <Undo undo={undo} />
      </Col>
      <Col>
        <Redo redo={redo} />
      </Col>
      <Col>
        <LPLog showLPHistoryModal={showLPHistoryModal} />
      </Col>
    </Row>
  );
};

export default Toolbar;
