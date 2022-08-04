import AWANav from "../AWANav";
import { Result } from "../result";
import Body from "./Body";
import "./style.scss";

const Stats = () => {
  // TODO: APIで取得したデッキ一覧にする
  const decks = ["旋風BF", "墓地BF", "ヒーロービート", "代行天使"];

  // TODO: APIで取得した結果一覧にする
  const results: Result[] = [
    [
      {
        deck: "旋風BF",
        lp: 5000,
      },
      {
        deck: "代行天使",
        lp: 0,
      },
    ],
    [
      {
        deck: "ヒーロービート",
        lp: 5000,
      },
      {
        deck: "六武衆",
        lp: 0,
      },
    ],
    [
      {
        deck: "旋風BF",
        lp: 0,
      },
      {
        deck: "ヒーロービート",
        lp: 8000,
      },
    ],
    [
      {
        deck: "旋風BF",
        lp: 0,
      },
      {
        deck: "六武衆",
        lp: 0,
      },
    ],
  ];

  return (
    <>
      <AWANav />
      <Body results={results} decks={decks} />
    </>
  );
};

export default Stats;
