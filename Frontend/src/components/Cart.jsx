import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  var totalPrice = 0;

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  const handleClearCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
    totalPrice = 0;
  };

  const calPrice = (price) => {
    totalPrice += price;
  };

  console.log("totalPrice:" + totalPrice);
  return (
    <Container>
      <Row>
        <Col>
          <h2>Cart Items</h2>
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item, index) => (
                <div key={index}>
                  <ListGroup>
                    <ListGroup.Item>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <p>
                        Price:{" "}
                        {item.quantity > 1
                          ? `${item.quantity} x ${item.price} = ${
                              item.price * item.quantity
                            } บาท`
                          : `1 x ${item.price} บาท`}
                      </p>
                      {calPrice(item.price)}
                      <p>Note: {item.note !== "" ? item.note : "---"}</p>
                      <p>Quantity: {`${item.quantity} ชิ้น`}</p>
                    </ListGroup.Item>
                  </ListGroup>
                  {index !== cartItems.length - 1 && <hr />}
                </div>
              ))}
              <h3>
                Total Price :{" "}
                <span style={{ color: "blue" }}>{totalPrice}</span> บาท
              </h3>
              <Button
                variant="danger"
                onClick={handleClearCart}
                style={{ marginTop: "1rem" }}
              >
                Clear Cart
              </Button>
            </div>
          ) : (
            <p>No items in cart</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
