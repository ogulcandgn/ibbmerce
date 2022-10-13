import { useEffect, useState } from "react";
import logo from "../../images/mainLogo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
  selectEmail,
} from "../../redux/slice/authSlice";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const userEmail = useSelector(selectEmail);

  //oturum açan kullanıcıyı görüntüleme
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        // kullanıcı email adresiyle giriş yaptıysa Merhaba + kullanıcıAdı
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setEmail("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Çıkış Yapıldı");
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header>
      <nav className="bg-gray-10 border-gray-200 px-2 text-white sm:px-4 py-6  ">
        <div className="container flex flex-wrap justify-around items-center mx-auto">
          <div className="flex items-center ">
            <img
              src={logo}
              style={{ width: "50px", height: "50px" }}
              className="mr-3 h-12"
            />
            <NavLink
              to="/"
              className="font-normal block py-2 pr-4 pl-3 ml-5 rounded md:bg-transparent text-black md:p-0 "
              style={({ isActive }) => ({
                fontWeight: isActive && location.pathname === "/" ? "bold" : "",
                borderBottom:
                  isActive && location.pathname === "/"
                    ? "2px solid black"
                    : "",
              })}
            >
              Anasayfa
            </NavLink>
            <NavLink
              to="/contact"
              className="font-normal block py-2 pr-4 pl-3 ml-5 rounded md:bg-transparent text-black md:p-0 "
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "",
                borderBottom: isActive ? "2px solid black" : "",
              })}
            >
              İletişim
            </NavLink>
            <AdminOnlyLink>
              <Link to="/admin/home">
                {userEmail || localStorage.getItem("email") ? (
                  <button className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Admin Panel
                  </button>
                ) : (
                  ""
                )}
              </Link>
            </AdminOnlyLink>
          </div>
          <div className=" flex items-center ">
            {localStorage.getItem("login") && (
              <div className="flex bg-green-600 items-center font-normal block px-5 py-3 ml-5 rounded  text-white  ">
                <FaUserCircle
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "7px",
                  }}
                />
                {displayName}
              </div>
            )}

            {!localStorage.getItem("login") && (
              <>
                <NavLink
                  to="/login"
                  className="font-normal block py-2 pr-4 pl-3 ml-5 rounded md:bg-transparent text-black md:p-0 "
                  style={({ isActive }) => ({
                    fontWeight: isActive ? "bold" : "",
                    borderBottom: isActive ? "2px solid black" : "",
                  })}
                >
                  Giriş
                </NavLink>
                <NavLink
                  to="/register"
                  className="font-normal block py-2 pr-4 pl-3 ml-5 rounded md:bg-transparent text-black md:p-0 "
                  style={({ isActive }) => ({
                    fontWeight: isActive ? "bold" : "",
                    borderBottom: isActive ? "2px solid black" : "",
                  })}
                >
                  Kayıt Ol
                </NavLink>
              </>
            )}
            <NavLink
              to="/order-history"
              className="font-normal block py-2 pr-4 pl-3 ml-5 rounded md:bg-transparent text-black md:p-0 "
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "",
                borderBottom: isActive ? "2px solid black" : "",
              })}
            >
              Siparişlerim
            </NavLink>

            <NavLink
              to="card"
              className="relative flex font-normal block py-2 pr-4 pl-3 ml-5 rounded md:bg-transparent text-black md:p-0 "
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "",
                borderBottom: isActive ? "2px solid black" : "",
              })}
            >
              Sepetim
              <AiOutlineShoppingCart
                style={{
                  width: "25px",
                  height: "25px",
                  marginLeft: "4px",
                  position: "relative",
                }}
              />
              <span className="inline-flex absolute -top-3.5 -right-3.5 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">
                0
              </span>
            </NavLink>
            {localStorage.getItem("login") && (
              <NavLink
                to="/login"
                onClick={logoutUser}
                className="font-normal block py-2 pr-4 pl-3 ml-7 text-white rounded bg-red-600 hover:bg-red-500"
                style={({ isActive }) => ({
                  fontWeight:
                    isActive && location.pathname === "/" ? "bold" : "",
                })}
              >
                Çıkış Yap
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
