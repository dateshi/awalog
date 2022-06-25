import { Container } from "react-bootstrap";
import AWANav from "../AWANav";
import "./style.scss";
import Toolbar from "./Toolbar";
import { usePlayer } from "./lp";
import Side from "./Side";

const LP = () => {
  const { player: p1, ctl: ctl1 } = usePlayer();
  const { player: p2, ctl: ctl2 } = usePlayer();
  return (
    <>
      <AWANav />
      <Container>
        <Toolbar />
        <div className="sides">
          <Side player={p1} ctl={ctl1} isLeft={true}></Side>
          <Side player={p2} ctl={ctl2} isLeft={false}></Side>
        </div>
      </Container>
    </>
  );
};

export default LP;
