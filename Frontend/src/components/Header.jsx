import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <Nav variant="pills" defaultActiveKey={"/"}>
        <Nav.Item style={{width: "50%"}}>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/users">
            Show User
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/add">
            Add User
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
export default Header;
