import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import styles from "./ProductDetails.module.scss";
import SpinnerImage from "../../../assets/spinner.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../../redux/slice/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const cart = cartItems.find((cart) => cart.id === id);

  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  useEffect(() => {
    getProduct();
  }, []);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY(product));
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY(product));
  };

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(obj);
    } else {
      toast.error("Ürün Bulunamadı");
    }
  };

  return (
    <section>
      <div className={`container mx-auto my-5 ${styles.product}`}>
        <h2 className="text-3xl">Ürün Bilgileri</h2>
        <div className="mt-2">
          <Link to="/#products">&larr; Ürünlere geri dön</Link>
        </div>
        {product == null ? (
          <img src={SpinnerImage} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={`${styles.details}`}>
              <div className={`${styles.img} flex items-center`}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={`${styles.content} ml-5`}>
                <h3>
                  <span className="font-bold">Ürün Adı:</span> {product.name}
                </h3>
                <p className={styles.price}>
                  <span className="font-bold text-black">Fiyat: </span>
                  {`${product.price} TL`}
                </p>
                <p>
                  <span className="font-bold">Ürün Bilgisi: </span>
                  {product.desc}
                </p>
                <p>
                  <b>Marka:</b> {product.brand}
                </p>
                <div className={styles.count}>
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        onClick={() => decreaseCart(product)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      >
                        -
                      </button>
                      {/* sepetteki ürün miktarı */}
                      <p>{cart.cartQuantity}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-3 rounded"
                >
                  Sepete Ekle
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProductDetails;
