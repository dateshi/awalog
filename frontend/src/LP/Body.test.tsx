import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Body from "./Body";

describe("LP/Body", () => {
  const user = userEvent.setup();

  describe("初期状態", () => {
    const DefaultBody = (
      <Body decks={["旋風BF", "代行天使"]} save={jest.fn()} />
    );
    it("初期状態ではundo/redoボタンは非活性化状態である", () => {
      render(DefaultBody);

      expect(screen.getByTestId("undo")).toBeDisabled();
      expect(screen.getByTestId("redo")).toBeDisabled();
    });
    it("初期状態の選択中デッキはデッキ一覧の先頭である", () => {
      render(DefaultBody);

      expect(screen.getByTestId("window-deck-1p")).toHaveDisplayValue("旋風BF");
      expect(screen.getByTestId("window-deck-2p")).toHaveDisplayValue("旋風BF");
    });
    it("初期状態のLPは8000である", () => {
      render(DefaultBody);

      expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
      expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
    });
    it("初期状態のログは空である", async () => {
      render(DefaultBody);

      await user.click(screen.getByText("ログ"));

      expect(screen.queryByTestId("modal-log")).not.toBeInTheDocument();
    });
  });

  describe("LP計算", () => {
    const DefaultBody = (
      <Body decks={["旋風BF", "代行天使"]} save={jest.fn()} />
    );
    describe("クイックLP減算", () => {
      it("お互いのLPが8000の状態で1PのLPを-1000すると1PのLPが7000になる。2PのLPは8000のまま", async () => {
        render(DefaultBody);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");

        await user.click(screen.getAllByText("-1000")[0]);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("7000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
      });
      it("お互いのLPが8000の状態で2PのLPを-2000すると1PのLPは8000のままだが2PのLPは6000になる", async () => {
        render(DefaultBody);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");

        await user.click(screen.getAllByText("-2000")[1]);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("6000");
      });
      it("1PのLPが2000の状態で1PのLPを-3000すると1PのLPは0になる（マイナスにはならない）", async () => {
        render(DefaultBody);
        await user.click(screen.getAllByText("-3000")[0]);
        await user.click(screen.getAllByText("-3000")[0]);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("2000");

        await user.click(screen.getAllByText("-3000")[0]);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("0");
      });
    });
    describe("LP加算", () => {
      it("お互いがnormalモードで1Pの+キーを押すと1P側はテンキー配置になる。2Pはそのまま", async () => {
        render(DefaultBody);

        expect(screen.getAllByText("-50").length).toEqual(2);
        expect(screen.queryByText("7")).not.toBeInTheDocument();

        await user.click(screen.getAllByText("+")[0]);

        expect(screen.getByText("-50")).toBeInTheDocument();
        expect(screen.getByText("7")).toBeInTheDocument();
      });
      it("LPが8000の状態で+1234を入力するとLP欄に8000+1234が表示される", async () => {
        render(DefaultBody);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");

        await user.click(screen.getAllByText("+")[0]);
        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("2"));
        await user.click(screen.getByText("3"));
        await user.click(screen.getByText("4"));

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual(
          "8000+1234"
        );
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
      });
      it("お互いのLPが8000の状態で1PのLPを+1234すると1PのLPは9234になる。2Pは8000のまま", async () => {
        render(DefaultBody);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");

        await user.click(screen.getAllByText("+")[0]);
        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("2"));
        await user.click(screen.getByText("3"));
        await user.click(screen.getByText("4"));
        await user.click(screen.getByText("="));

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("9234");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
      });
      it("LP加算後はnormalモードに戻る", async () => {
        render(DefaultBody);
        await user.click(screen.getAllByText("+")[0]);

        expect(screen.getByText("-50")).toBeInTheDocument();
        expect(screen.getByText("7")).toBeInTheDocument();

        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("="));

        expect(screen.getAllByText("-50").length).toEqual(2);
        expect(screen.queryByText("7")).not.toBeInTheDocument();
      });
      it("お互いのLPが8000の状態で2PのLPを+9000すると1PのLPは8000のままだが2PのLPは17000になる", async () => {
        render(DefaultBody);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");

        await user.click(screen.getAllByText("+")[1]);
        await user.click(screen.getByText("9"));
        await user.click(screen.getByText("0"));
        await user.click(screen.getByText("00"));
        await user.click(screen.getByText("="));

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("17000");
      });

      it("LPが8000の状態で+100000すると1PのLPは108000になる（LPに上限はない）", async () => {
        render(DefaultBody);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");

        await user.click(screen.getAllByText("+")[0]);
        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("00"));
        await user.click(screen.getByText("00"));
        await user.click(screen.getByText("0"));
        await user.click(screen.getByText("="));

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual(
          "108000"
        );
      });
    });
    describe("LP減算", () => {
      it("お互いがnormalモードで1Pの-キーを押すと1P側はテンキー配置になる。2Pはそのまま", async () => {
        render(DefaultBody);

        expect(screen.getAllByText("-50").length).toEqual(2);
        expect(screen.queryByText("7")).not.toBeInTheDocument();

        await user.click(screen.getAllByText("+")[0]);

        expect(screen.getByText("-50")).toBeInTheDocument();
        expect(screen.getByText("7")).toBeInTheDocument();
      });
      it("LPが8000の状態で-1234を入力するとLP欄に8000-1234が表示される", async () => {
        render(DefaultBody);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");

        await user.click(screen.getAllByText("-")[0]);
        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("2"));
        await user.click(screen.getByText("3"));
        await user.click(screen.getByText("4"));

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual(
          "8000-1234"
        );
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
      });
      it("お互いのLPが8000の状態で1PのLPを-1234すると1PのLPは6766になる。2Pは8000のまま", async () => {
        render(DefaultBody);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");

        await user.click(screen.getAllByText("-")[0]);
        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("2"));
        await user.click(screen.getByText("3"));
        await user.click(screen.getByText("4"));
        await user.click(screen.getByText("="));

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("6766");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
      });
      it("LP減算後はnormalモードに戻る", async () => {
        render(DefaultBody);
        await user.click(screen.getAllByText("-")[0]);

        expect(screen.getByText("-50")).toBeInTheDocument();
        expect(screen.getByText("7")).toBeInTheDocument();

        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("="));

        expect(screen.getAllByText("-50").length).toEqual(2);
        expect(screen.queryByText("7")).not.toBeInTheDocument();
      });
      it("お互いのLPが8000の状態で2PのLPを-1すると1PのLPは8000のままだが2PのLPは7999になる", async () => {
        render(DefaultBody);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");

        await user.click(screen.getAllByText("-")[1]);
        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("="));

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("7999");
      });
      it("LPが1233の状態でLPを-1234するとLPは0になる（マイナスにはならない）", async () => {
        render(DefaultBody);
        await user.click(screen.getAllByText("-")[0]);
        await user.click(screen.getByText("6"));
        await user.click(screen.getByText("7"));
        await user.click(screen.getByText("6"));
        await user.click(screen.getByText("7"));
        await user.click(screen.getByText("="));

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("1233");

        await user.click(screen.getAllByText("-")[0]);
        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("2"));
        await user.click(screen.getByText("3"));
        await user.click(screen.getByText("4"));
        await user.click(screen.getByText("="));

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("0");
      });
    });
    describe("加減算モードのキャンセル", () => {
      it("加算モードでキャンセルするとnormalモードになる", async () => {
        render(DefaultBody);
        await user.click(screen.getAllByText("+")[0]);

        expect(screen.getByText("7")).toBeInTheDocument();
        expect(screen.getAllByText("-50").length).toEqual(1);

        await user.click(screen.getByText("C"));

        expect(screen.queryByText("7")).not.toBeInTheDocument();
        expect(screen.getAllByText("-50").length).toEqual(2);
      });
      it("減算モードでLP入力中にキャンセルするとnormalモードになり入力していたLPもクリアされる", async () => {
        render(DefaultBody);
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
      it("1Pが加算モード、2Pが減算モードの状態で2P側をキャンセルすると1Pは加算モードのままだが2Pはnormalモードになる", async () => {
        render(DefaultBody);
        await user.click(screen.getAllByText("+")[0]);
        await user.click(screen.getAllByText("1")[0]);
        await user.click(screen.getAllByText("-")[1]);
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
        render(DefaultBody);
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
      it("お互いのLPが8000の状態で1PのLPを半分にすると1PのLPは4000になる。2PのLPは8000のまま", async () => {
        render(DefaultBody);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");

        await user.click(screen.getAllByText("1/2")[0]);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("4000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");
      });
      it("お互いのLPが8000の状態で2PのLPを半分にすると1PのLPは8000のままだが2PのLPは4000になる", async () => {
        render(DefaultBody);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("8000");

        await user.click(screen.getAllByText("1/2")[1]);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("8000");
        expect(screen.getByTestId("window-lp-2p").textContent).toEqual("4000");
      });
      it("LPが奇数の状態でLPを半分にするとLPは切り上げられる", async () => {
        render(DefaultBody);
        await user.click(screen.getAllByText("-")[0]);
        await user.click(screen.getByText("1"));
        await user.click(screen.getByText("="));

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("7999");

        await user.click(screen.getAllByText("1/2")[0]);

        expect(screen.getByTestId("window-lp-1p").textContent).toEqual("4000");
      });
      it("LPが1の状態でLPを半分にしてもLPは1のまま", async () => {
        render(DefaultBody);
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

  describe("ログ", () => {
    const DefaultBody = (props: { decks: string[] }) => (
      <Body decks={props.decks} save={jest.fn()} />
    );
    it("初期状態で1PのLPを減算すると1Pの減算ログが追加される", async () => {
      render(<DefaultBody decks={["旋風BF", "代行天使"]} />);
      await user.selectOptions(
        screen.getByTestId("window-deck-2p"),
        "代行天使"
      );
      await user.click(screen.getByText("ログ"));

      expect(screen.queryByTestId("modal-log")).not.toBeInTheDocument();

      await user.click(screen.getByLabelText("Close"));
      await user.click(screen.getAllByText("-1000")[0]);
      await user.click(screen.getByText("ログ"));

      expect(screen.getByTestId("modal-log")).toHaveTextContent("旋風BF (1P)");
      expect(screen.getByTestId("modal-log")).toHaveTextContent(
        "8000 → 7000 (-1000)"
      );
    });
    it("初期状態で2PのLPを加算すると2Pの加算ログが追加される", async () => {
      render(<DefaultBody decks={["旋風BF", "代行天使"]} />);
      await user.selectOptions(
        screen.getByTestId("window-deck-2p"),
        "代行天使"
      );
      await user.click(screen.getByText("ログ"));

      expect(screen.queryByTestId("modal-log")).not.toBeInTheDocument();

      await user.click(screen.getByLabelText("Close"));
      await user.click(screen.getAllByText("+")[1]);
      await user.click(screen.getByText("1"));
      await user.click(screen.getByText("="));
      await user.click(screen.getByText("ログ"));

      expect(screen.getByTestId("modal-log")).toHaveTextContent(
        "代行天使 (2P)"
      );
      expect(screen.getByTestId("modal-log")).toHaveTextContent(
        "8000 → 8001 (+1)"
      );
    });
    it("初期状態で1PのLPを減算した後に2PのLPを加算すると2P加算、1P減算の順でログが表示される", async () => {
      render(<DefaultBody decks={["旋風BF", "代行天使"]} />);
      await user.selectOptions(
        screen.getByTestId("window-deck-2p"),
        "代行天使"
      );
      await user.click(screen.getByText("ログ"));

      expect(screen.queryByTestId("modal-log")).not.toBeInTheDocument();

      await user.click(screen.getByLabelText("Close"));
      await user.click(screen.getAllByText("-1000")[0]);
      await user.click(screen.getAllByText("+")[1]);
      await user.click(screen.getByText("1"));
      await user.click(screen.getByText("="));
      await user.click(screen.getByText("ログ"));

      expect(screen.getAllByTestId("modal-log")[0]).toHaveTextContent(
        "代行天使 (2P)"
      );
      expect(screen.getAllByTestId("modal-log")[0]).toHaveTextContent(
        "8000 → 8001 (+1)"
      );
      expect(screen.getAllByTestId("modal-log")[1]).toHaveTextContent(
        "旋風BF (1P)"
      );
      expect(screen.getAllByTestId("modal-log")[1]).toHaveTextContent(
        "8000 → 7000 (-1000)"
      );
    });
    it("LPを半減するとLPの半分に対応する減算としてログに記録される", async () => {
      render(<DefaultBody decks={["旋風BF", "代行天使"]} />);
      await user.click(screen.getByText("ログ"));

      expect(screen.queryByTestId("modal-log")).not.toBeInTheDocument();

      await user.click(screen.getByLabelText("Close"));
      await user.click(screen.getAllByText("1/2")[0]);
      await user.click(screen.getByText("ログ"));

      expect(screen.getByTestId("modal-log")).toHaveTextContent("旋風BF (1P)");
      expect(screen.getByTestId("modal-log")).toHaveTextContent(
        "8000 → 4000 (-4000)"
      );
    });
    it("LPを10回減算した後にさらにもう一度LPを減算すると最初の減算ログは表示されない（直近10件の減算ログのみ表示される）", async () => {
      render(<DefaultBody decks={["旋風BF", "代行天使"]} />);
      await user.click(screen.getAllByText("-50")[0]);
      await user.click(screen.getAllByText("-100")[0]);
      await user.click(screen.getAllByText("-200")[0]);
      await user.click(screen.getAllByText("-300")[0]);
      await user.click(screen.getAllByText("-400")[0]);
      await user.click(screen.getAllByText("-500")[0]);
      await user.click(screen.getAllByText("-600")[0]);
      await user.click(screen.getAllByText("-800")[0]);
      await user.click(screen.getAllByText("-900")[0]);
      await user.click(screen.getAllByText("-1000")[0]);
      await user.click(screen.getByText("ログ"));

      expect(screen.getAllByTestId("modal-log").length).toEqual(10);
      expect(screen.getAllByTestId("modal-log")[9]).toHaveTextContent(
        "旋風BF (1P)"
      );
      expect(screen.getAllByTestId("modal-log")[9]).toHaveTextContent(
        "8000 → 7950 (-50)"
      );

      await user.click(screen.getByLabelText("Close"));
      await user.click(screen.getAllByText("-2000")[0]);
      await user.click(screen.getByText("ログ"));

      expect(screen.getAllByTestId("modal-log").length).toEqual(10);
      expect(screen.getAllByTestId("modal-log")[9]).toHaveTextContent(
        "旋風BF (1P)"
      );
      expect(screen.getAllByTestId("modal-log")[9]).toHaveTextContent(
        "7950 → 7850 (-100)"
      );
    });
    it("1PのLPを減算した後に1Pのデッキを変更すると変更後のデッキで減算ログが表示される", async () => {
      render(<DefaultBody decks={["旋風BF", "代行天使"]} />);
      await user.click(screen.getAllByText("-1000")[0]);
      await user.click(screen.getByText("ログ"));

      expect(screen.getByTestId("modal-log")).toHaveTextContent("旋風BF (1P)");
      expect(screen.getByTestId("modal-log")).toHaveTextContent(
        "8000 → 7000 (-1000)"
      );

      await user.click(screen.getByLabelText("Close"));
      await user.selectOptions(
        screen.getByTestId("window-deck-1p"),
        "代行天使"
      );
      await user.click(screen.getByText("ログ"));

      expect(screen.getByTestId("modal-log")).toHaveTextContent(
        "代行天使 (1P)"
      );
      expect(screen.getByTestId("modal-log")).toHaveTextContent(
        "8000 → 7000 (-1000)"
      );
    });
  });
});
