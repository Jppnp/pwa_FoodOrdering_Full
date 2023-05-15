import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNewRestaurant = () => {
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const navigate = useNavigate()

  const url = process.env.REACT_APP_BASE_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can perform any necessary actions with the collected data,
    // such as sending it to a server or updating a state in a parent component.

    handleModal(`Name: ${name}`);
  };

  const handleModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const cancelModal = () => {
    setShowModal(false);
    setErrorModal(false)
  };
  const acceptModal = () => {
    axios
      .post(`${url}/restaurants`, {
        name: name
      })
      .then((response) => {
        setName("");
        setShowModal(false)
        navigate("/admin/restaurant-list")
      })
      .catch((err) => {
        setErrorModal(true);
        handleModal(`ERROR: ${err.message}`);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter restaurant name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Restaurant
        </Button>
      </Form>
      <Modal show={showModal} onHide={cancelModal}>
        <Modal.Header closeButton>
          <Modal.Title>{errorModal ? "Error": "ตรวจสอบ"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          <Button variant="danger" onClick={cancelModal}>
            Cancel
          </Button>
          {!errorModal && (
            <Button variant="primary" onClick={acceptModal}>
              Accept
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddNewRestaurant;
