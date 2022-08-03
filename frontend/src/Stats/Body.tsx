import { Result } from "../result";
import Sidebar from "./Sidebar";
import Summary from "./Summary";

type Props = {
  results: Result[];
};

const Body = (props: Props) => {
  return (
    <div className="body">
      <Sidebar />
      <Summary results={props.results} />
    </div>
  );
};

export default Body;
