import React, { useState, useEffect } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { api } from "../../utils/UserControl";
import Loading from "../Utility_component/Loading";

const OrderNow = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const restaurant = JSON.parse(localStorage.getItem("restaurant"));

  useEffect(() => {
    // Simulating fetching data from the server
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`order/queue/${restaurant.id}`);
        const data = await response.data;
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [restaurant.id]);

  const firstOrder = orders.length > 0 ? orders[0] : null;
  const otherOrders = orders.slice(1);

  const changeOrderStatus = async (orderId) => {
    try {
      await api.put(`order/success/${orderId}`);
      // Remove the first order from the orders state
      setOrders((prevOrders) => prevOrders.slice(1));
    } catch (error) {
      console.error("Error changing order status:", error);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      <div>
        {firstOrder && (
          <Card key={firstOrder.id} style={{ marginBottom: "20px" }}>
            <Card.Header>
              Order #{firstOrder.id}
              <div>
                Date:{" "}
                <Badge bg="secondary">
                  {new Date(firstOrder.date).toLocaleString("en-US", {
                    timeZone: "Asia/Bangkok",
                  })}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body>
              {firstOrder.OrderItems.map((item) => (
                <div key={item.id} style={{ marginBottom: "10px" }}>
                  <div>
                    <strong>{item.name}</strong>
                  </div>
                  <div>จำนวน: {item.quantity}</div>
                  {item.note && (
                    <div style={{ fontSize: "0.8em" }}>
                      หมายเหตุ: {item.note}
                    </div>
                  )}
                </div>
              ))}
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => changeOrderStatus(firstOrder.id)}>
                พร้อมเสิร์ฟ
              </Button>
            </Card.Footer>
          </Card>
        )}

        {otherOrders.length > 0 && (
          <div>
            <h4>Other Orders</h4>
            {otherOrders.map((order) => (
              <Card key={order.id} style={{ marginBottom: "20px" }}>
                <Card.Body>
                  <div>
                    <strong>Order #{order.id}</strong>
                  </div>
                  {order.OrderItems.map((item) => (
                    <div key={item.id} style={{ marginBottom: "10px" }}>
                      <div>
                        <strong>{item.name}</strong>
                      </div>
                      <div>จำนวน {item.quantity}</div>
                      {item.note && (
                        <div style={{ fontSize: "0.8em" }}>
                          หมายเหตุ: {item.note}
                        </div>
                      )}
                    </div>
                  ))}
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderNow;
