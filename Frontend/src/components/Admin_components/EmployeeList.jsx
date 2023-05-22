import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { api } from "../../utils/UserControl";

const MerchantCard = ({ merchant, onEdit, onDelete }) => {
  const { fname, lname, email, restaurant_location_id, role } = merchant;
  const [restaurant, setRestaurant] = useState(null);
  const [location, setLocation] = useState(null);
  
  useEffect(() => {
    const fetchRestaurantAndLocation = async () => {
      try {
        const locationResponse = await api.get(
          `/restaurant/locations/location/${restaurant_location_id}`
        );
        const { restaurant_id } = locationResponse.data;

        const restaurantResponse = await api.get(
          `/restaurants/${restaurant_id}`
        );

        setRestaurant(restaurantResponse.data);
        setLocation(locationResponse.data);
      } catch (error) {
        console.log("Error while fetching data:", error);
      }
    };

    fetchRestaurantAndLocation();
  }, [restaurant_location_id]);

  return (
    <Col md={6} lg={4} xl={3}>
      <Card style={{ marginBottom: "1rem" }}>
        <Card.Body>
          <Card.Title>{`${fname} ${lname}`}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {email}
          </Card.Text>
          <Card.Text>
            <strong>Role:</strong> {role}
          </Card.Text>
          <Card.Text>
            <strong>Work At:</strong> {restaurant?.name}
          </Card.Text>
          <Card.Text>
            <strong>Branch:</strong> {location?.name}
          </Card.Text>
          <Button variant="primary" onClick={() => onEdit(merchant)}>
            Edit
          </Button>{" "}
          <Button variant="danger" onClick={() => onDelete(merchant)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

const MerchantList = () => {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await api.get("merchants");
        setMerchants(response.data);
      } catch (error) {
        console.log("Error while fetching all merchants:", error);
      }
    };

    fetchMerchants();
  }, []);

  const handleEdit = (merchant) => {
    // Handle edit action
    console.log("Edit", merchant);
  };

  const handleDelete = (merchant) => {
    // Handle delete action
    console.log("Delete", merchant);
  };

  return (
    <div>
      {merchants.length > 0 ? (
        <Row>
          {merchants.map((merchant) => (
            <MerchantCard
              key={merchant.id}
              merchant={merchant}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Row>
      ) : (
        <h3>No Merchant in system</h3>
      )}
    </div>
  );
};

export default MerchantList;
