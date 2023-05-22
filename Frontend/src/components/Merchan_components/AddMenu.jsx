import React, { useState } from "react";
import { Form, Button, Modal, Image } from "react-bootstrap";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const restaurant = JSON.parse(localStorage.getItem("restaurant"))

const AddMenu = () => {
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can perform any necessary actions with the collected data,
    // such as sending it to a server or updating a state in a parent component.

    handleModal(`Name: ${name}\nDes: ${des}\nPrice: ${price}`);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file)
    setPreviewImage(URL.createObjectURL(file));
  };

  const categories = [
    {
      id: 1,
      name: "food",
    },
    {
      id: 2,
      name: "drink",
    },
    {
      id: 3,
      name: "dessert",
    },
  ];

  const handleModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const cancelModal = () => {
    setShowModal(false);
    setErrorModal(false);
  };

  const acceptModal = () => {
    const newMenu = new FormData();
    newMenu.append('Name', name)
    newMenu.append('Description', des)
    newMenu.append('Price', price)
    newMenu.append('Category', category)
    newMenu.append('image', image)


    api
      .post(`/menus/${restaurant.id}`, newMenu, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        setName("");
        setShowModal(false);
        console.log(response)
        // navigate("/merchant/foods");
      })
      .catch((err) => {
        setErrorModal(true);
        console.log(err)
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
        <Form.Group controlId="des">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description of menu"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price of menu"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>
        <Form.Group controlId="category" style={{ marginTop: "1rem" }}>
          <Form.Label>Select Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option disabled value="">
              Select Category
            </option>
            {categories.map((e) => (
              <option key={e.id} value={e.name}>
                {e.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="image" style={{ marginTop: "1rem" }}>
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleImageUpload}
            required
          />
        </Form.Group>

        {/* Image preview */}
        {previewImage && (
          <div style={{ marginTop: "1rem" }}>
            <Image src={previewImage} alt="Preview" thumbnail style={{width: '130px', height: '100'}}/>
          </div>
        )}

        <Button variant="primary" type="submit" style={{ marginTop: "1rem" }}>
          Add Restaurant
        </Button>
      </Form>
      <Modal show={showModal} onHide={cancelModal}>
        <Modal.Header closeButton>
          <Modal.Title>{errorModal ? "Error" : "ตรวจสอบ"}</Modal.Title>
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

export default AddMenu;
