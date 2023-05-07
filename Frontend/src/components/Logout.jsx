// Logout.js
import { useContext } from "react";
import { UserContext } from "../utils/UserLogin";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Logout() {
  const { setUserRole } = useContext(UserContext);
  const navigate = Navigate();

  const handleLogout = () => {
    setUserRole(null);
    navigate("/login");
  };

  return (
    <Button variant="outline-danger" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Logout;
