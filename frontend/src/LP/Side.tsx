import Controller from "./Controller";
import { Player, PlayertCtl } from "./lp";
import Window from "./Window";

type Props = {
  player: Player;
  ctl: PlayertCtl;
  isLeft: boolean;
};

const Side = (props: Props) => {
  const { player, ctl, isLeft } = props;
  return (
    <div className="side">
      <Window
        name="旋風BF"
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
