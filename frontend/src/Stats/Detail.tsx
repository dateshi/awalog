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
  deck: string;
};

const calcStats = (results: Result[], deck: string) => {
  const summary: Record<string, { win: number; lose: number; draw: number }> =
    {};
  results
    .filter(
      ([p1, p2]) =>
        (p1.deck === deck && p2.deck !== deck) ||
        (p1.deck !== deck, p2.deck === deck)
    )
    .forEach(([p1, p2]) => {
      const [you, opponent] = p1.deck === deck ? [p1, p2] : [p2, p1];
      if (!(opponent.deck in summary)) {
        summary[opponent.deck] = { win: 0, lose: 0, draw: 0 };
      }
      if (you.lp > 0) {
        summary[opponent.deck].win++;
      } else if (opponent.lp > 0) {
        summary[opponent.deck].lose++;
      } else {
        summary[opponent.deck].draw++;
      }
    });
  return summary;
};

const Detail = (props: Props) => {
  const { results, deck } = props;
  const summary = calcStats(results, deck);
  const decks = Object.keys(summary);
  const wp = Object.values(summary).map(
    ({ win, lose, draw }) => (100 * win) / (win + lose + draw)
  );
  const win = Object.values(summary).map(({ win }) => win);
  const lose = Object.values(summary).map(({ lose }) => lose);
  const draw = Object.values(summary).map(({ draw }) => draw);
  return (
    <div className="main">
      <WPChart title={`${deck}の各デッキに対する勝率`} decks={decks} wp={wp} />
      <NumberChart
        title={`${deck}の各デッキに対する勝利数・敗北数・引き分け数`}
        decks={decks}
        win={win}
        lose={lose}
        draw={draw}
      />
    </div>
  );
};

export default Detail;
