import { ProgressBar } from "react-bootstrap";
import { Mode } from ".";

type Props = {
  name: string;
  lp: number;
  mode: Mode;
  buf: number;
};

const Window = (props: Props) => {
  const { name, lp } = props;
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
  const sign = props.buf === 0 || props.mode === "normal" ? "" : props.mode;
  return (
    <div className="lp-parent bg-light text-black">
      <div className="lp-header">{name}</div>
      <ProgressBar variant={variant} now={now}></ProgressBar>
      <div className="lp">{`${props.lp}${sign}${
        props.buf !== 0 ? props.buf : ""
      }`}</div>
    </div>
  );
};

export default Window;
