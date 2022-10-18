import React from "react";
import styles from "./CheckoutDetails.module.scss";
import { useState } from "react";
//country drop-down
import { CountryDropdown } from "react-country-region-selector";

//default data
const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

function CheckoutDetails() {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  //fatura
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const handleShipping = () => {};
  const handleBilling = () => {};
  const handleSubmit = () => {};

  return (
    <section>
      <div className={`container mx-auto`}>
        <div class="leading-loose">
          <form
            onSubmit={handleSubmit}
            class="max-w-xl m-4 p-10 bg-white rounded shadow-xl"
          >
            <p class="text-gray-800 font-medium text-xl mb-3">
              Müşteri Bilgileri
            </p>
            <div class="">
              <label class="block text-sm text-gray-00" for="cus_name">
                İsim
              </label>
              <input
                class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                name="name"
                type="text"
                required=""
                placeholder="İsim ve Soyisim"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600" for="cus_email">
                Adress-1
              </label>
              <input
                class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                name="line1"
                type="text"
                required=""
                placeholder="Adress-1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
            </div>
            <div class="mt-2">
              <label class=" block text-sm text-gray-600" for="cus_email">
                Address-2
              </label>
              <input
                class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                name="line2"
                type="text"
                required=""
                placeholder="Address-2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600">Şehir</label>
              <input
                class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                name="city"
                type="text"
                required=""
                placeholder="Şehir"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
            </div>
            <div class="inline-block mt-2 w-1/2 pr-1">
              <label class=" block text-sm text-gray-600 mb-1" for="cus_email">
                Ülke / Posta Kodu
              </label>
              <CountryDropdown
                className="w-full px-3 py-3.5 text-gray-700 bg-gray-200 rounded"
                valueType="short"
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
            <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
              <label class="hidden block text-sm text-gray-600" for="cus_email">
                Posta Kod
              </label>
              <input
                class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                name="postal_code"
                type="text"
                required=""
                placeholder="Posta Kodu"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />
            </div>
            {/* FATURA BİLGİLERİ */}
            <p class="text-gray-800 font-medium text-xl mt-5 mb-3 border-t-2 pt-3">
              Fatura Bilgileri
            </p>
            <div class="">
              <label class="block text-sm text-gray-00" for="cus_name">
                Alıcı Adı
              </label>
              <input
                class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                name="name"
                type="text"
                required=""
                placeholder="İsim ve Soyisim"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600" for="cus_email">
                Adress-1
              </label>
              <input
                class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                name="line1"
                type="text"
                required=""
                placeholder="Adress-1"
                value={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
              />
            </div>
            <div class="mt-2">
              <label class=" block text-sm text-gray-600" for="cus_email">
                Address-2
              </label>
              <input
                class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                name="line2"
                type="text"
                required=""
                placeholder="Address-2"
                value={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600">Şehir</label>
              <input
                class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                name="city"
                type="text"
                required=""
                placeholder="Şehir"
                value={billingAddress.city}
                onChange={(e) => handleBilling(e)}
              />
            </div>
            <div class="inline-block mt-2 w-1/2 pr-1">
              <label class=" block text-sm text-gray-600 mb-1" for="cus_email">
                Ülke / Posta Kodu
              </label>
              <CountryDropdown
                className="w-full px-3 py-3.5 text-gray-700 bg-gray-200 rounded"
                valueType="short"
                value={billingAddress.country}
                onChange={(val) =>
                  handleBilling({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
            </div>
            <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
              <label class="hidden block text-sm text-gray-600" for="cus_email">
                Posta Kod
              </label>
              <input
                class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                name="postal_code"
                type="text"
                required=""
                placeholder="Posta Kodu"
                value={billingAddress.postal_code}
                onChange={(e) => handleBilling(e)}
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600">
                Alıcı Telefon Numarası
              </label>
              <input
                class="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                name="phone"
                type="number"
                required=""
                placeholder="Telefon No"
                value={billingAddress.phone}
                onChange={(e) => handleBilling(e)}
              />
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
