import React from "react";
import { MdArrowBackIos } from "react-icons/md";
import styles from "./BackButton.module.scss";

interface Props {
  onClick: () => void;
}
const BackButton = ({ onClick }: Props) => {
  return (
    <div onClick={onClick} className={styles.wrapperArrow}>
      <MdArrowBackIos className={styles.arrowBack} />
    </div>
  );
};

export default BackButton;
