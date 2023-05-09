import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Modal } from "react-bootstrap";
import bg from "../assets/bg.jpg";
import { isLogin, getRole, userLogin } from "../utils/UserControl";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showBackground, setShowBackground] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (isLogin()) {
      const role = getRole();
      navigate(`/${role}`);
    }
  }, [navigate]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Perform login logic here
    if (username === "admin" && password === "admin") {
      userLogin("1", "admin");
      navigate("/admin");
    } else if (username === "user" && password === "user") {
      userLogin("1", "client");
      navigate("/client");
    } else {
      handleModal("Invalid username or password");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setShowBackground(window.innerWidth < 992);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        backgroundImage: showBackground ? `url(${bg})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: showBackground ? "transparent" : "#f8f9fa",
      }}
    >
      <div className={`container${showBackground ? "" : "d-flex"}`}>
        <div className="row">
          <div className="col-lg-6 d-none d-lg-block">
            {!showBackground && (
              <img
                src={bg}
                alt="Background"
                className="img-fluid"
                style={{ borderRadius: "1rem" }}
              />
            )}
          </div>
          <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
            <Card style={{ width: "90%", height: "auto" }}>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={handleUsernameChange}
                      style={{ marginTop: "1rem", marginBottom: "1rem" }}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                      style={{ marginTop: "1rem", marginBottom: "1rem" }}
                    />
                  </Form.Group>

                  <Button variant="primary" onClick={handleLogin}>
                    Login
                  </Button>
                  <Button variant="link">Register</Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
