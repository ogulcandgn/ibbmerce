import { useEffect, useState } from "react";
import logo from "../../images/mainLogo.png";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
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
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [setEmail] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const userEmail = useSelector(selectEmail);
  const [showNav, setShowNav] = useState(false);

  //sepetin üzerindeki toplam ürün sayısı
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);

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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

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
    <header className="sticky top-0 z-30">
      {/* <nav className="bg-gray-10 border-gray-200 px-2 text-white py-6  ">
        <div className="container flex flex-wrap justify-around items-center mx-auto">
          <div className="flex items-center ">
            <Link to="/">
              <img
                src={logo}
                style={{ width: "50px", height: "50px" }}
                className="mr-3 h-12"
              />
            </Link>
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
              <div className="text-black items-center font-normal block py-3 ml-5 rounded">
                <FaUserCircle
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                />
              </div>
            )}

            {!localStorage.getItem("login") && (
              <>
                <NavLink
                  to="/login"
                  className="font-normal block py-2 pr-4 pl-3 ml-3 rounded md:bg-transparent text-black md:p-0 "
                  style={({ isActive }) => ({
                    fontWeight: isActive ? "bold" : "",
                    borderBottom: isActive ? "2px solid black" : "",
                  })}
                >
                  Giriş
                </NavLink>
                <NavLink
                  to="/register"
                  className="font-normal block py-2 pr-4 pl-3 ml-3 rounded md:bg-transparent text-black md:p-0 "
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
              className="font-normal block py-2 pr-4 pl-3 ml-3 rounded md:bg-transparent text-black md:p-0 "
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "",
                borderBottom: isActive ? "2px solid black" : "",
              })}
            >
              Siparişlerim
            </NavLink>

            <NavLink
              to="/cart"
              className="relative flex font-normal block py-2 pr-4 pl-3 ml-3 rounded md:bg-transparent text-black md:p-0 "
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
                {cartTotalQuantity}
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
      </nav> */}

      {/* ********************** */}
      <nav className="md:flex justify-around items-center bg-white md:py-5 p-2">
        <div className="flex items-center justify-between">
          <Link className="flex" to="/">
            <img
              style={{ width: "60px", height: "60px" }}
              src={logo}
              alt="logo"
              className="w-12 h-12 p-2"
            />
            <span class="self-center text-lg font-mono whitespace-nowrap ">
              Shop
            </span>
          </Link>

          <div className="md:hidden">
            <NavLink
              to="/cart"
              className="relative flex font-normal block  rounded md:bg-transparent"
            >
              <AiOutlineShoppingCart
                style={{
                  width: "25px",
                  height: "25px",
                  position: "relative",
                }}
              />
              <span className="inline-flex absolute -top-3.5 -right-3.5 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">
                {cartTotalQuantity}
              </span>
            </NavLink>
          </div>

          {showNav ? (
            <HiOutlineMenuAlt2
              onClick={() => setShowNav(!showNav)}
              className="md:hidden block w-10 h-10 p-2 cursor-pointer"
            />
          ) : (
            <HiOutlineMenuAlt2
              onClick={() => setShowNav(!showNav)}
              className="md:hidden block w-10 h-10 p-2 cursor-pointer"
            />
          )}
        </div>

        <ul
          className={
            (showNav ? "left-0" : "-left-full") +
            " md:static fixed bottom-0 top-12 md:flex md:space-x-7 items-center md:bg-transparent bg-gray-500 bg-opacity-90 md:w-auto w-10/12 md:text-gray-500 text-white md:space-y-0 space-y-5 p-2 transition-left h-auto"
          }
        >
          <NavLink
            to="/"
            className="font-normal block py-2 pr-4 pl-3 ml-5 rounded md:bg-transparent  md:p-0 "
            style={({ isActive }) => ({
              fontWeight: isActive && location.pathname === "/" ? "bold" : "",
              borderBottom:
                isActive && location.pathname === "/" ? "2px solid white" : "",
            })}
          >
            Anasayfa
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
          {localStorage.getItem("login") && (
            <div className="text-black items-center font-normal block py-3 ml-5 rounded">
              <FaUserCircle
                style={{
                  width: "25px",
                  height: "25px",
                }}
              />
            </div>
          )}
          {!localStorage.getItem("login") && (
            <>
              <NavLink
                to="/login"
                className="font-normal block py-2 pr-4 pl-3 ml-3 rounded md:bg-transparent  md:p-0 "
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "",
                  borderBottom: isActive ? "2px solid white" : "",
                })}
              >
                Giriş
              </NavLink>
              <NavLink
                to="/register"
                className="font-normal block py-2 pr-4 pl-3 ml-3 rounded md:bg-transparent  md:p-0 "
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "",
                  borderBottom: isActive ? "2px solid white" : "",
                })}
              >
                Kayıt Ol
              </NavLink>
            </>
          )}
          <NavLink
            to="/order-history"
            className="font-normal block py-2 pr-4 pl-3 ml-3 rounded md:bg-transparent  md:p-0 "
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "",
              borderBottom: isActive ? "2px solid white" : "",
            })}
          >
            Siparişlerim
          </NavLink>
          <NavLink
            to="/contact"
            className="font-normal block py-2 pr-4 pl-3 ml-5 rounded md:bg-transparent  md:p-0 "
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "",
              borderBottom: isActive ? "2px solid white" : "",
            })}
          >
            İletişim
          </NavLink>

          <NavLink
            to="/cart"
            className="relative flex font-normal block py-2 pr-4 pl-3 ml-3 rounded md:bg-transparent  md:p-0 "
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "",
              borderBottom: isActive ? "2px solid white" : "",
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
              {cartTotalQuantity}
            </span>
          </NavLink>
          {localStorage.getItem("login") && (
            <NavLink
              to="/login"
              onClick={logoutUser}
              className="font-normal block py-2 pr-4 pl-3 ml-7 text-white rounded bg-red-600 hover:bg-red-500"
              style={({ isActive }) => ({
                fontWeight: isActive && location.pathname === "/" ? "bold" : "",
              })}
            >
              Çıkış Yap
            </NavLink>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
