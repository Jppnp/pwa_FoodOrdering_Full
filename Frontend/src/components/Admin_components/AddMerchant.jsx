import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddMerchant = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("merchant");
  const [workAt, setWorkAt] = useState("");

  const restaurants = [
    {
      id: 1,
      name: "ร้านที่ 1",
    },
    {
      id: 2,
      name: "ร้านที่ 2",
    },
    {
      id: 3,
      name: "ร้านที่ 3",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the form data (e.g., send it to a server)

    // Reset form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRole("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="lastName" style={{ marginTop: "1rem" }}>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="email" style={{ marginTop: "1rem" }}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="phone" style={{ marginTop: "1rem" }}>
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="password" style={{ marginTop: "1rem" }}>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="workAt" style={{ marginTop: "1rem" }}>
        <Form.Label>Select Restaurant</Form.Label>
        <Form.Control
          as="select"
          value={workAt}
          onChange={(e) => setWorkAt(e.target.value)}
          required
        >
          <option disabled value="">
            Select Role
          </option>
          {restaurants.map((restaurant) => (
            <option value={restaurant.id}>{restaurant.name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit" style={{ marginTop: "1rem" }}>
        Add Person
      </Button>
    </Form>
  );
};

export default AddMerchant;
