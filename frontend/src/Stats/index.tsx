import AWANav from "../AWANav";
import { Result } from "../result";
import Body from "./Body";
import "./style.scss";

const Stats = () => {
  // TODO: APIで取得したデッキ一覧にする
  const decks = ["旋風BF", "代行天使", "ヒーロービート", "六武衆"];

  // TODO: APIで取得した結果一覧にする
  const results: Result[] = [
    {
      decks: ["旋風BF", "代行天使"],
      duels: [
        [{ lp: 5000 }, { lp: 0 }],
        [{ lp: 0 }, { lp: 2000 }],
        [{ lp: 8000 }, { lp: 0 }],
      ],
      format: "Match",
    },
    {
      decks: ["ヒーロービート", "六武衆"],
      duels: [
        [{ lp: 5000 }, { lp: 0 }],
        [{ lp: 100 }, { lp: 0 }],
      ],
      format: "Match",
    },
    {
      decks: ["旋風BF", "ヒーロービート"],
      duels: [
        [{ lp: 0 }, { lp: 8000 }],
        [{ lp: 1250 }, { lp: 0 }],
        [{ lp: 0 }, { lp: 8000 }],
      ],
      format: "Match",
    },
    {
      decks: ["旋風BF", "六武衆"],
      duels: [
        [{ lp: 0 }, { lp: 2000 }],
        [{ lp: 2000 }, { lp: 0 }],
        [{ lp: 0 }, { lp: 0 }],
      ],
      format: "Match",
    },
  ];

  return (
    <>
      <AWANav />
      <Body results={results} decks={decks} />
    </>
  );
};

export default Stats;
