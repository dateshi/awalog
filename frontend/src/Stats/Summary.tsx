import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { findWinner, Result } from "../result";
import WPChart from "./WPChart";
import NumberChart from "./NumberChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  results: Result[];
};

const calcSummary = (results: Result[]) => {
  const summary: Record<string, { win: number; lose: number; draw: number }> =
    {};
  results.forEach((result) => {
    const { decks } = result;
    if (!(decks[0] in summary)) {
      summary[decks[0]] = { win: 0, lose: 0, draw: 0 };
    }
    if (!(decks[1] in summary)) {
      summary[decks[1]] = { win: 0, lose: 0, draw: 0 };
    }

    const i = findWinner(result);
    if (i === -1) {
      summary[decks[0]].draw++;
      summary[decks[1]].draw++;
    } else if (i !== null) {
      summary[decks[i]].win++;
      summary[decks[1 - i]].lose++;
    }
  });
  return summary;
};

const Summary = (props: Props) => {
  const summary = calcSummary(props.results);
  const decks = Object.keys(summary);
  const wp = Object.values(summary).map(
    ({ win, lose, draw }) => (100 * win) / (win + lose + draw)
  );
  const win = Object.values(summary).map(({ win }) => win);
  const lose = Object.values(summary).map(({ lose }) => lose);
  const draw = Object.values(summary).map(({ draw }) => draw);
  return (
    <div className="main">
      <WPChart title="各デッキの勝率" decks={decks} wp={wp} />
      <NumberChart
        title="各デッキの勝利数・敗北数・引き分け数"
        decks={decks}
        win={win}
        lose={lose}
        draw={draw}
      />
    </div>
  );
};

export default Summary;
