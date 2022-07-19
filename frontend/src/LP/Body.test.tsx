import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Body from "./Body";

describe("LP/Body", () => {
  const decks = ["旋風BF", "代行天使"];
  const save = jest.fn();
  const user = userEvent.setup();

  it("初期状態", () => {
    render(<Body decks={decks} save={save} />);
    expect(screen.getByTestId("undo") as HTMLButtonElement).toBeDisabled();
    expect(screen.getByTestId("redo") as HTMLButtonElement).toBeDisabled();
    expect(
      (screen.getByTestId("window-deck-1p") as HTMLSelectElement)
        .selectedOptions[0].textContent
    ).toEqual("旋風BF");
    expect(
      (screen.getByTestId("window-deck-2p") as HTMLSelectElement)
        .selectedOptions[0].textContent
    ).toEqual("旋風BF");
    expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
    expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
  });

  describe("LP計算", () => {
    describe("クイックLP減算", () => {
      it("1PのLPを-1000する", async () => {
        render(<Body decks={decks} save={save} />);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        await user.click(screen.getAllByText("-1000")[0]);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("7000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
      });
      it("2PのLPを-2000する", async () => {
        render(<Body decks={decks} save={save} />);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        await user.click(screen.getAllByText("-2000")[1]);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("6000");
      });
      it("LPは0未満にならない", async () => {
        render(<Body decks={decks} save={save} />);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        await user.click(screen.getAllByText("-3000")[0]);
        await user.click(screen.getAllByText("-3000")[0]);
        await user.click(screen.getAllByText("-3000")[0]);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("0");
      });
    });
    describe("LP加算", () => {
      it("1PのLPを加算する。加算後、normalモードに遷移することを確認", async () => {
        render(<Body decks={decks} save={save} />);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        await user.click(screen.getAllByText("+")[0]);
        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("2"));
        await user.click(screen.getByText("3"));
        await user.click(screen.getByText("4"));
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual(
          "8000+1234"
        );
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        await user.click(screen.getByText("="));
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("9234");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        expect(screen.queryByText("7")).not.toBeInTheDocument();
        expect(screen.getAllByText("-50").length).toEqual(2);
      });
      it("2PのLPを加算する", async () => {
        render(<Body decks={decks} save={save} />);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        await user.click(screen.getAllByText("+")[1]);
        await user.click(screen.getByText("9"));
        await user.click(screen.getByText("0"));
        await user.click(screen.getByText("00"));
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual(
          "8000+9000"
        );
        await user.click(screen.getByText("="));
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("17000");
      });
      it("00キーを使い大きなLPを加算する", async () => {
        render(<Body decks={decks} save={save} />);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        await user.click(screen.getAllByText("+")[0]);
        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("00"));
        await user.click(screen.getByText("00"));
        await user.click(screen.getByText("0"));
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual(
          "8000+100000"
        );
        await user.click(screen.getByText("="));
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual(
          "108000"
        );
      });
    });
    describe("LP減算", () => {
      it("1PのLPを減算する。減算後、normalモードに遷移することを確認", async () => {
        render(<Body decks={decks} save={save} />);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        await user.click(screen.getAllByText("-")[0]);
        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("2"));
        await user.click(screen.getByText("3"));
        await user.click(screen.getByText("4"));
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual(
          "8000-1234"
        );
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        await user.click(screen.getByText("="));
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("6766");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        expect(screen.queryByText("7")).not.toBeInTheDocument();
        expect(screen.getAllByText("-50").length).toEqual(2);
      });
      it("2PのLPを減算する", async () => {
        render(<Body decks={decks} save={save} />);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        await user.click(screen.getAllByText("-")[1]);
        await user.click(screen.getByText("1"));
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual(
          "8000-1"
        );
        await user.click(screen.getByText("="));
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("7999");
      });
      it("LPは0未満にはならない", async () => {
        render(<Body decks={decks} save={save} />);
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        await user.click(screen.getAllByText("-")[1]);
        await user.click(screen.getByText("9"));
        await user.click(screen.getByText("00"));
        await user.click(screen.getByText("00"));
        await user.click(screen.getByText("0"));
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual(
          "8000-900000"
        );
        await user.click(screen.getByText("="));
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("0");
      });
    });
    describe("加減算モードのキャンセル", () => {
      it("加算モードに遷移した直後にキャンセル", async () => {
        render(<Body decks={decks} save={save} />);
        await user.click(screen.getAllByText("+")[0]);
        expect(screen.getByText("7")).toBeInTheDocument();
        expect(screen.getAllByText("-50").length).toEqual(1);
        await user.click(screen.getByText("C"));
        expect(screen.queryByText("7")).not.toBeInTheDocument();
        expect(screen.getAllByText("-50").length).toEqual(2);
      });
      it("減算モードでLP入力中にキャンセル", async () => {
        render(<Body decks={decks} save={save} />);
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        await user.click(screen.getAllByText("-")[1]);
        await user.click(screen.getByText("1"));
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual(
          "8000-1"
        );
        expect(screen.getByText("7")).toBeInTheDocument();
        expect(screen.getAllByText("-50").length).toEqual(1);
        await user.click(screen.getByText("C"));
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        expect(screen.queryByText("7")).not.toBeInTheDocument();
        expect(screen.getAllByText("-50").length).toEqual(2);
      });
      it("1Pが加算モード、2Pが減算モードの状態で2P側をキャンセル", async () => {
        render(<Body decks={decks} save={save} />);
        await user.click(screen.getAllByText("+")[0]);
        await user.click(screen.getAllByText("-")[1]);
        await user.click(screen.getAllByText("1")[0]);
        await user.click(screen.getAllByText("2")[1]);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual(
          "8000+1"
        );
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual(
          "8000-2"
        );
        expect(screen.queryByText("-50")).not.toBeInTheDocument();
        expect(screen.getAllByText("7").length).toEqual(2);
        await user.click(screen.getAllByText("C")[1]);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual(
          "8000+1"
        );
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        expect(screen.getByText("7")).toBeInTheDocument();
        expect(screen.getByText("-50")).toBeInTheDocument();
      });
      it("加算モードでLP入力中にキャンセルし加算モードに戻ると入力したLPはクリアされる", async () => {
        render(<Body decks={decks} save={save} />);
        await user.click(screen.getAllByText("+")[0]);
        await user.click(screen.getByText("1"));
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual(
          "8000+1"
        );
        await user.click(screen.getByText("C"));
        await user.click(screen.getAllByText("+")[0]);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
      });
    });
    describe("LP半分", () => {
      it("1PのLPを半分にする", async () => {
        render(<Body decks={decks} save={save} />);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        await user.click(screen.getAllByText("1/2")[0]);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("4000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
      });
      it("2PのLPを半分にする", async () => {
        render(<Body decks={decks} save={save} />);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
        await user.click(screen.getAllByText("1/2")[1]);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("4000");
      });
      it("LPが奇数の場合は切り上げ", async () => {
        render(<Body decks={decks} save={save} />);
        await user.click(screen.getAllByText("-")[0]);
        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("="));
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("7999");
        await user.click(screen.getAllByText("1/2")[0]);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("4000");
      });
      it("LPが1の場合は1のまま", async () => {
        render(<Body decks={decks} save={save} />);
        await user.click(screen.getAllByText("-")[0]);
        await user.click(screen.getByText("7"));
        await user.click(screen.getByText("9"));
        await user.click(screen.getByText("9"));
        await user.click(screen.getByText("9"));
        await user.click(screen.getByText("="));
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("1");
        await user.click(screen.getAllByText("1/2")[0]);
        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("1");
      });
    });
  });
});
