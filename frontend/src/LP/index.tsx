import { Container } from "react-bootstrap";
import AWANav from "../AWANav";
import "./style.scss";
import Toolbar from "./Toolbar";
import { useLPHistory, usePlayer } from "./lp";
import Side from "./Side";
import { useHistoryModal } from "./modal";

const LP = () => {
  const { LPHistoryModal, showLPHistoryModal } = useHistoryModal();
  const { lpHistory, ctl: historyCtl } = useLPHistory();
  // TODO: APIで取得したデッキ一覧にする
  const decks = ["旋風BF", "墓地BF", "ヒーロービート", "代行天使"];
  const { player: p1, ctl: ctl1 } = usePlayer(1, decks, historyCtl);
  const { player: p2, ctl: ctl2 } = usePlayer(2, decks, historyCtl);
  return (
    <>
      <AWANav />
      <Container>
        <Toolbar
          showLPHistoryModal={showLPHistoryModal}
          lpHistory={lpHistory}
          lpHistoryCtl={historyCtl}
          player1Ctl={ctl1}
          player2Ctl={ctl2}
        />
        <div className="sides">
          <Side decks={decks} player={p1} ctl={ctl1} isLeft={true}></Side>
          <Side decks={decks} player={p2} ctl={ctl2} isLeft={false}></Side>
        </div>
      </Container>
      <LPHistoryModal lpHistory={lpHistory} />
    </>
  );
};

export default LP;
