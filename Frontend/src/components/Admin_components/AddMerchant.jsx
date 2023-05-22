import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import CustomModal from "../CustomModal";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/UserControl";

const AddMerchant = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [workAt, setWorkAt] = useState("");
  const [branch, setBranch] = useState("");
  const [restaurant, setRestaurant] = useState([]);
  const [locations, setLocation] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseModalMessage, setResponseModalMessage] = useState({
    title: null,
    message: null,
    type: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("restaurants")
      .then((response) => {
        if (response.data !== null) {
          setRestaurant(response.data);
        }
      })
      .catch((err) => {
        console.log(`Erro get restaurant for add merchant: ${err.Error()}`);
      });
  }, []);

  useEffect(() => {
    if (workAt) {
      api
        .get(`restaurant/locations/${workAt}`)
        .then((response) => {
          setLocation(response.data);
        })
        .catch((err) => {
          console.log(`Error get Restaurant Location: ${err}`);
        });
    }
  }, [workAt]);

  const roles = [
    {
      id: 1,
      name: "merchant",
    },
  ];

  const handleConfirm = (accepted) => {
    setShowModal(false);
    if (accepted) {
      const newMerchant = {
        fname: firstName,
        lname: lastName,
        email: email,
        password: password,
        role: role,
        restaurant_location_id: parseInt(branch, 10),
      };
      console.log(`new merchant : ${JSON.stringify(newMerchant)}`)
      api
        .post("/merchants", JSON.stringify(newMerchant))
        .then((response) => {
          setResponseModalMessage({
            title: "แจ้งเตือน",
            message: "เพิ่มข้อมูลเรียบร้อย",
            type: "success",
          });
          setShowResponseModal(true);
        })
        .catch((err) => {
          setResponseModalMessage({
            title: "แจ้งเตือน",
            message: `ไม่สามารถเพิ่มข้อมูลได้`,
            type: "error",
          });
          console.log(`Error while create ${err.message}`)
          setShowResponseModal(true);
        });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };


  const finish = () => {
    setShowResponseModal(false);
    if (responseModalMessage.type === "success") {
      navigate("/admin/merchants");
    }
  };
  return (
    <div>
      <div>
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

          <Form.Group controlId="role" style={{ marginTop: "1rem" }}>
            <Form.Label>Select role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option disabled value="">
                Select Role
              </option>
              {roles.map((e) => (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))}
            </Form.Control>
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
                Select Restaurant
              </option>
              {restaurant.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {workAt && (
            <Form.Group controlId="location" style={{ marginTop: "1rem" }}>
              <Form.Label>Select Location</Form.Label>
              <Form.Control
                as="select"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
              >
                <option disabled value="">
                  Select Location
                </option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          )}

          <Button variant="primary" type="submit" style={{ marginTop: "1rem" }}>
            Add Person
          </Button>
        </Form>
      </div>
      {showModal && (
        <CustomModal
          modalTitle={`ยืนยันข้อมูล`}
          message={`First Name: ${firstName}
          Last Name: ${lastName}
          Email: ${email}
          Password: ${password}
          Role: ${role}
          Restaurant Location: ${branch}`}
          needConfirm={true}
          isAccept={handleConfirm}
          show={showModal}
        />
      )}
      {showResponseModal && (
        <CustomModal
          modalTitle={responseModalMessage.title}
          message={responseModalMessage.message}
          isAccept={finish}
          needConfirm={false}
          show={true}
        />
      )}
    </div>
  );
};

export default AddMerchant;
