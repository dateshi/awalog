import { Button } from "react-bootstrap";
import { LPHistory, LPHistoryCtl, PlayertCtl } from "./helper";
import "./style.scss";

const Reset = (props: { onClick: () => void }) => {
  return (
    <Button variant="outline-secondary" onClick={props.onClick}>
      リセット
    </Button>
  );
};

const Coin = (props: { onClick: () => void }) => {
  return (
    <Button variant="outline-secondary" onClick={props.onClick}>
      コイン
    </Button>
  );
};

const Dice = (props: { onClick: () => void }) => {
  return (
    <Button variant="outline-secondary" onClick={props.onClick}>
      サイコロ
    </Button>
  );
};

const Undo = (props: { lpHistory: LPHistory; undo: () => void }) => (
  <Button
    variant="outline-secondary"
    onClick={props.undo}
    disabled={props.lpHistory.head < 0}
    data-testid="undo"
  >
    戻る
  </Button>
);

const Redo = (props: { lpHistory: LPHistory; redo: () => void }) => (
  <Button
    variant="outline-secondary"
    onClick={props.redo}
    disabled={props.lpHistory.head === props.lpHistory.logs.length - 1}
    data-testid="redo"
  >
    進む
  </Button>
);

const LPLog = (props: Pick<Props, "showLPHistoryModal">) => (
  <Button variant="outline-secondary" onClick={props.showLPHistoryModal}>
    ログ
  </Button>
);

type Props = {
  showResetModal: () => void;
  showLPHistoryModal: () => void;
  showCoinModal: () => void;
  showDiceModal: () => void;
  lpHistory: LPHistory;
  lpHistoryCtl: LPHistoryCtl;
  player1Ctl: PlayertCtl;
  player2Ctl: PlayertCtl;
};

const Toolbar = (props: Props) => {
  const {
    showResetModal,
    showLPHistoryModal,
    showCoinModal,
    showDiceModal,
    lpHistory,
    lpHistoryCtl,
    player1Ctl,
    player2Ctl,
  } = props;
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
    <div className="toolbar">
      <Reset onClick={showResetModal} />
      <Coin onClick={showCoinModal} />
      <Dice onClick={showDiceModal} />
      <Undo lpHistory={lpHistory} undo={undo} />
      <Redo lpHistory={lpHistory} redo={redo} />
      <LPLog showLPHistoryModal={showLPHistoryModal} />
    </div>
  );
};

export default Toolbar;
