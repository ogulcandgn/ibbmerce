import React from "react";
import { AiFillPhone, AiOutlineHome } from "react-icons/ai";

function Contact() {
  return (
    <div className="flex justify-center items-center bg-white">
      <div className="container mx-auto my-4 px-4 lg:px-20">
        <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
          <div className="flex">
            <h1 className="font-bold text-5xl">Bize Ulaşın</h1>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="İsim*"
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Soyisim*"
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email*"
            />
            <input
              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Telefon*"
            />
          </div>
          <div className="my-4">
            <textarea
              placeholder="Mesaj*"
              className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="my-2 w-1/2 lg:w-1/4">
            <button
              className="uppercase text-sm font-bold tracking-wide bg-orange-500 hover:bg-orange-400 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline"
            >
              Gönder
            </button>
          </div>
        </div>

        <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-orange-500 rounded-2xl">
          <div className="flexflex-col text-white">
            <h1 className="font-bold text-4xl my-4">Ofisimize Bekleriz</h1>
            <hr style={{ width: "100%", marginBottom: "10px" }} />
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              tincidunt arcu diam, eu feugiat felis fermentum id. Curabitur
              vitae nibh viverra, auctor turpis sed, scelerisque ex.
            </p>

            <div className="flex my-4 w-2/3 lg:w-1/2">
              <div className="flex flex-col">
                <i className="fas fa-map-marker-alt pt-2 pr-2" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl">Merkez Ofis</h2>
                <p className="text-white">
                  5555 Tailwind RD, Pleasant Grove, UT 73533
                </p>
              </div>
            </div>

            <div className="flex my-4 w-2/3 lg:w-1/2">
              <div className="flex flex-col">
                <i className="fas fa-phone-alt pt-2 pr-2" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl">Telefon Numaramız</h2>
                <p className="text-white">Tel: xxx-xxx-xxx</p>
                <p className="text-white">Fax: xxx-xxx-xxx</p>
              </div>
            </div>

            <div
              className="flex my-4 justify-between"
              style={{ fontSize: "25px" }}
            >
              <AiOutlineHome />
              <AiFillPhone />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
