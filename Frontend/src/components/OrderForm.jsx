import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import CustomModal from "./CustomModal";

export default function OrderForm() {
  const { state } = useLocation();
  const { selectedMenu } = state;
  const { rid } = useParams();
  const navigate = useNavigate();

  const { name, description, price, image_path } = selectedMenu;
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState({
    rid: rid,
    items: [],
  });
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      alert("จำนวนไม่สามารถลดได้แล้ว");
    }
  };

  const handleQuantityIncrese = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const addToCart = (item) => {
    var updateCartItems = [...cartItems.items, item];
    if (localStorage.getItem("cartItems")) {
      setCartItems({ ...cartItems, items: updateCartItems });

      const oldCart = JSON.parse(localStorage.getItem("cartItems"));
      if (oldCart.rid === rid) {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else {
        setModal(true);
      }
    } else {
      setCartItems({ ...cartItems, items: updateCartItems });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    navigate(-1);
  };

  const modalAccept = (accept) => {
    setModal(false);
    if (accept) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    navigate(-1);
  };

  const handleSubmit = () => {
    const newItem = { name, description, price, note, quantity };
    addToCart(newItem);
    window.history.back();
  };

  return (
    <div>
      <div>
        <div style={{ padding: "10px 35px 10px 35px" }}>
          <Card style={{ textAlign: "center", border: "0" }}>
            <div
              className="d-flex justify-content-center"
              style={{ marginBottom: "1rem" }}
            >
              <Card.Img
                style={{ width: "240px", height: "200px" }}
                src={image_path}
              />
            </div>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{description}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div
          className="fixed-bottom"
          style={{ padding: "1rem", marginBottom: "5rem" }}
        >
          <div className="d-flex justify-content-center">
            <input
              type="text"
              className="form-control"
              style={{ maxWidth: "80%" }}
              onChange={handleNoteChange}
              placeholder="คำสั่งเพิ่มเติมเกี่ยวกับอาหาร"
            />
          </div>
          <div
            className="d-flex justify-content-center gap-3"
            style={{ padding: "1rem" }}
          >
            <Button
              variant="primary"
              style={{ borderRadius: "10px" }}
              onClick={handleQuantityDecrease}
            >
              -
            </Button>
            <span>{quantity}</span>
            <Button
              variant="primary"
              style={{ borderRadius: "10px" }}
              onClick={handleQuantityIncrese}
            >
              +
            </Button>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              style={{ borderRadius: "10px" }}
              onClick={handleSubmit}
            >
              {price * quantity} $
            </Button>
          </div>
        </div>
      </div>
      {showModal && (
        <CustomModal
          modalTitle={"ยืนยันการเปลี่ยนแปลง"}
          message={"คุณมีอาหารในตะกร้าแล้ว ต้องการจะเปลี่ยนร้านหรือไม่"}
          isAccept={modalAccept}
          needConfirm={true}
          show={true}
        />
      )}
    </div>
  );
}
