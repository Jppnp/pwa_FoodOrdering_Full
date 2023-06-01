import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import {
  api,
  getCustomerInfo,
  pushOfflineRequest,
} from "../utils/UserControl";
import PaymentSelect from "./Payment";
import Loading from "./Utility_component/Loading";
import { useNavigate } from "react-router-dom";
import CustomModal from "./Utility_component/CustomModal";

const customer = getCustomerInfo();

const Cart = ({ isOnline }) => {
  const [cartItems, setCartItems] = useState([]);
  const [restaurant, setRestaurant] = useState("");
  const [location, setLocation] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [offlineModal, setOfflineModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));

    const getName = async (getRid) => {
      try {
        const locationRes = await api.get(
          `restaurant/locations/location/${getRid}`
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
      const matching =
        storedCartItems.carts &&
        storedCartItems.carts.find((cart) => cart.customer_id === customer.id);
      if (matching) {
        setCartItems(matching.cart.items);
        if (isOnline) {
          getName(matching.cart.rid);
        } else {
        }
      }
    }
    setLoading(false);
  }, [isOnline]);

  const handleClearCart = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  const removeItem = (itemToRemove) => {
    const updatedCart = cartItems.filter((item) => item !== itemToRemove);
    setCartItems(updatedCart);

    // Update localStorage with the updated cart items
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      const matching = storedCartItems.carts.find(
        (cart) => cart.customer_id === customer.id
      );
      if (matching) {
        matching.cart.items = updatedCart;
        localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
      }
    }
  };

  const totalPrice = cartItems.reduce((accumulator, item) => {
    const { price, quantity } = item;
    return accumulator + price * quantity;
  }, 0);

  const offlineSubmit = async (accept) => {
    setOfflineModal(false);
    if (accept && !isOnline) {
      setLoading(true);
      const paymentData = {
        type: "cash",
        price: totalPrice,
      };
      await pushOfflineRequest(`payment`, `post`, paymentData);
      setLoading(false);
      navigate("/client/");
    }
  };

  const handleSubmit = () => {
    console.log(isOnline);
    if (!isOnline) {
      setOfflineModal(true);
    } else {
      setShowPayment(true);
    }
  };

  const selectedPayment = async (payment) => {
    setShowPayment(false);
    if (payment) {
      // Handle selected payment type
      setLoading(true);
      const newOrder = {
        restaurant_location_id: location.id,
        customer_id: customer.id,
        items: cartItems,
        payment_id: payment.id,
      };
      try {
        await api.post("order", JSON.stringify(newOrder));
        removeCart();
        setLoading(false);
        navigate("/client/history");
      } catch (err) {
        console.log(`has error while create order: ${err}`);
      }
    }
  };

  const removeCart = () => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")).carts;
    const updatedCarts = storedCartItems.filter(
      (cart) => cart.customer_id !== customer.id
    );
    storedCartItems.carts = updatedCarts;
    localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
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
                                  onClick={() => removeItem(item)}
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
          {offlineModal && (
            <CustomModal
              modalTitle={"ยืนยันการสั่ง"}
              message={
                "ขณะนี้คุณอยู่ในโหมดออฟไลน์ รูปแบบการจ่ายเงินจะเป็นเงินสด และจะสั่งให้อัตโนมัติเมื่อกลับมาออนไลน์อีกครั้ง"
              }
              isAccept={offlineSubmit}
              needConfirm={true}
              show={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
