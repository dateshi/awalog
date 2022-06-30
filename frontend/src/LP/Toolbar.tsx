import { Button } from "react-bootstrap";
import { LPHistory, LPHistoryCtl, PlayertCtl } from "./lp";
import "./style.scss";

const Coin = () => {
  // const [result, setResult] = useState<"表" | "裏" | "-">("-");
  return (
    <Button
      variant="outline-secondary"
      // onClick={() => {
      //   setResult(Math.random() < 0.5 ? "表" : "裏");
      // }}
    >
      コイン
    </Button>
  );
};

const Undo = (props: { lpHistory: LPHistory; undo: () => void }) => (
  <Button
    variant="outline-secondary"
    onClick={props.undo}
    disabled={props.lpHistory.head < 0}
  >
    戻る
  </Button>
);

const Redo = (props: { lpHistory: LPHistory; redo: () => void }) => (
  <Button
    variant="outline-secondary"
    onClick={props.redo}
    disabled={props.lpHistory.head === props.lpHistory.logs.length - 1}
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
  showLPHistoryModal: () => void;
  lpHistory: LPHistory;
  lpHistoryCtl: LPHistoryCtl;
  player1Ctl: PlayertCtl;
  player2Ctl: PlayertCtl;
};

const Toolbar = (props: Props) => {
  const {
    showLPHistoryModal,
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
      <Coin />
      <Undo lpHistory={lpHistory} undo={undo} />
      <Redo lpHistory={lpHistory} redo={redo} />
      <LPLog showLPHistoryModal={showLPHistoryModal} />
    </div>
  );
};

export default Toolbar;
