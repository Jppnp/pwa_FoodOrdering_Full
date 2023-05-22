import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function CustomModal({modalTitle, message, isAccept, needConfirm, show}) {
  const [showModal, setShowModal] = useState(show);
  const modalMessage = message;
  const title = modalTitle || "Error";

  const cancelModal = () => {
    console.log("Cancel CustomModal")
    setShowModal(false);
    isAccept(false)
  };

  const acceptModal = () => {
    console.log("Accept CustomModal")
    setShowModal(false);
    isAccept(true)
  };

  return (
    <Modal show={showModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalMessage}</Modal.Body>
      <Modal.Footer style={{ justifyContent: "space-between" }}>
        <Button variant="danger" onClick={cancelModal}>
          Close
        </Button>
        {needConfirm && (
          <Button variant="success" onClick={acceptModal}>
            Accept
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
