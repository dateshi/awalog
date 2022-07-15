import React from "react";
import { render, screen } from "@testing-library/react";
import Window from "./Window";

describe("Window", () => {
  it("初期状態", () => {
    const decks = ["旋風BF", "代行天使"];
    const setDeck = jest.fn();
    const lp = 8000;
    const mode = "normal";
    const buf = 0;
    const isLeft = false;
    render(
      <Window
        decks={decks}
        setDeck={setDeck}
        lp={lp}
        mode={mode}
        buf={buf}
        isLeft={isLeft}
      />
    );
    const divLP = screen.getByTestId("lp");
    expect(divLP.textContent).toEqual("8000");
  });
});
