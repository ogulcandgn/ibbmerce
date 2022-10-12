import { useSelector } from "react-redux";
//auth-slice'dan email importladık
import { selectEmail } from "../../redux/slice/authSlice";

const AdminOnlyRoute = () => {
  const userEmail = useSelector(selectEmail);
  console.log(userEmail);
  return <div>AdminOnlyRoute</div>;
};

export default AdminOnlyRoute;
