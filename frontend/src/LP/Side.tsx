import Controller from "./Controller";
import { Player, PlayerCtl } from "./Game";
import Window from "./Window";

type Props = {
  decks: string[];
  player: Player;
  ctl: PlayerCtl;
  isLeft: boolean;
};

const Side = (props: Props) => {
  const { player, decks, ctl, isLeft } = props;
  return (
    <div className="side">
      <Window
        decks={decks}
        setDeck={ctl.setDeck}
        lp={player.lp}
        buf={player.buf}
        mode={player.mode}
        isLeft={isLeft}
      />
      <Controller
        mode={player.mode}
        addLP={ctl.addLP}
        halfLP={ctl.halfLP}
        changeMode={ctl.changeMode}
        pushKey={ctl.pushKey}
      />
    </div>
  );
};

export default Side;
