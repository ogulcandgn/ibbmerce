//admin sayfası
import { useSelector } from "react-redux";
//auth-slice'dan email importladık
import { selectEmail } from "../../redux/slice/authSlice";
import { Link } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "admin@hotmail.com") {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container mx-auto mt-10">
        <h2>İzin reddedildi.</h2>
        <p>Bu sayfa sadece admin içindir.</p>
        <br />
        <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Anasayfaya dön
          </button>
        </Link>
      </div>
    </section>
  );
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "admin@hotmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
