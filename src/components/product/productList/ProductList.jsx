import React from "react";
import { useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
  SORT_PRODUCT,
} from "../../../redux/slice/filterSlice";
import { Link } from "react-router-dom";
import Pagination from "../../pagination/Pagination";

function ProductList({ products }) {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const filteredProducts = useSelector(selectFilteredProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SORT_PRODUCT({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    // console.log(search);
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  return (
    <div className={`${styles["product-list"]} px-3`} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            <b>{filteredProducts.length}</b> Ürün bulundu.
          </p>
        </div>
        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Sırala:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">En son eklenen</option>
            <option value="lowest-price">Düşük fiyat</option>
            <option value="highest-price">Yüksek fiyat</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={`${grid ? `${styles.grid}` : `${styles.list}`} my-2`}>
        {products.lenght === 0 ? (
          <p>Ürün bulunamadı.</p>
        ) : (
          <>
            {filteredProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      {/* pagination */}
      <Pagination />
    </div>
  );
}

export default ProductList;
