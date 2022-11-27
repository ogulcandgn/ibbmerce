import React from "react";
import { Link } from "react-router-dom";
import resetImage from "../../assets/forgot.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import Loader from "../../components/loader/Loader";

function Reset() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //reset password
  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Mailinize gelen linki onaylayınız");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Böyle bir mail adresi bulunamadı");
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex justify-center items-center w-full">
        {/* login image */}
        <div className="hidden md:block">
          <img src={resetImage} width="500" />
        </div>
        {/* login page */}

        <div className="bg-grey-lighter flex flex-col w-full md:w-7/12 mx-5 my-40">
          <div className="container max-w-md mx-auto flex-1 flex flex-col justify-center items-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-lg text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Şifre Sıfırla</h1>

              <form onSubmit={resetPassword}>
                <input
                  type="email"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  placeholder="E-mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-blue-500 hover:bg-blue-400  text-white focus:outline-none my-1"
                >
                  Şifre Sıfırla
                </button>
              </form>
            </div>

            <div>
              <div className="text-grey-dark mt-6">
                <p className="mb-0 mt-2 pt-1">
                  Henüz hesabın yok mu ?
                  <Link to="/register">
                    <span className=" cursor-pointer ml-1 border-b-2 font-bold text-green-500 ">
                      Kayıt Ol
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reset;
