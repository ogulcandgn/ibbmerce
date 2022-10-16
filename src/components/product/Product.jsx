import { useEffect } from "react";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import styles from "./Product.module.scss";
import UseFetchCollection from "../../customHooks/UseFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, STORE_PRODUCT } from "../../redux/slice/productSlice";
import SpinnerImg from "../../assets/spinner.jpeg";

function Product() {
  const { data, isLoading } = UseFetchCollection("products");
  const products = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCT({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <section>
      <div className={`container mx-auto ${styles.product}`}>
        <aside className={styles.filter}>
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
        </div>
      </div>
    </section>
  );
}

export default Product;
