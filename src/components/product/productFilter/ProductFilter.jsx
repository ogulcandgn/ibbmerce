import React, { useState, useEffect } from "react";
import styles from "./ProductFilter.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../../redux/slice/productSlice";

function ProductFilter() {
  const [category, setCategory] = useState("Hepsi");
  const [brand, setBrand] = useState("Hepsi");
  const [price, setPrice] = useState(3000);
  const products = useSelector(selectProducts);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);

  const dispatch = useDispatch();

  const allCategories = [
    "Hepsi",
    ...new Set(products.map((product) => product.category)),
  ];
  const allBrands = [
    "Hepsi",
    ...new Set(products.map((product) => product.brand)),
  ];
  // console.log(allBrands);

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  const clearFilters = () => {
    setCategory("Hepsi");
    setBrand("Hepsi");
    setPrice(maxPrice);
  };

  return (
    <div className={styles.filter}>
      <h4>Kategoriler</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => filterProducts(cat)}
              className={`${category}` === cat ? "font-semibold" : null}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4>Marka</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option value={brand} key={index}>
                {brand}
              </option>
            );
          })}
        </select>
        <h4>Fiyat</h4>
        <p>{`${price}₺`}</p>
        <div className={styles.price}>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <br />
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-2 rounded"
          onClick={clearFilters}
        >
          Filtreyi Temizle
        </button>
      </div>
    </div>
  );
}

export default ProductFilter;
