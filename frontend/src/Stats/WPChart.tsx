import { Bar } from "react-chartjs-2";

type Props = {
  title: string;
  decks: string[];
  wp: number[];
};

const WPChart = (props: Props) => {
  const { title, decks, wp } = props;
  return (
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
            text: title,
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
  );
};

export default WPChart;