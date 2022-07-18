import { Container } from "react-bootstrap";
import AWANav from "../AWANav";
import "./style.scss";
import Toolbar from "./Toolbar";
import { useLPHistory, usePlayer } from "./lp";
import Side from "./Side";
import {
  useCoinModal,
  useDiceModal,
  useHistoryModal,
  useResetModal,
  useSaveModal,
} from "./modal";

const LP = () => {
  const { SaveModal, showSaveModal } = useSaveModal();
  const { ResetModal, showResetModal } = useResetModal();
  const { LPHistoryModal, showLPHistoryModal } = useHistoryModal();
  const { CoinModal, showCoinModal } = useCoinModal();
  const { DiceModal, showDiceModal } = useDiceModal();
  const { lpHistory, ctl: historyCtl } = useLPHistory();
  // TODO: APIで取得したデッキ一覧にする
  const decks = ["旋風BF", "墓地BF", "ヒーロービート", "代行天使"];
  const { player: p1, ctl: ctl1 } = usePlayer(
    1,
    decks,
    historyCtl,
    showSaveModal
  );
  const { player: p2, ctl: ctl2 } = usePlayer(
    2,
    decks,
    historyCtl,
    showSaveModal
  );
  const reset = () => {
    historyCtl.reset();
    ctl1.reset();
    ctl2.reset();
  };

  return (
    <>
      <AWANav />
      <Container>
        <Toolbar
          showResetModal={showResetModal}
          showLPHistoryModal={showLPHistoryModal}
          showCoinModal={showCoinModal}
          showDiceModal={showDiceModal}
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
      <SaveModal p1={p1} p2={p2} />
      <LPHistoryModal lpHistory={lpHistory} player1={p1} player2={p2} />
      <ResetModal reset={reset} />
      <CoinModal />
      <DiceModal />
    </>
  );
};

export default LP;
