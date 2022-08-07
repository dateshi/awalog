import { Bar } from "react-chartjs-2";
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
      <Bar
        width={800}
        height={350}
        options={{
          scales: {
            y: {
              title: {
                display: true,
                text: "勝率[%]",
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: `${deck}の各デッキに対する勝率`,
            },
            legend: {
              display: false,
            },
          },
        }}
        data={{
          labels: decks,
          datasets: [
            {
              label: "勝率",
              data: wp,
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        }}
      />
      <Bar
        width={800}
        height={350}
        options={{
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: `${deck}の各デッキに対する勝利数・敗北数・引き分け数`,
            },
          },
        }}
        data={{
          labels: decks,
          datasets: [
            {
              label: "勝利数",
              data: win,
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
              label: "敗北数",
              data: lose,
              backgroundColor: "rgb(255, 99, 132, 0.5)",
            },
            {
              label: "引き分け数",
              data: draw,
              backgroundColor: "rgb(75, 192, 192, 0.5)",
            },
          ],
        }}
      />
    </div>
  );
};

export default Detail;
