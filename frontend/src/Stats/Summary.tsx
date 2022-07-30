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
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      data={{
        labels: ["旋風BF", "代行天使"],
        datasets: [
          {
            label: "勝率",
            data: [45, 55],
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      }}
    ></Bar>
  );
};

export default Summary;
