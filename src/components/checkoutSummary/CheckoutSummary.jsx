import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import Card from "../card/Card";
import styles from "./CheckoutSummary.module.scss";

function CheckoutSummary() {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const formatter = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  });

  return (
    <div>
      <span className="text-xl border-b-2">Ödeme Özeti</span>
      {cartItems.lenght === 0 ? (
        <>
          <p>Sepetinizde ürün bulunamadı.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to="/#products">Alışverişe geri dön</Link>
          </button>
        </>
      ) : (
        <div>
          <p>
            <b>{`Sepetteki ürünler: ${cartTotalQuantity}`}</b>
          </p>
          <div className={styles.text}>
            <h4>Toplam Tutar:</h4>
            <h3 className="text-green-600">
              {formatter.format(cartTotalAmount)}
            </h3>
          </div>
          {cartItems.map((item, index) => {
            const { id, name, price, cartQuantity } = item;
            return (
              <Card key={id} cardClass={`${styles.card}`}>
                <h4>Ürün Adı: {name}</h4>
                <p>Adet: {cartQuantity}</p>
                <p>Birim Fiyatı: {price}₺</p>
                <p>
                  <b>Toplam Fiyatı:</b> {price * cartQuantity}₺
                </p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CheckoutSummary;
