import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";

export default function Notification() {
  const notifications = [
    {
      date: "2023-05-04 10:30",
      restaurant: "Pizza Hut",
      orderNumber: "12345",
      orderStatus: "In Queue",
    },
    {
      date: "2023-05-04 11:00",
      restaurant: "McDonalds",
      orderNumber: "67890",
      orderStatus: "Cooking",
    },
    {
      date: "2023-05-04 12:15",
      restaurant: "Burger King",
      orderNumber: "24680",
      orderStatus: "Ready to serve",
    },
    {
      date: "2023-05-04 13:30",
      restaurant: "KFC",
      orderNumber: "13579",
      orderStatus: "Finish",
    },
    {
      date: "2023-05-04 14:45",
      restaurant: "Taco Bell",
      orderNumber: "97531",
      orderStatus: "Failed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Queue":
        return "primary";
      case "Cooking":
        return "warning";
      case "Ready to serve":
        return "success";
      case "Finish":
        return "secondary";
      case "Failed":
        return "danger";
      default:
        return "";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
        case "Cooking":
            return "dark"
        default:
            return ""
    }
  }

  return (
    <div className="container">
      {notifications.map((notification, index) => (
        <Card key={index} style={{ marginBottom: "1rem" }}>
          <Card.Body>
            <Row>
              <Col sm={4}>
                <p>{notification.date}</p>
              </Col>
              <Col sm={4}>
                <p>{notification.restaurant}</p>
              </Col>
              <Col sm={4}>
                <p>Order #{notification.orderNumber}</p>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <p>
                  Status:{" "}
                  <Badge 
                    bg={getStatusColor(notification.orderStatus)}
                    text={getStatusTextColor(notification.orderStatus)}
                    style={{fontSize: '0.9em'}}
                    >
                    {notification.orderStatus}
                  </Badge>
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
