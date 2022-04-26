import { Navigate, Outlet } from "react-router-dom";
import NotFound from "./components/NotFound";
import { getDataFromLocalStorage } from "./utils";

const PrivateRoutes = ({ role }) => {
  const user = getDataFromLocalStorage("user") || {};
  const isRole = role === user.role ? true : false;

  if (!Object.keys(user).length) {
    return <Navigate to="/login" />;
  }

  if (Object.keys(user).length && !isRole) {
    return <NotFound />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
