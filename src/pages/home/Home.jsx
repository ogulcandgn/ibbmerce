import React, { useEffect } from "react";
import AdminOnlyRoute from "../../components/adminOnlyRoute/AdminOnlyRoute";
import Product from "../../components/product/Product";
import Slider from "../../components/slider/Slider";
import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";

function Home() {
  const email = useSelector(selectEmail);

  return (
    <div>
      <Slider />
      <Product />
    </div>
  );
}

export default Home;
