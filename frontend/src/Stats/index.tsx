import AWANav from "../AWANav";
import { Player } from "../LP/helper";
import Body from "./Body";
import "./style.scss";

const Stats = () => {
  // TODO: APIで取得した結果一覧にする
  const results: [Player, Player][] = [
    [
      {
        id: 1,
        deck: "旋風BF",
        lp: 5000,
        mode: "normal",
        buf: 0,
      },
      {
        id: 2,
        deck: "代行天使",
        lp: 0,
        mode: "normal",
        buf: 0,
      },
    ],
    [
      {
        id: 1,
        deck: "ヒーロービート",
        lp: 5000,
        mode: "normal",
        buf: 0,
      },
      {
        id: 2,
        deck: "六武衆",
        lp: 0,
        mode: "normal",
        buf: 0,
      },
    ],
    [
      {
        id: 1,
        deck: "旋風BF",
        lp: 0,
        mode: "normal",
        buf: 0,
      },
      {
        id: 2,
        deck: "ヒーロービート",
        lp: 8000,
        mode: "normal",
        buf: 0,
      },
    ],
  ];

  return (
    <>
      <AWANav />
      <Body results={results} />
    </>
  );
};

export default Stats;
