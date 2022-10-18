import React from "react";
import styles from "./CheckoutDetails.module.scss";
import { useState } from "react";
//country drop-down
import { CountryDropdown } from "react-country-region-selector";
import { SAVE_SHIPPING_ADDRESS } from "../../redux/slice/checkoutSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//default data
const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  postal_code: "",
  country: "",
  phone: "",
};

function CheckoutDetails() {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //shipping
  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shippingAddress);
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    navigate("/checkout");
  };

  return (
    <section>
      <div className={`container mx-auto mb-20`}>
        <div className="leading-loose">
          <form
            onSubmit={handleSubmit}
            className="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
          >
            <div>
              <p className="text-gray-800 font-medium text-xl mb-3">
                Müşteri Bilgileri
              </p>
              <div className="mt-2">
                <label className="block text-sm text-gray-00">İsim</label>
                <input
                  className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                  name="name"
                  type="text"
                  required
                  placeholder="İsim ve Soyisim"
                  value={shippingAddress.name}
                  onChange={(e) => handleShipping(e)}
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-00">
                  Telefon Numarası
                </label>
                <input
                  className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                  name="phone"
                  type="number"
                  required
                  placeholder="(535) 000 00 00"
                  value={shippingAddress.phone}
                  onChange={(e) => handleShipping(e)}
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600">Adress-1</label>
                <input
                  className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                  name="line1"
                  type="text"
                  required
                  placeholder="Adress-1"
                  value={shippingAddress.line1}
                  onChange={(e) => handleShipping(e)}
                />
              </div>
              <div className="mt-2">
                <label className=" block text-sm text-gray-600">
                  Address-2
                </label>
                <input
                  className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                  name="line2"
                  type="text"
                  required
                  placeholder="Address-2"
                  value={shippingAddress.line2}
                  onChange={(e) => handleShipping(e)}
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm text-gray-600">Şehir</label>
                <input
                  className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                  name="city"
                  type="text"
                  required
                  placeholder="Şehir"
                  value={shippingAddress.city}
                  onChange={(e) => handleShipping(e)}
                />
              </div>
              <div className="inline-block mt-2 w-1/2 pr-1">
                <label className=" block text-sm text-gray-600 mb-1">
                  Ülke / Posta Kodu
                </label>
                <CountryDropdown
                  className="w-full px-3 py-3.5 text-gray-700 bg-gray-200 rounded"
                  valueType="short"
                  required
                  value={shippingAddress.country}
                  onChange={(val) =>
                    handleShipping({
                      target: {
                        name: "country",
                        value: val,
                      },
                    })
                  }
                />
              </div>
              <div className="inline-block mt-2 -mx-1 pl-1 w-1/2">
                <label className="hidden block text-sm text-gray-600">
                  Posta Kod
                </label>
                <input
                  className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                  name="postal_code"
                  type="text"
                  required=""
                  placeholder="Posta Kodu"
                  value={shippingAddress.postal_code}
                  onChange={(e) => handleShipping(e)}
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Ödeme Adımına Geç
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CheckoutDetails;
