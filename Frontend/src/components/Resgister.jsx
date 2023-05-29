import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { api } from "../utils/UserControl";
import CustomModal from "./Utility_component/CustomModal";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: "",
    message: "",
    function: "",
    confirm: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform registration logic here using formData
    await api
      .post("/customer", formData)
      .then((res) => {
        setModalMessage({
          title: "สำเร็จ",
          message: "สมัครสมาชิกเรียบร้อย",
          function: handleSuccess,
          confirm: false,
        });
        console.log(`Suc`);
      })
      .catch((err) => {
        setModalMessage({
          title: "ล้มเหลว",
          message: err.response.data.message,
          function: closeModal,
          confirm: false,
        });
      });
    setShowModal(true);
  };

  function closeModal() {
    setShowModal(false);
  }
  const handleSuccess = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <Card
          style={{
            margin: "3rem",
            width: window.innerWidth > 575 ? "70%" : "100%",
          }}
        >
          <Form onSubmit={handleSubmit} style={{ margin: "1rem" }}>
            <Card.Title style={{ textAlign: "center" }}>สมัครสมาชิก</Card.Title>
            <Form.Group controlId="fname">
              <Form.Label>ชื่อจริง</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lname" style={{ marginTop: "1rem" }}>
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="phone" style={{ marginTop: "1rem" }}>
              <Form.Label>หมายเลขโทรศัพท์</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email" style={{ marginTop: "1rem" }}>
              <Form.Label>อีเมล์</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="username" style={{ marginTop: "1rem" }}>
              <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password" style={{ marginTop: "1rem" }}>
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <div
              className="d-flex justify-content-between"
              style={{ marginTop: "1rem" }}
            >
              <Button variant="primary" type="submit">
                สมัครสมาชิก
              </Button>
              <Button variant="danger" as={Link} to={-1}>
                ยกเลิก
              </Button>
            </div>
          </Form>
        </Card>
        {showModal && (
          <CustomModal
            modalTitle={modalMessage.title}
            message={modalMessage.message}
            isAccept={modalMessage.function}
            needConfirm={modalMessage.confirm}
            show={true}
          />
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
