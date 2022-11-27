import React from "react";
import registerImage from "../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../../components/loader/Loader";

function Register() {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      return toast.error("Şifreler eşleşmiyor");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Kayıt Başarıyla Oluşturuldu");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex justify-center items-center w-full">
        {/* register page */}
        <div className="bg-grey-lighter my-10 flex w-full md:w-7/12 md:flex-col max-w-md mx-5 md:my-40">
          <div className="container max-w-md mx-auto flex-1 flex flex-col justify-center items-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-lg text-black w-full">
              <h1 className="mb-8 text-2xl md:text-3xl text-center">
                Hesap Oluştur
              </h1>

              <form onSubmit={registerUser}>
                <input
                  type="email"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  placeholder="E-mail"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="password"
                  placeholder="Şifreniz"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="cPassword"
                  placeholder="Şifre Tekrar"
                  required
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-500 hover:bg-green-400  text-white focus:outline-none my-1"
                >
                  Kayıt Ol
                </button>
              </form>
            </div>

            <div>
              <div className="text-grey-dark mt-6">
                <p className="mb-0 mt-2 pt-1">
                  Zaten hesabınız var mı ?
                  <Link to="/login">
                    <span className=" cursor-pointer ml-1 text-blue-500 border-b-2 font-bold">
                      Giriş Yap
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* register image */}
        <div className="hidden md:block">
          <img src={registerImage} width="500" />
        </div>
      </div>
    </>
  );
}

export default Register;
