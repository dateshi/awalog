import { useState } from "react";
import { Result } from "../result";
import Sidebar from "./Sidebar";
import Summary from "./Summary";

type Props = {
  results: Result[];
  decks: string[];
};

const Body = (props: Props) => {
  const { results, decks } = props;
  const [deck, setDeck] = useState("サマリー");
  return (
    <div className="body">
      <Sidebar decks={decks} selectedDeck={deck} setDeck={setDeck} />
      <Summary results={results} />
    </div>
  );
};

export default Body;
