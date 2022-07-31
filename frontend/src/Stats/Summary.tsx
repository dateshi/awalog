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
import { Player } from "../LP/helper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  results: [Player, Player][];
};

const calcSummary = (results: [Player, Player][]) => {
  const summary: Record<string, { total: number; win: number }> = {};
  results.forEach(([p1, p2]) => {
    if (p1.deck in summary) {
      summary[p1.deck].total++;
    } else {
      summary[p1.deck] = { total: 1, win: 0 };
    }
    if (p2.deck in summary) {
      summary[p2.deck].total++;
    } else {
      summary[p2.deck] = { total: 1, win: 0 };
    }
    if (p1.lp > 0) {
      summary[p1.deck].win++;
    }
    if (p2.lp > 0) {
      summary[p2.deck].win++;
    }
  });
  return summary;
};

const Summary = (props: Props) => {
  const summary = calcSummary(props.results);
  const decks = Object.keys(summary);
  const wp = Object.values(summary).map(
    ({ total, win }) => (100 * win) / total
  );
  return (
    <Bar
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
    ></Bar>
  );
};

export default Summary;
