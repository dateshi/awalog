import classNames from "classnames";
import Nav from "react-bootstrap/Nav";

type Props = {
  decks: string[];
  selectedDeck: string;
  setDeck: (deck: string) => void;
};

const Sidebar = (props: Props) => {
  const { decks, selectedDeck, setDeck } = props;
  return (
    <Nav
      variant="pills"
      className={classNames("flex-column", "sidebar")}
      onSelect={(eventKey) => eventKey && setDeck(eventKey)}
    >
      <Nav.Item>
        <Nav.Link eventKey="サマリー" active={selectedDeck === "サマリー"}>
          サマリー
        </Nav.Link>
      </Nav.Item>
      {decks.map((deck) => (
        <Nav.Item>
          <Nav.Link eventKey={deck} active={selectedDeck === deck}>
            {deck}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Sidebar;
