import React, { useState } from "react";
import { Container, Card, Form, Modal, Button } from "react-bootstrap";
import { AccountBalanceWallet, AccountBalance } from "@mui/icons-material";
// import { createQR } from "../utils/BankControl";
import Loading from "./Utility_component/Loading";
import { api, pushOfflineRequest } from "../utils/UserControl";
import CustomModal from "./Utility_component/CustomModal";

const Payment = ({ price, selected }) => {
  const [paymentType, setPaymentType] = useState("cash");
  const [showModal, setShowModal] = useState(false);
  // const [bankingData, setBankingData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [finishModal, setFinishModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [payment, setPayment] = useState();

  const handlePaymentChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // selected(paymentType);

    console.log("Selected payment type:", paymentType);
    setIsLoading(true);
    const data = {
      type: paymentType,
      price: price,
    };
    try {
      const res = await api.post("payment", data);
      setPayment(res.data);
      console.log(`Response from create payment: ${res.data}`);
    } catch (error) {
      console.error("Error during post Payment:", error);
    }
    setIsLoading(false);
    setShowModal(true);
    // Enable when need create QR code for online banking
    // if (paymentType === "online") {
    //   // const res = await createQR(price);
    // } else {
    // }
  };

  const handleConfirm = () => {
    console.log("Confirmed payment type:", paymentType);
    // For online we need confirm customer has paid
    if (paymentType === "online") { 
      setMessage({
        title: "ชำระเงินเสร็จสิ้น",
        message: "ขอบคุณที่ชำระเงิน",
        function: paidModal,
      });
      setShowModal(false);
      setFinishModal(true);
    } else {
      // if selected "cash" done
      // Go to ordering
      selected(payment);
    }
  };

  const paidModal = () => {
    setFinishModal(false);
    selected(payment);
  };
  const handleCancel = () => {
    // Perform any necessary actions for cancellation
    console.log("Payment selection cancelled");
    setShowModal(false);
  };

  const goBack = () => {
    selected(false);
  };

  return (
    <div>
      {isLoading && <Loading />}
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
                <p>การชำระด้วยเงินสด สามารถชำระได้ที่ร้านค้า</p>
                <p>แจ้งหมายเลขออร์เดอร์ของคุณที่หน้าร้านได้เลย</p>
              </div>
            ) : (
              <div>
                <p>ชำระเงินผ่าน QR ด้านล่างนีี้ หากเสร็จแล้่วกดยืนยัน</p>
                {/* Add your QR code image here */}
                {/* <img
                  src={`data:image/jpeg;base64,${bankingData.qrImage}`}
                  alt="QR Code"
                /> */}
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
        {finishModal && (
          <CustomModal
            modalTitle={message.title}
            message={message.message}
            isAccept={message.function}
            needConfirm={false}
            show={true}
          />
        )}
      </Container>
    </div>
  );
};

export default Payment;
