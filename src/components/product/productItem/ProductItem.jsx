import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductItem.module.scss";
import Card from "../../card/Card";
import { useDispatch } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";

function ProductItem({ product, grid, id, name, price, desc, imageURL }) {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <div className="w-full rounded-lg shadow-xl">
        <Link to={`/product-details/${id}`}>
          <img
            className="border-b-2 pb-4 "
            src={imageURL}
            alt="product image"
          />
        </Link>
        <div className="px-5 mt-2 pb-5 text-center">
          <span className="text-md font-bold text-blue-700">{`${price} TL`}</span>
          <h5 className="text-3xl tracking-tight text-gray-900 mb-4">
            {shortenText(name, 18)}
          </h5>
          <button
            onClick={() => addToCart(product)}
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ProductItem;
