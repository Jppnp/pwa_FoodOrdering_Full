import React, { useState } from "react";
import { Container, Card, Form, Modal, Button } from "react-bootstrap";
import { AccountBalanceWallet, AccountBalance } from "@mui/icons-material";

const Payment = ({ price, selected }) => {
  const [paymentType, setPaymentType] = useState("cash");
  const [showModal, setShowModal] = useState(false);

  const handlePaymentChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // selected(paymentType);
    setShowModal(true);
    console.log("Selected payment type:", paymentType);
  };

  const handleConfirm = () => {
    // Perform any necessary actions for confirmation
    console.log("Confirmed payment type:", paymentType);
    setShowModal(false);
  };

  const handleCancel = () => {
    // Perform any necessary actions for cancellation
    console.log("Payment selection cancelled");
    setShowModal(false);
  };

  const goBack = () => {
    selected(null);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card style={{ padding: "4rem", textAlign: "center" }}>
        <h2>
          ยอดรวม:{" "}
          <span style={{ color: "blue", fontWeight: "bold " }}>{price}</span>{" "}
          บาท
        </h2>
        <Card.Body>
          <Card.Title>เลือกวิธีการชำระเงิน</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Card
              style={{ margin: "1rem", padding: "1rem", textAlign: "start" }}
            >
              <Form.Check
                type="radio"
                name="paymentType"
                value="cash"
                checked={paymentType === "cash"}
                onChange={handlePaymentChange}
                label={
                  <>
                    <AccountBalanceWallet /> เงินสด{" "}
                    <span style={{ color: "gray" }}>
                      {"(ชำระเงินที่ร้านค้า)"}
                    </span>
                  </>
                }
              />
            </Card>
            <Card
              style={{ margin: "1rem", padding: "1rem", textAlign: "start" }}
            >
              <Form.Check
                type="radio"
                name="paymentType"
                value="online"
                checked={paymentType === "online"}
                onChange={handlePaymentChange}
                label={
                  <>
                    <AccountBalance /> ออนไลน์{" "}
                    <span style={{ color: "gray" }}>{"(พร้อมเพย์)"}</span>
                  </>
                }
              />
            </Card>
            <div className="d-flex justify-content-between">
              <Button variant="danger" className="mt-3" onClick={goBack}>
                ยกเลิก
              </Button>
              <Button type="submit" variant="success" className="mt-3">
                ชำระเงิน
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {paymentType === "cash" ? (
            <div>
              <p>Information for cash payment goes here</p>
            </div>
          ) : (
            <div>
              <p>Information for online banking payment goes here</p>
              {/* Add your QR code image here */}
              <img src="path/to/qr-code-image.png" alt="QR Code" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Payment;
