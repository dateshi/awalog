import { Container } from "react-bootstrap";
import "./style.scss";
import Toolbar from "./Toolbar";
import { useGame } from "./Game";
import Side from "./Side";
import { useCoinModal, useDiceModal, useResetModal } from "./modal";
import { Result } from "../result";

type Props = {
  decks: string[];
  save: (result: Result) => void;
};

const Body = (props: Props) => {
  const { decks, save } = props;
  const { ResetModal, showResetModal } = useResetModal();
  const { CoinModal, showCoinModal } = useCoinModal();
  const { DiceModal, showDiceModal } = useDiceModal();
  const {
    player1,
    ctl1,
    player2,
    ctl2,
    lpHistory,
    reset,
    undo,
    redo,
    NextGameModal,
    SaveModal,
    LPHistoryModal,
    showLPHistoryModal,
  } = useGame(decks, save);

  return (
    <>
      <Container>
        <Toolbar
          showResetModal={showResetModal}
          showLPHistoryModal={showLPHistoryModal}
          showCoinModal={showCoinModal}
          showDiceModal={showDiceModal}
          lpHistory={lpHistory}
          undo={undo}
          redo={redo}
        />
        <div className="sides">
          <Side decks={decks} player={player1} ctl={ctl1} isLeft={true}></Side>
          <Side decks={decks} player={player2} ctl={ctl2} isLeft={false}></Side>
        </div>
      </Container>
      <NextGameModal />
      <SaveModal />
      <LPHistoryModal />
      <ResetModal reset={reset} />
      <CoinModal />
      <DiceModal />
    </>
  );
};

export default Body;
