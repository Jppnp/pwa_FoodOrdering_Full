import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import CustomModal from "./Utility_component/CustomModal";
import { getCustomerInfo } from "../utils/UserControl";

export default function OrderForm() {
  const { state } = useLocation();
  const { selectedMenu } = state;
  const { rid } = useParams();
  const navigate = useNavigate();
  const customer = getCustomerInfo();

  const { id, name, description, price, image_path } = selectedMenu;
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    console.log(`log: ${storedCartItems}`)
    if (storedCartItems) {
      setCartItems(storedCartItems.carts);
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
    if (cartItems) {
      try {
        let updatedCartItems = [...cartItems];

        const customerCartIndex = updatedCartItems.findIndex(
          (cart) => cart.customer_id === customer.id && cart.cart.rid === rid
        );

        if (customerCartIndex !== -1) {
          // If customer has a cart with matching rid
          const updatedItems = [
            ...updatedCartItems[customerCartIndex].cart.items,
            item,
          ];
          updatedCartItems[customerCartIndex] = {
            ...updatedCartItems[customerCartIndex],
            cart: {
              ...updatedCartItems[customerCartIndex].cart,
              items: updatedItems,
            },
          };
        } else {
          // If customer doesn't have a cart with matching rid
          const customerCartIndexWithoutRid = updatedCartItems.findIndex(
            (cart) => cart.customer_id === customer.id
          );

          if (customerCartIndexWithoutRid !== -1) {
            // If customer has a cart without matching rid
            const updatedItems = [
              ...updatedCartItems[customerCartIndexWithoutRid].cart.items,
              item,
            ];
            updatedCartItems[customerCartIndexWithoutRid] = {
              ...updatedCartItems[customerCartIndexWithoutRid],
              cart: { rid: rid, items: updatedItems },
            };
          } else {
            // If customer doesn't have any existing cart
            const newCart = {
              customer_id: customer.id,
              cart: { rid: rid, items: [item] },
            };
            updatedCartItems = [...updatedCartItems, newCart];
          }
        }

        setCartItems(updatedCartItems);
        localStorage.setItem(
          "cartItems",
          JSON.stringify({ carts: updatedCartItems })
        );
      } catch (error) {
        // Handle any potential errors here
      }
    } else {
      const newCart = {
        customer_id: customer.id,
        cart: { rid: rid, items: [item] },
      };
      setCartItems([newCart]);
      localStorage.setItem("cartItems", JSON.stringify({ carts: [newCart] }));
    }
    navigate(-1);
  };

  const handleSubmit = () => {
    const newItem = { menu_id: id, name, price, note, quantity };
    console.log(`New item: ${newItem.name}`);
    addToCart(newItem);
  };

  const modalAccept = (accept) => {
    setModal(false);
    if (accept) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    navigate(-1);
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
              {price * quantity} ฿
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
