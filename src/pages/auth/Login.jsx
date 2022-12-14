import React from "react";
import loginImage from "../../assets/login.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../redux/slice/authSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const previousURL = location.state?.currentUrl;
  const navigate = useNavigate();

  const redirectUser = () => {
    if (true) {
      navigate("/");
      return;
    }
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("login", true);
        localStorage.setItem("email", email);
        toast.success("Giriş Başarılı");
        setIsLoading(false);
        console.log("auth:", auth);
        dispatch(
          SET_ACTIVE_USER({
            email: userCredential.user.email,
          })
        );
        redirectUser(previousURL);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Kullanıcı adı veya şifre yanlış");
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex justify-center items-center w-full">
        {/* login image */}
        <div className="hidden md:block">
          <img src={loginImage} width="500" />
        </div>
        {/* login page */}
        <div className="bg-grey-lighter my-10 flex w-full md:w-7/12 md:flex-col max-w-md mx-5 md:my-40">
          <div className="container flex-1 flex flex-col justify-center items-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-lg text-black w-full">
              <h1 className="mb-8 text-2xl md:text-3xl text-center">
                Oturum Aç
              </h1>

              <form onSubmit={loginUser}>
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

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-blue-500 hover:bg-blue-400  text-white focus:outline-none my-1"
                >
                  Giriş Yap
                </button>
                <p className="mb-0 mt-2 pt-1 text-center">
                  Şifrenizi mi
                  <Link to="/reset">
                    <span className="cursor-pointer ml-1 border-b-2 font-bold">
                      unuttunuz ?
                    </span>
                  </Link>
                </p>
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
};
export default Login;
