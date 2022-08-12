import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Result } from "../result";
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
  results.forEach(([p1, p2]) => {
    if (!(p1.deck in summary)) {
      summary[p1.deck] = { win: 0, lose: 0, draw: 0 };
    }
    if (!(p2.deck in summary)) {
      summary[p2.deck] = { win: 0, lose: 0, draw: 0 };
    }

    if (p1.lp > 0) {
      summary[p1.deck].win++;
      summary[p2.deck].lose++;
    } else if (p2.lp > 0) {
      summary[p1.deck].lose++;
      summary[p2.deck].win++;
    } else {
      summary[p1.deck].draw++;
      summary[p2.deck].draw++;
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
