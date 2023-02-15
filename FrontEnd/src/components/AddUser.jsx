import { React, useState } from "react";
import axios from "axios";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();

  const [fusername, setUsername] = useState("");
  const [fname, setName] = useState("");
  const [femail, setEmail] = useState("");
  const [fpassword, setPassword] = useState("");
  const [fphone, setPhone] = useState("");

  const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  function handleSubmit(event) {
    var data = {
      username: fusername,
      name: fname,
      email: femail,
      password: fpassword,
      phone: fphone,
    };
    try {
      client.post("/add", JSON.stringify(data)).then(navigate("/"));
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(event) {
    var id = event.target.id;
    const data = event.target.value;
    switch (id) {
      case "formUsername":
        setUsername(data);
        return;
      case "formName":
        setName(data);
        return;
      case "formPassword":
        setPassword(data);
        return;
      case "formEmail":
        setEmail(data);
        return;
      case "formPhone":
        setPhone(data);
        return;
      default:
        return;
    }
  }



  return (
    <div>
      <Card style={{ padding: "15px", width: "75%", margin: "0 auto" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formUsername">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Enter Username"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formName">
            <Form.Label column sm="2">
              Name
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Enter Email"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPhone">
            <Form.Label column sm="2">
              Phone
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default AddUser;
