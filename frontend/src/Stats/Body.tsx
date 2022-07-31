import { Player } from "../LP/helper";
import Summary from "./Summary";

type Props = {
  results: [Player, Player][];
};

const Body = (props: Props) => {
  return (
    <>
      <Summary results={props.results} />
    </>
  );
};

export default Body;
