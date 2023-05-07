import { Outlet, Navigate } from "react-router-dom";
import { isLogin } from "./UserLogin";

function PrivateRoute() {
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
