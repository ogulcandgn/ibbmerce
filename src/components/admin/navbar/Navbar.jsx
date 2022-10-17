import React from "react";
import { BiUserCircle } from "react-icons/bi";
import styles from "./Navbar.module.scss";
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/slice/authSlice";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const userName = useSelector(selectUserName);
  return (
    <div className={styles.navbar}>
      <div className={`${styles.user} bg-blue-500`}>
        <BiUserCircle size={60} color="#fff" />
        <h4 className="text-white ">{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin/home"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "",
              })}
            >
              Anasayfa
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/all-products"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "",
              })}
            >
              Tüm Ürünler
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/add-product/ADD"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "",
              })}
            >
              Ürün Ekle
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "",
              })}
            >
              Siparişlerim
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
