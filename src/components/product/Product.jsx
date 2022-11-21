import { useEffect, useState } from "react";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import styles from "./Product.module.scss";
import UseFetchCollection from "../../customHooks/UseFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCT,
} from "../../redux/slice/productSlice";
import SpinnerImg from "../../assets/spinner.jpeg";
import { FaCogs } from "react-icons/fa";

function Product() {
  const { data, isLoading } = UseFetchCollection("products");
  const products = useSelector(selectProducts);
  const [showFilter, setShowFilter] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCT({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  const togleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
      <div className={`container mx-auto ${styles.product}`}>
        <aside
          className={`${
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }`}
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img
              src={SpinnerImg}
              alt="Loading..."
              style={{ width: "50px", textAlign: "center" }}
            />
          ) : (
            <ProductList products={products} />
          )}
          <div className={styles.icon} onClick={togleFilter}>
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Filtrelemeyi Kapat" : "Filtrelemeyi Aç"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
