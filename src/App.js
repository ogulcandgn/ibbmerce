import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//pages
import { Home, Contact, Login, Register, Reset, Admin } from "./pages";
//components
import { Header, Footer } from "./components";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import { selectEmail } from "./redux/slice/authSlice";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import NotFound from "./pages/notFound/NotFound";

function App() {
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
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
