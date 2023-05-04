import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header2() {
  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="dark"
      variant="dark"
      style={{ marginBottom: "1rem", padding: "1rem" }}
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={require('../assets/profile2.png')}
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={{marginRight: '1rem'}}
          />
          สมชาย ภัคดีมาก
          </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          data-bs-target="#navbarScrll"
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" style={{textAlign:'left'}}>
            <NavLink eventKey="3" as={Link} to="/menu">
              Menu
            </NavLink>
            <NavLink eventKey="5" as={Link} to="/restaurants">
              Restaurants
            </NavLink>
            <NavLink eventKey="6" as={Link} to="/cart">
              Cart
            </NavLink>
            <NavLink eventKey="7" as={Link} to="/history ">
              History
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
