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
  const { player: p1, ctl: ctl1 } = usePlayer(1, historyCtl);
  const { player: p2, ctl: ctl2 } = usePlayer(2, historyCtl);
  return (
    <>
      <AWANav />
      <Container>
        <Toolbar showLPHistoryModal={showLPHistoryModal} />
        <div className="sides">
          <Side player={p1} ctl={ctl1} isLeft={true}></Side>
          <Side player={p2} ctl={ctl2} isLeft={false}></Side>
        </div>
      </Container>
      <LPHistoryModal lpHistory={lpHistory} />
    </>
  );
};

export default LP;
