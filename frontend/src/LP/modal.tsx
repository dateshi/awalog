import { useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { LPHistory, Player } from "./helper";

const toStringWithSign = (x: number) => {
  if (x > 0) {
    return "+" + x.toString();
  } else {
    return x.toString();
  }
};

type HistoryProps = {
  lpHistory: LPHistory;
  player1: Player;
  player2: Player;
};

export const useHistoryModal = () => {
  const [showModal, setShowModal] = useState(false);
  const close = () => setShowModal(false);
  const LPHistoryModal = (props: HistoryProps) => {
    const { lpHistory, player1, player2 } = props;
    const head = lpHistory.head;
    const logs = lpHistory.logs.map(({ playerID, from, to }, i) => {
      return (
        <ListGroup.Item variant={i === head ? "dark" : ""} key={i}>
          <div className="modal-log">
            <div className="modal-player-name">
              {playerID === 1 ? player1.deck : player2.deck} ({playerID}P)
            </div>
            <div className="modal-log-lp">
              {from} → {to} ({toStringWithSign(to - from)})
            </div>
          </div>
        </ListGroup.Item>
      );
    });
    const visibleLogs = (() => {
      const len = lpHistory.logs.length;
      // HEADより前のログの数
      const front = head;
      // HEADより後のログの数
      const rear = len - head - 1;

      if (front <= 5) {
        // 前が少ないので前から10個返すだけ
        return logs.slice(0, 10);
      }
      if (rear <= 4) {
        // 後ろが少ないので、後ろから10個返すだけ
        return logs.slice(Math.max(0, len - 10));
      }
      // 前も後ろも十分にログがある場合はHEADを中心に10個のログを返す
      return logs.slice(head - 5, head + 5);
    })().reverse();
    return (
      <Modal show={showModal} onHide={close}>
        <Modal.Header closeButton>ライフポイント変動ログ</Modal.Header>
        <Modal.Body>
          <ListGroup>{visibleLogs}</ListGroup>
        </Modal.Body>
      </Modal>
    );
  };
  const showLPHistoryModal = () => setShowModal(true);
  return { LPHistoryModal, showLPHistoryModal };
};

type ResetProps = {
  reset: () => void;
};

export const useResetModal = () => {
  const [showModal, setShowModal] = useState(false);
  const close = () => setShowModal(false);
  const ResetModal = (props: ResetProps) => (
    <Modal show={showModal} onHide={close}>
      <Modal.Header>リセット確認</Modal.Header>
      <Modal.Body>
        LPとログをリセットしてよいですか？ <br /> この操作は取り消しできません
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.reset();
            close();
          }}
        >
          はい
        </Button>
        <Button variant="secondary" onClick={close}>
          いいえ
        </Button>
      </Modal.Footer>
    </Modal>
  );
  const showResetModal = () => setShowModal(true);
  return { ResetModal, showResetModal };
};

export const useCoinModal = () => {
  const [showModal, setShowModal] = useState(false);
  const close = () => setShowModal(false);
  const CoinModal = () => {
    const result = Math.random() > 0.5 ? "オモテ" : "ウラ";
    return (
      <Modal show={showModal} onHide={close}>
        <Modal.Header closeButton>コイントス結果</Modal.Header>
        <Modal.Body>{result}が出ました</Modal.Body>
      </Modal>
    );
  };
  const showCoinModal = () => setShowModal(true);
  return { CoinModal, showCoinModal };
};

export const useDiceModal = () => {
  const [showModal, setShowModal] = useState(false);
  const close = () => setShowModal(false);
  const DiceModal = () => {
    const result = 1 + Math.floor(6 * Math.random());
    return (
      <Modal show={showModal} onHide={close}>
        <Modal.Header closeButton>サイコロ結果</Modal.Header>
        <Modal.Body>{result}が出ました</Modal.Body>
      </Modal>
    );
  };
  const showDiceModal = () => setShowModal(true);
  return { DiceModal, showDiceModal };
};

type SaveProps = {
  p1: Player;
  p2: Player;
};

export const useSaveModal = (save: (p1: Player, p2: Player) => void) => {
  const [showModal, setShowModal] = useState(false);
  const close = () => setShowModal(false);
  const SaveModal = (props: SaveProps) => (
    <Modal show={showModal} onHide={close}>
      <Modal.Header>保存確認</Modal.Header>
      <Modal.Body>デュエルの結果を保存してよいですか？</Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            save(props.p1, props.p2);
            close();
          }}
        >
          はい
        </Button>
        <Button variant="secondary" onClick={close}>
          いいえ
        </Button>
      </Modal.Footer>
    </Modal>
  );
  const showSaveModal = () => setShowModal(true);
  return { SaveModal, showSaveModal };
};
