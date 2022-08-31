import { Form, ProgressBar } from "react-bootstrap";
import { Mode } from "./Game";

type Props = {
  decks: string[];
  setDeck: (deck: string) => void;
  lp: number;
  mode: Mode;
  buf: number;
  isLeft: boolean;
};

const Window = (props: Props) => {
  const { decks, setDeck, lp, mode, buf, isLeft } = props;
  const now = Math.floor(lp / 80);
  const variant = (() => {
    if (lp > 4000) {
      return "success";
    } else if (lp > 2000) {
      return "warning";
    } else {
      return "danger";
    }
  })();
  const sign = buf === 0 || mode === "normal" ? "" : mode;
  const testID = isLeft ? "1p" : "2p";
  return (
    <div className={isLeft ? "lp-box-left" : "lp-box-right"}>
      <div className="lp-parent bg-light text-black">
        <Form.Select
          size="lg"
          color="bg-light"
          className="deck-selector"
          onChange={(e) => setDeck(e.target.value)}
          data-testid={`window-deck-${testID}`}
        >
          {decks.map((deck) => (
            <option key={deck}>{deck}</option>
          ))}
        </Form.Select>
        <ProgressBar variant={variant} now={now}></ProgressBar>
        <div className="lp" data-testid={`window-lp-${testID}`}>{`${lp}${sign}${
          buf !== 0 ? buf : ""
        }`}</div>
      </div>
    </div>
  );
};

export default Window;
