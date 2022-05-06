import React, { FunctionComponent } from "react";
import style from "./Button.module.css";

interface Props {
  id?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children?: string;
  type?: string;
}

const Button: FunctionComponent<Props> = (props) => {
  return <div type={props.type} {...props} className={style.button}></div>;
};

Button.defaultProps = {
  type: "button",
};

export default Button;
