import AWANav from "../AWANav";
import Body from "./Body";
import "./style.scss";
import { Result } from "../result";

const LP = () => {
  // TODO: APIで取得したデッキ一覧にする
  const decks = ["旋風BF", "墓地BF", "ヒーロービート", "代行天使"];

  // TODO: APIで結果を保存
  const save = (result: Result) => {
    console.log(result[0]);
    console.log(result[1]);
  };

  return (
    <>
      <AWANav />
      <Body decks={decks} save={save} />
    </>
  );
};

export default LP;
