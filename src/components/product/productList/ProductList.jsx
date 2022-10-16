import React from "react";
import { useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";
import { Link } from "react-router-dom";
import ProductItem from "../productItem/ProductItem";

function ProductList({ products }) {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            <b>10</b> Ürün bulundu.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Sırala:</label>
          <select>
            <option value="latest">En son eklenen</option>
            <option value="lowest-price">Düşük fiyat</option>
            <option value="highest-price">Yüksek fiyat</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.lenght === 0 ? (
          <p>Ürün bulunamadı.</p>
        ) : (
          <>
            {products.map((product) => {
              return (
                <div key={product.id} className="my-9">
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
