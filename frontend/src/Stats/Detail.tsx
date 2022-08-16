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
  deck: string;
};

const calcStats = (results: Result[], deck: string) => {
  const summary: Record<string, { win: number; lose: number; draw: number }> =
    {};
  results
    .filter(
      ({ decks }) =>
        (decks[0] === deck && decks[1] !== deck) ||
        (decks[0] !== deck && decks[1] === deck)
    )
    .forEach((result) => {
      const { decks } = result;
      const [you, opponent] = decks[0] === deck ? [0, 1] : [1, 0];
      if (!(decks[opponent] in summary)) {
        summary[decks[opponent]] = { win: 0, lose: 0, draw: 0 };
      }
      const i = findWinner(result);
      if (i === -1) {
        summary[decks[opponent]].draw++;
      } else if (i === you) {
        summary[decks[opponent]].win++;
      } else {
        summary[decks[opponent]].lose++;
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
