import React from "react";
import { Badge, Card } from "react-bootstrap";

const OrderHistory = () => {
  const orders = [
    {
      id: 12345,
      restaurantName: "The Burger Joint",
      date: "2023-05-10 12:34:56",
      status: "success",
      items: [
        {
          id: 1,
          name: "Classic Cheeseburger",
          price: 9.99,
          quantity: 2,
          note: "No onions please",
        },
        { id: 2, name: "Fries", price: 3.99, quantity: 1, note: null },
        { id: 3, name: "Soda", price: 2.99, quantity: 1, note: "Diet Coke" },
      ],
    },
    {
      id: 54321,
      restaurantName: "Pizza Palace",
      date: "2023-04-22 08:15:00",
      status: "failed",
      items: [
        {
          id: 4,
          name: "Pepperoni Pizza",
          price: 12.99,
          quantity: 1,
          note: "Extra cheese",
        },
        {
          id: 5,
          name: "Garlic Bread",
          price: 5.99,
          quantity: 1,
          note: null,
        },
      ],
    },
  ];

  return (
    <div style={{ margin: "0 2rem" }}>
      {orders.map((order) => {
        // Calculate the total price of the order
        const totalPrice = order.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return (
          <Card key={order.id} style={{ marginBottom: "20px" }}>
            <Card.Header>
              Order #{order.id} - <h2>{order.restaurantName}</h2>
              <div>
                Date: <Badge bg="secondary">{order.date}</Badge>
              </div>
            </Card.Header>
            <Card.Body>
              {order.items.map((item) => (
                <div key={item.id} style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                  {item.note && (
                    <div style={{ fontSize: "0.8em" }}>{item.note}</div>
                  )}
                </div>
              ))}
            </Card.Body>
            <Card.Footer>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  Total:{" "}
                  <Badge bg="primary" style={{ fontSize: "1.2em" }}>
                    ${totalPrice.toFixed(2)}
                  </Badge>
                </div>
                <div>
                  Status:{" "}
                  <Badge bg={order.status === "success" ? "success" : "danger"}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            </Card.Footer>
          </Card>
        );
      })}
    </div>
  );
};

export default OrderHistory;
