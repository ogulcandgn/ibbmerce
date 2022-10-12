import React from "react";
import loaderImg from "../../assets/loader.gif";
import styles from "./Loader.module.scss";
import ReactDom from "react-dom";
function Loader() {
  return ReactDom.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
}

export default Loader;
