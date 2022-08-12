import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Bar } from "react-chartjs-2";
import Body from "./Body";
import { Result } from "../result";

jest.mock("react-chartjs-2", () => ({
  // グラフの代わりにグラフ描画に使われる引数を表示するmock
  Bar: (props: { data: React.ComponentProps<typeof Bar>["data"] }) => {
    const labels = props.data.labels as string[];
    const datasets = props.data.datasets as { label: string; data: number[] }[];
    return (
      <ul>
        {datasets.map((dataset) =>
          labels.map((label, i) => (
            <li key={`${dataset.label}:${label}`}>
              {dataset.label}:{label}={dataset.data[i]}
            </li>
          ))
        )}
      </ul>
    );
  },
}));

describe("Stats/Body", () => {
  const user = userEvent.setup();

  describe("サイドメニュー", () => {
    const DefaultBody = (props: { decks: string[] }) => (
      <Body results={[]} decks={props.decks} />
    );
    it("デッキリストが空でも項目サマリーは表示される", async () => {
      render(<DefaultBody decks={[]} />);

      expect(screen.getByRole("button")).toHaveTextContent("サマリー");
    });
    it("デッキリストが[旋風BF, 代行天使]のときサイドメニューには[サマリー、旋風BF、代行天使]の順で項目が表示される", async () => {
      render(<DefaultBody decks={["旋風BF", "代行天使"]} />);

      const items = screen.getAllByRole("button");
      expect(items).toHaveLength(3);
      expect(items[0]).toHaveTextContent("サマリー");
      expect(items[1]).toHaveTextContent("旋風BF");
      expect(items[2]).toHaveTextContent("代行天使");
    });
    it("初期状態ではサマリーが選択状態", async () => {
      render(<DefaultBody decks={["旋風BF", "代行天使"]} />);

      expect(screen.getByText("サマリー")).toHaveClass("active");
    });
    it("サイドメニューの旋風BFをクリックすると旋風BFが選択状態になる", async () => {
      render(<DefaultBody decks={["旋風BF", "代行天使"]} />);

      expect(screen.getByText("サマリー")).toHaveClass("active");
      expect(screen.getByText("旋風BF")).not.toHaveClass("active");

      await user.click(screen.getByText("旋風BF"));

      expect(screen.getByText("サマリー")).not.toHaveClass("active");
      expect(screen.getByText("旋風BF")).toHaveClass("active");
    });
  });

  describe("戦績サマリー表示", () => {
    const DefaultBody = (props: { results: Result[]; decks: string[] }) => (
      <Body results={props.results} decks={props.decks} />
    );
    it("戦績が空の場合、グラフは空", async () => {
      render(<DefaultBody results={[]} decks={["旋風BF", "代行天使"]} />);
      expect(screen.queryByText(/.*:.*=/)).not.toBeInTheDocument();
    });
    it("旋風BF勝ち代行天使負けの戦績のみ存在する場合、旋風BFの勝率は100%で勝利数1敗北数0引き分け数0、代行天使の勝率は0%で勝利数0敗北数1引き分け数0", async () => {
      render(
        <DefaultBody
          results={[
            [
              { deck: "旋風BF", lp: 1000 },
              { deck: "代行天使", lp: 0 },
            ],
          ]}
          decks={["旋風BF", "代行天使"]}
        />
      );
      expect(screen.getByText("勝率:旋風BF=100")).toBeInTheDocument();
      expect(screen.getByText("勝利数:旋風BF=1")).toBeInTheDocument();
      expect(screen.getByText("敗北数:旋風BF=0")).toBeInTheDocument();
      expect(screen.getByText("引き分け数:旋風BF=0")).toBeInTheDocument();
      expect(screen.getByText("勝率:代行天使=0")).toBeInTheDocument();
      expect(screen.getByText("勝利数:代行天使=0")).toBeInTheDocument();
      expect(screen.getByText("敗北数:代行天使=1")).toBeInTheDocument();
      expect(screen.getByText("引き分け数:代行天使=0")).toBeInTheDocument();
    });
    it("旋風BFと代行天使で引き分けの戦績のみ存在する場合、旋風BFの勝率は0%で勝利数0敗北数0引き分け数1、代行天使の勝率は0%で勝利数0敗北数0引き分け数1", async () => {
      render(
        <DefaultBody
          results={[
            [
              { deck: "旋風BF", lp: 0 },
              { deck: "代行天使", lp: 0 },
            ],
          ]}
          decks={["旋風BF", "代行天使"]}
        />
      );
      expect(screen.getByText("勝率:旋風BF=0")).toBeInTheDocument();
      expect(screen.getByText("勝利数:旋風BF=0")).toBeInTheDocument();
      expect(screen.getByText("敗北数:旋風BF=0")).toBeInTheDocument();
      expect(screen.getByText("引き分け数:旋風BF=1")).toBeInTheDocument();
      expect(screen.getByText("勝率:代行天使=0")).toBeInTheDocument();
      expect(screen.getByText("勝利数:代行天使=0")).toBeInTheDocument();
      expect(screen.getByText("敗北数:代行天使=0")).toBeInTheDocument();
      expect(screen.getByText("引き分け数:代行天使=1")).toBeInTheDocument();
    });
    it("戦績が旋風BF勝ちと代行天使負け、旋風BF勝ちとヒーロービート負け、代行天使勝ちとヒーロービート負けの場合、旋風BFの勝率は100%で勝利数2敗北数0引き分け数0、代行天使の勝率は50%で勝利数1敗北数1引き分け数0、ヒーロービートの勝率は0%で勝利数0敗北数2引き分け数0", async () => {
      render(
        <DefaultBody
          results={[
            [
              { deck: "旋風BF", lp: 1000 },
              { deck: "代行天使", lp: 0 },
            ],
            [
              { deck: "ヒーロービート", lp: 0 },
              { deck: "旋風BF", lp: 2000 },
            ],
            [
              { deck: "代行天使", lp: 6500 },
              { deck: "ヒーロービート", lp: 0 },
            ],
          ]}
          decks={["旋風BF", "代行天使", "ヒーロービート"]}
        />
      );
      expect(screen.getByText("勝率:旋風BF=100")).toBeInTheDocument();
      expect(screen.getByText("勝利数:旋風BF=2")).toBeInTheDocument();
      expect(screen.getByText("敗北数:旋風BF=0")).toBeInTheDocument();
      expect(screen.getByText("引き分け数:旋風BF=0")).toBeInTheDocument();
      expect(screen.getByText("勝率:代行天使=50")).toBeInTheDocument();
      expect(screen.getByText("勝利数:代行天使=1")).toBeInTheDocument();
      expect(screen.getByText("敗北数:代行天使=1")).toBeInTheDocument();
      expect(screen.getByText("引き分け数:代行天使=0")).toBeInTheDocument();
      expect(screen.getByText("勝率:ヒーロービート=0")).toBeInTheDocument();
      expect(screen.getByText("勝利数:ヒーロービート=0")).toBeInTheDocument();
      expect(screen.getByText("敗北数:ヒーロービート=2")).toBeInTheDocument();
      expect(
        screen.getByText("引き分け数:ヒーロービート=0")
      ).toBeInTheDocument();
    });
  });
});
