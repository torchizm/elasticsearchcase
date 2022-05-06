import { DropDownItemList } from "elasticsearchcase";
import React, { ChangeEvent, CSSProperties, FunctionComponent } from "react";
import styles from "./DropDown.module.css";

interface Props {
  id?: string;
  items: DropDownItemList;
  onChange: (selectedItem: string) => void;
  style?: CSSProperties;
}

const DropDown: FunctionComponent<Props> = ({ id, onChange, items, style }) => {
  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div style={style} id={id} className={styles.dropdown}>
      <select onChange={handleOnChange}>
        {items.map((item, index) => {
          return (
            <option key={index} value={item.key}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

DropDown.defaultProps = {
  id: "dropdown",
  style: {},
};

export default DropDown;
