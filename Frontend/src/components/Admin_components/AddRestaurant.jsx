import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can perform any necessary actions with the collected data,
    // such as sending it to a server or updating a state in a parent component.

    // Reset the form fields
    setName("");
    setAddress("");
    setLatitude("");
    setLongitude("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter restaurant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{marginBottom: '1rem'}}
        />
      </Form.Group>

      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter restaurant address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={{marginBottom: '1rem'}}
        />
      </Form.Group>

      <Form.Group controlId="latitude">
        <Form.Label>Latitude</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
          style={{marginBottom: '1rem'}}
        />
      </Form.Group>

      <Form.Group controlId="longitude">
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
          style={{marginBottom: '1rem'}}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Restaurant
      </Button>
    </Form>
  );
};

export default AddRestaurant;
