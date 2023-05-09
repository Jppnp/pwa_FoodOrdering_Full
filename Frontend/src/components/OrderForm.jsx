import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function OrderForm() {

  const { state } = useLocation();
  const { selectedMenu } = state;
  const {name, description, price, image} = selectedMenu
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
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
    const updateCartItems = [...cartItems, item];
    setCartItems(updateCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updateCartItems))
  }

  const handleSubmit = () => {
    const newItem = {name, description, price, note, quantity};
    addToCart(newItem)
    window.history.back()
  };

  return (
    <div>
      <div style={{ padding: "10px 35px 10px 35px" }}>
        <Card style={{ textAlign: "center", border: "0" }}>
          <div
            className="d-flex justify-content-center"
            style={{ marginBottom: "1rem" }}
          >
            <Card.Img
              style={{ width: "240px", height: "200px" }}
              src={image}
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
  );
}
