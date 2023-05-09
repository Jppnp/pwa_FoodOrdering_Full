import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";

const RestaurantCard = ({ restaurant, onEdit, onDelete }) => {
  const { id, name, address, latitude, longitude } = restaurant;

  return (
    <Col md={6} lg={4} xl={3}>
      <Card style={{ marginBottom: "1rem" }} id={id}>
        <Card.Body>
          <Card.Title>{`${name}`}</Card.Title>
          <Card.Text>
            <strong>Address:</strong> {address}
          </Card.Text>
          <Card.Text>
            <strong>Latitude:</strong> {latitude}
          </Card.Text>
          <Card.Text>
            <strong>Longitude:</strong> {longitude}
          </Card.Text>
          <Button variant="primary" onClick={() => onEdit(restaurant)}>
            Edit
          </Button>{" "}
          <Button variant="danger" onClick={() => onDelete(restaurant)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

const ShowRestaurantList = () => {
  const restaurants = [
    {
      id: 1,
      name: "ร้านที่ 1",
      address: "ตำแหน่งเอ ",
      latitude: "70.13234",
      longitude: "123.3421",
    },
    {
        id: 2,
        name: "ร้านที่ 2",
        address: "ตำแหน่งบี  ",
        latitude: "28.3132",
        longitude: "51.3142",
      },
  ];

  const handleEdit = (restaurant) => {
    // Handle edit action
    console.log("Edit", restaurant);
  };

  const handleDelete = (restaurant) => {
    // Handle delete action
    console.log("Delete", restaurant);
  };

  return (
    <Row>
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </Row>
  );
};

export default ShowRestaurantList;
