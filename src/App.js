import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
//pages
import { Home, Contact, Login, Register, Reset } from "./pages";
//components
import { Header, Footer } from "./components";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import { selectEmail } from "./redux/slice/authSlice";

function App() {
  const email = useSelector(selectEmail);

  useEffect(() => {
    console.log("ey Oğul", email);
  }, []);

  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-left" />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
