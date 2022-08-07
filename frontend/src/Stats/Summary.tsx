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
              text: "各デッキの勝率",
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
              text: "各デッキの勝利数・敗北数・引き分け数",
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

export default Summary;
