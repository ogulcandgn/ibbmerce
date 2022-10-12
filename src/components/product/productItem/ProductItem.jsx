import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.scss";
import AppleWatch from "./product-image/apple-watch.png";

function ProductItem({ grid }) {
  return (
    <div className={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details`}>
        <div className={styles.img}>
          <img src={AppleWatch} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>3400$</p>
          <h4>Apple Watch</h4>
        </div>
        {!grid && (
          <p className={styles.desc}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
            ad cum dolorem error a debitis? Cum, officiis aut. Voluptatum,
            similique.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
