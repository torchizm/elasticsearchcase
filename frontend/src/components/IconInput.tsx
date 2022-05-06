import {
  CSSProperties,
  FunctionComponent,
  ChangeEventHandler,
  ReactNode,
} from "react";

import style from "./IconInput.module.css";

interface Props {
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
  icon: ReactNode;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  position?: "left" | "right";
}

const IconInput: FunctionComponent<Props> = (props) => {
  return (
    <div className={style["icon-input"]} {...props}>
      {props.icon}
      <input className={style["icon-input-input"]} {...props} />
    </div>
  );
};

IconInput.defaultProps = {
  position: "left",
};

export default IconInput;
