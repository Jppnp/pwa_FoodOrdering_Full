import { useEffect } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { isLogin, getRole } from "./UserControl";

function PrivateRoute(role) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin() || getRole() !== role.role) {
      navigate(-1);
    }
  }, [navigate, role]);
  return isLogin() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
