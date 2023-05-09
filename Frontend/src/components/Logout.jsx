// Logout.js
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { userLogout } from "../utils/UserControl";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  return (
    <Button variant="outline-danger" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default Logout;
