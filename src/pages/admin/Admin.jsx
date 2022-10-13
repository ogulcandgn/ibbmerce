import React from "react";
import styles from "./Admin.module.scss";
import Navbar from "../../components/admin/navbar/Navbar";
import { Routes, Route } from "react-router";
import Home from "../../components/admin/home/Home";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import AddProducts from "../../components/admin/addProducts/AddProducts";
import Orders from "../../components/admin/orders/Orders";
function Admin() {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProducts />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
