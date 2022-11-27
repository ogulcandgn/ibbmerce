import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
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
      <div className="container mx-auto my-5">
        <div className="ml-3">
          <h2 className="text-3xl">Ürün Bilgileri</h2>
          <div className="mt-2">
            <Link to="/#products">&larr; Ürünlere geri dön</Link>
          </div>
        </div>
        {product == null ? (
          <div>
            <img
              className="container mx-auto"
              src={SpinnerImage}
              alt="Loading"
              style={{ width: "50px" }}
            />
          </div>
        ) : (
          <>
            <div className="md:flex p-4 details">
              <div className="border rounded p-5 w-full">
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className="w-full h-full "
                />
              </div>
              <div className="py-0 px-1.5">
                <h3>
                  <span className="font-bold">Ürün Adı:</span> {product.name}
                </h3>
                <p style={{ color: "orangered", fontWeight: "500" }}>
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
                <div className="flex items-center mr-4">
                  {isCartAdded < 0 ? null : (
                    <>
                      <button
                        onClick={() => decreaseCart(product)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mr-3 py-1 px-3 rounded"
                      >
                        -
                      </button>
                      {/* sepetteki ürün miktarı */}
                      <p>{cart.cartQuantity}</p>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded ml-3"
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
