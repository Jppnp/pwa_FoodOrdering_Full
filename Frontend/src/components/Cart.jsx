import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { api } from "../utils/UserControl";
import PaymentSelect from "./Payment";
import Loading from "./Utility_component/Loading";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [restaurant, setRestaurant] = useState("");
  const [location, setLocation] = useState("");
  const [showPayment, setShowPayMent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    const getName = async () => {
      try {
        console.log("In try");
        const locationRes = await api.get(
          `restaurant/locations/location/${storedCartItems.rid}`
        );
        const { restaurant_id } = locationRes.data;

        const restaurantRes = await api.get(`restaurants/${restaurant_id}`);

        setRestaurant(restaurantRes.data);
        setLocation(locationRes.data);
      } catch (err) {
        console.log(`error get restaurant name: ${err}`);
      }
    };

    if (storedCartItems) {
      setCartItems(storedCartItems.items);
      getName();
    }
    setLoading(false);
  }, []);

  const handleClearCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
    totalPrice = 0;
  };

  const removeItem = (itemToRemove) => {
    const updatedCart = cartItems.filter((item) => item !== itemToRemove);
    setCartItems(updatedCart);
  };

 const totalPrice = cartItems.reduce((accumulator, item) => {
  const { price, quantity } = item
  return accumulator + (price * quantity)
 }, 0)

  const handleSubmit = () => {
    setShowPayMent(true);
  };

  const selectedPayment = (type) => {
    setShowPayMent(false);
    if(type) {
      
    }
  };
  const logging = (item) => {
    console.log(`item: ${item.name}`);
    console.log(`length of cart: ${cartItems.length}`);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {!showPayment ? (
            <Container>
              <Row>
                <Col>
                  <h2>รายการอาหารในตะกร้า</h2>
                  {cartItems.length > 0 ? (
                    <div>
                      <h3 style={{ marginLeft: "10px" }}>
                        {restaurant.name} สาขา {location.name}
                      </h3>
                      {cartItems.map((item, index) => (
                        <div key={index}>
                          {logging(item)}
                          <ListGroup>
                            <ListGroup.Item>
                              <h3>{item.name}</h3>
                              <p>{item.description}</p>
                              <p style={{ color: "gray" }}>
                                ** {item.note !== "" ? item.note : "-"} **
                              </p>
                              <p>
                                จำนวน:{" "}
                                <span
                                  style={{ color: "blue", fontWeight: "bold" }}
                                >
                                  {item.quantity}
                                </span>{" "}
                                จาน
                              </p>
                              <div className="d-flex justify-content-between">
                                <p>
                                  ราคา: {item.quantity} {" x "}
                                  <span
                                    style={{
                                      color: "blue",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {item.quantity > 1
                                      ? `${item.price} = ${
                                          item.price * item.quantity
                                        }`
                                      : item.price}{" "}
                                  </span>
                                  บาท
                                </p>
                                <Button
                                  variant="danger"
                                  onClick={(item) => removeItem(item)}
                                >
                                  ลบรายการอาหาร
                                </Button>
                              </div>
                            </ListGroup.Item>
                          </ListGroup>
                          {index !== cartItems.length - 1 && <hr />}
                        </div>
                      ))}
                      <h3>
                        Total Price :{" "}
                        <span style={{ color: "blue" }}>{totalPrice}</span> บาท
                      </h3>
                      <div
                        className="d-flex justify-content-around"
                        style={{ marginBottom: "20px" }}
                      >
                        <Button
                          variant="danger"
                          onClick={handleClearCart}
                          style={{ marginTop: "1rem" }}
                        >
                          เคลียร์ตะกร้า
                        </Button>
                        <Button
                          variant="success"
                          onClick={handleSubmit}
                          style={{ marginTop: "1rem" }}
                        >
                          สั่งอาหาร
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p>No items in cart</p>
                  )}
                </Col>
              </Row>
            </Container>
          ) : (
            <PaymentSelect price={totalPrice} selected={selectedPayment} />
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
