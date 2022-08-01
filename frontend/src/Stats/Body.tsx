import { Result } from "../result";
import Summary from "./Summary";

type Props = {
  results: Result[];
};

const Body = (props: Props) => {
  return (
    <>
      <Summary results={props.results} />
    </>
  );
};

export default Body;
