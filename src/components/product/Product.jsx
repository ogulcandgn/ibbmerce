import React from "react";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import styles from "./Product.module.scss";

function Product() {
  return (
    <section>
      <div className={`container mx-auto ${styles.product}`}>
        <aside className={styles.filter}>
          <ProductFilter />
        </aside>
        <div className={styles.content}>
          <ProductList />
        </div>
      </div>
    </section>
  );
}

export default Product;
