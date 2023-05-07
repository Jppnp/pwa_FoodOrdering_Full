import { useState } from "react";
import { userLogin } from "../utils/UserLogin";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";

function Login() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Here, you would define the logic for checking the user's credentials and setting their role
    // For example:
    if (username === "admin" && password === "admin") {
      userLogin('admin')
      navigate("/");
    } else if (username === "client" && password === "client") {
      userLogin('client')
      navigate("/client");
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="button" onClick={handleLogin}>
        Login
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Invalid username or password. Please try again.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}

export default Login;
