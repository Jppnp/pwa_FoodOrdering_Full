import React from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";

const SideNavbar = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={2} md={2} lg={2} xl={2}>
          <Navbar
            expand="lg"
            bg="dark"
            variant="dark"
            className="flex-column"
            style={{
              height: "100vh",
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <Navbar.Toggle aria-controls="sidebar-nav" />
            <Navbar.Collapse id="sidebar-nav">
              <Nav className="flex-column">
                <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                <Nav.Link href="#users">Users</Nav.Link>
                <Nav.Link href="#products">Products</Nav.Link>
                <Nav.Link href="#orders">Orders</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

export default SideNavbar;
