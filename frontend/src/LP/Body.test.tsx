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
