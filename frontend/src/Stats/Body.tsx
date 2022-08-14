import { useState } from "react";
import { Container } from "react-bootstrap";
import { Result } from "../result";
import Detail from "./Detail";
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
    <Container>
      <div className="body">
        <Sidebar decks={decks} selectedDeck={deck} setDeck={setDeck} />
        {deck === "サマリー" ? (
          <Summary results={results} />
        ) : (
          <Detail results={results} deck={deck} />
        )}
      </div>
    </Container>
  );
};

export default Body;
