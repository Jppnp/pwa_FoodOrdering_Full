import React, { useEffect, useState } from "react";
import { Badge, Card } from "react-bootstrap";
import { api, getCustomerInfo } from "../utils/UserControl";
import Loading from "./Utility_component/Loading";

const customer = getCustomerInfo();

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        
        const response = await api.get(`order/customer/${customer.id}`);
        const getOrder = response.data || [];
        const sortedOrders = getOrder.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        console.log(`data: ${sortedOrders.length}`)

        // Fetch restaurant and order information
        const ordersWithRestaurant = await Promise.all(
          sortedOrders.map(async (order) => {
            const restaurantLocationResponse = await api.get(
              `restaurant/locations/location/${order.restaurant_location_id}`
            );
            const restaurantLocationData = restaurantLocationResponse.data;
            const restaurantId = restaurantLocationData.restaurant_id;
            const restaurantResponse = await api.get(
              `restaurants/${restaurantId}`
            );
            const restaurantData = restaurantResponse.data;
            return {
              ...order,
              restaurantName: `${restaurantData.name} - ${restaurantLocationData.name}`,
            };
          })
        );

        // Fetch payment details for each order
        const ordersWithPayment = await Promise.all(
          ordersWithRestaurant.map(async (order) => {
            const paymentResponse = await api.get(
              `payment/${order.payment_id}`
            );
            const paymentData = paymentResponse.data;
            return {
              ...order,
              payment: paymentData,
            };
          })
        );

        setOrders(ordersWithPayment);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching order data:", error);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {isLoading && <Loading />}
      <div style={{ margin: "0 2rem" }}>
        {orders.map((order) => {
          return (
            <Card key={order.id} style={{ marginBottom: "20px" }}>
              <Card.Header>
                Order #{order.id} - <h2>{order.restaurantName}</h2>
                <div>
                  Date:{" "}
                  <Badge bg="secondary">
                    {new Date(order.date).toLocaleString("en-US", {
                      timeZone: "Asia/Bangkok",
                    })}
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body>
                {order.OrderItems.map((item) => (
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
                    </div>
                    {item.note && (
                      <div style={{ fontSize: "0.8em" }}>{item.note}</div>
                    )}
                  </div>
                ))}
              </Card.Body>
              <Card.Footer>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    Status:{" "}
                    <Badge
                      bg={order.status === "success" ? "success" : "secondary"}
                      style={{ color: "#fff" }}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  Payment Price:{" "}
                  {order.payment && !isNaN(order.payment.price) ? (
                    <Badge bg="info" style={{ fontSize: "1em" }}>
                      ${order.payment.price.toFixed(2)}
                    </Badge>
                  ) : (
                    <span>Price Unavailable</span>
                  )}
                </div>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;
