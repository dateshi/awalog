import React from "react";
import { render, screen } from "@testing-library/react";
import Body from "./Body";

describe("LP/Body", () => {
  it("初期状態", () => {
    const decks = ["旋風BF", "代行天使"];
    const save = jest.fn();
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
});
