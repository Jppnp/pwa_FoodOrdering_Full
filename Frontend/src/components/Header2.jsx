import React from "react";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Header2() {
  const user = JSON.parse(localStorage.getItem("userData"))
  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="dark"
      variant="dark"
      style={{
        marginBottom: "1rem",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Container>
        <Navbar.Brand href="/client/">
          <img
            alt=""
            src={require("../assets/profile2.png")}
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={{ marginRight: "1rem" }}
          />
          <span>ยินดีต้อนรับ, {user.fname} {user.lname}</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          data-bs-target="#navbarScrll"
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" style={{ textAlign: "left" }}>
            <NavLink as={Link} to="/client/menu">
              Menu
            </NavLink>
            <NavLink as={Link} to="/client/restaurants">
              Restaurants
            </NavLink>
            <NavLink as={Link} to="/client/cart">
              Cart
            </NavLink>
            <NavLink as={Link} to="/client/history ">
              History
            </NavLink>
            <NavLink as={Link} to="/client/notification ">
              Notification
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Nav>
        <Nav.Link as={Logout} />
      </Nav>
    </Navbar>
  );
}
