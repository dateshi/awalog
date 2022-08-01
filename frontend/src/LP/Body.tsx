import { Container } from "react-bootstrap";
import "./style.scss";
import Toolbar from "./Toolbar";
import { useLPHistory, usePlayer } from "./helper";
import Side from "./Side";
import {
  useCoinModal,
  useDiceModal,
  useHistoryModal,
  useResetModal,
  useSaveModal,
} from "./modal";
import { Result } from "../result";

type Props = {
  decks: string[];
  save: (result: Result) => void;
};

const Body = (props: Props) => {
  const { decks, save } = props;
  const { SaveModal, showSaveModal } = useSaveModal(save);
  const { ResetModal, showResetModal } = useResetModal();
  const { LPHistoryModal, showLPHistoryModal } = useHistoryModal();
  const { CoinModal, showCoinModal } = useCoinModal();
  const { DiceModal, showDiceModal } = useDiceModal();
  const { lpHistory, ctl: historyCtl } = useLPHistory();
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
      <SaveModal result={[p1, p2]} />
      <LPHistoryModal lpHistory={lpHistory} player1={p1} player2={p2} />
      <ResetModal reset={reset} />
      <CoinModal />
      <DiceModal />
    </>
  );
};

export default Body;
