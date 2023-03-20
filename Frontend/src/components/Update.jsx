import {React, useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function Update() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state;
  const [fusername, setUsername] = useState("");
  const [fname, setName] = useState("");
  const [femail, setEmail] = useState("");
  const [fpassword, setPassword] = useState("");
  const [fphone, setPhone] = useState("");

  const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  useEffect(() => {
    client.get("/users/" + id).then((response) => {
      let data = response.data
      setUsername(data.username)
      setName(data.name)
      setEmail(data.email)
      setPhone(data.phone)
      setPassword(data.setPassword)
    })
  })

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

  function handleSubmit() {
    var data = {
      username: fusername,
      name: fname,
      email: femail,
      password: fpassword,
      phone: fphone,
    };
    try {
      client.put("/" + id, JSON.stringify(data)).then(navigate("/"));
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div>
      <h1>Edit Infomation</h1>
      <Card style={{ padding: "15px", width: "75%", margin: "0 auto" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formUsername">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                value={fusername}
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
                value={fname}
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
                value={femail}
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
                value={fphone}
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

export default Update;
