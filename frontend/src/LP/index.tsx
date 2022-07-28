import AWANav from "../AWANav";
import { Player } from "./helper";
import Body from "./Body";
import "./style.scss";

const LP = () => {
  // TODO: APIで取得したデッキ一覧にする
  const decks = ["旋風BF", "墓地BF", "ヒーロービート", "代行天使"];

  // TODO: APIで結果を保存
  const save = (p1: Player, p2: Player) => {
    console.log(p1);
    console.log(p2);
  };

  return (
    <>
      <AWANav />
      <Body decks={decks} save={save} />
    </>
  );
};

export default LP;
