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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Summary = () => {
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
        labels: ["旋風BF", "代行天使", "ヒーロービート", "六武衆"],
        datasets: [
          {
            label: "勝率",
            data: [45, 55, 50, 52.5],
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      }}
    ></Bar>
  );
};

export default Summary;
