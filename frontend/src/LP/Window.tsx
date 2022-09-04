import { Form, ProgressBar } from "react-bootstrap";
import { Mode } from "./Game";
import {
  BsCheckCircle,
  BsCircle,
  BsDashCircle,
  BsXCircle,
} from "react-icons/bs";

import { ResultChar } from "../result";

type Props = {
  decks: string[];
  setDeck: (deck: string) => void;
  lp: number;
  mode: Mode;
  buf: number;
  isLeft: boolean;
  results: ResultChar[];
};

const ResultIcon = ({ result }: { result: ResultChar | null }) => {
  const size = 40;
  const Icon = (() => {
    if (result === "W") {
      return BsCheckCircle;
    }
    if (result === "L") {
      return BsXCircle;
    }
    if (result === "D") {
      return BsDashCircle;
    }
    return BsCircle;
  })();
  return <Icon size={size} />;
};

const Window = (props: Props) => {
  const { decks, setDeck, lp, mode, buf, isLeft, results } = props;
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
  const LPResult = (
    <div className={isLeft ? "lp-result-left" : "lp-result-right"}>
      <ResultIcon result={results.length >= 1 ? results[0] : null} />
      <ResultIcon result={results.length >= 2 ? results[1] : null} />
      <ResultIcon result={results.length >= 3 ? results[2] : null} />
    </div>
  );
  return (
    <div className={isLeft ? "lp-box-left" : "lp-box-right"}>
      {!isLeft && LPResult}
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
      {isLeft && LPResult}
    </div>
  );
};

export default Window;
