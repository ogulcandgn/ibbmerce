import React from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

function Search({ value, onChange }) {
  return (
    <div className={`${styles.search}`}>
      <BiSearch size={18} className={styles.icon} />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Aradığınız ürünü yazınız"
      />
    </div>
  );
}

export default Search;
