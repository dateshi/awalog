import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Body from "./Body";

jest.mock("react-chartjs-2");

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
});
