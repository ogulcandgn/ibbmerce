import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import styles from "./Cart.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Notiflix from "notiflix";
import Card from "../../components/card/Card";

function Cart() {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //delete product
  const confirmDelete = (cart) => {
    Notiflix.Confirm.show(
      "Ürünü silmek istiyor musunuz ?",
      "Bu ürünü silmek üzeresiniz",
      "Sil",
      "İptal",
      function okCb() {
        removeFromCart(cart);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "5px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  //clear cart
  const confirmClearCart = () => {
    Notiflix.Confirm.show(
      "Sepetinizi boşaltmak istiyor musunuz ?",
      "Sepetinizi boşaltmak üzeresiniz",
      "Sil",
      "İptal",
      function okCb() {
        clearCart();
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "5px",
        titleColor: "red",
        okButtonBackground: "red",
        cssAnimationStyle: "zoom",
      }
    );
  };

  //total price and total total product
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [cartItems, dispatch]);

  //increase product
  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  //decrease product
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  //remove product
  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  //clear products
  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  return (
    <section>
      <div className={`container mx-auto ${styles.table}`}>
        {cartItems.length === 0 ? (
          <>
            <p>Sepetiniz şuanda boş.</p>
            <br />
            <div>
              <Link to="/#products">
                &larr; Alışverişe devam etmek için tıklayınız.
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className=" text-3xl text-center  p-2 text-black">
              Sipariş Özeti
            </div>
            <table className="mt-10">
              <thead>
                <tr>
                  <th></th>
                  <th>Ürün</th>
                  <th>Fiyat</th>
                  <th>Miktar</th>
                  <th>Toplam</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>{name}</p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "150px" }}
                        />
                      </td>
                      <td className="text-md">{`${price} TL`}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            onClick={() => decreaseCart(cart)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-2 rounded"
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            onClick={() => increaseCart(cart)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-2 rounded"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{`${(price * cartQuantity).toFixed(2)} TL`}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          onClick={() => confirmDelete(cart)}
                          size={19}
                          color="red"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                onClick={confirmClearCart}
              >
                Sepeti Temizle
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Alışverişe devam et</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b> {`Sepetteki ürünler: ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Toplam tutar:</h4>
                    <h3>{`${cartTotalAmount.toFixed(2)} TL`}</h3>
                  </div>
                  <p className="mb-3">Tax an shipping calculated at checkout</p>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">
                    Ödeme Yap
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
