import { ProgressBar } from "react-bootstrap";
import { Mode } from "./lp";

type Props = {
  name: string;
  lp: number;
  mode: Mode;
  buf: number;
  isLeft: boolean;
};

const Window = (props: Props) => {
  const { name, lp, mode, buf, isLeft } = props;
  const now = Math.floor(lp / 80);
  const variant = (() => {
    if (lp > 4000) {
      return "success";
    } else if (lp > 2000) {
      return "warning";
    } else {
      return "danger";
    }
  })();
  const sign = buf === 0 || mode === "normal" ? "" : mode;
  return (
    <div className={isLeft ? "lp-box-left" : "lp-box-right"}>
      <div className="lp-parent bg-light text-black">
        <div className="lp-header">{name}</div>
        <ProgressBar variant={variant} now={now}></ProgressBar>
        <div className="lp">{`${lp}${sign}${buf !== 0 ? buf : ""}`}</div>
      </div>
    </div>
  );
};

export default Window;
