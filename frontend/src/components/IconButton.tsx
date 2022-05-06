import React, { ReactNode, FunctionComponent } from "react";
import style from "./IconButton.module.css";

interface Props {
  id?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  size?: string;
  icon: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  buttonstyle?: "circle" | "normal";
  type?: string;
}

const IconButton: FunctionComponent<Props> = (props) => {
  return (
    <div
      type={props.type}
      className={style["icon-button"]}
      style={{ width: props.size, height: props.size }}
      {...props}
    >
      {props.icon}
    </div>
  );
};

IconButton.defaultProps = {
  size: "2em",
  buttonstyle: "normal",
  type: "button",
};

export default IconButton;
