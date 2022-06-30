import { useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { LPHistory, Player } from "./lp";

const toStringWithSign = (x: number) => {
  if (x > 0) {
    return "+" + x.toString();
  } else {
    return x.toString();
  }
};

type Props = {
  lpHistory: LPHistory;
  player1: Player;
  player2: Player;
};

export const useHistoryModal = () => {
  const [showModal, setShowModal] = useState(false);
  const close = () => setShowModal(false);
  const LPHistoryModal = (props: Props) => {
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
