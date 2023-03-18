import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      {/* <Nav variant="pills" defaultActiveKey={"/"}>
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
      </Nav> */}
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to ="/">Home</Nav.Link>
            <Nav.Link as={Link} to ="/users">Show Users</Nav.Link>
            <Nav.Link as={Link} to ="/add">Add User</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    </div>
  );
}
export default Header;
