import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomModal from "../Utility_component/CustomModal";
import { api } from "../../utils/UserControl";

const RestaurantCard = ({ restaurant, onEdit, onDelete, onSee }) => {
  const { id, name } = restaurant;

  return (
    <Col md={6} lg={4} xl={3}>
      <Card style={{ marginBottom: "1rem" }} id={id}>
        <Card.Body>
          <Card.Title>{`${name}`}</Card.Title>
          <Button variant="primary" onClick={() => onSee(restaurant)}>
            Branch
          </Button>{" "}
          <Button variant="warning" onClick={() => onEdit(restaurant)}>
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
  const [restaurants, setRestaurants] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("restaurants")
      .then((response) => {
        if (response.data !== null) {
          setRestaurants(response.data);
        }
      })
      .catch((err) => {
        setShowDeleteModal(false);
      });
  }, []);
  console.log(`Restaurant : ${JSON.stringify(restaurants)}`);

  const handleSee = (restaurant) => {
    navigate(`/admin/restaurant/locations/${restaurant.id}/${restaurant.name}`);
    console.log("See", restaurant);
  };

  const handleEdit = (restaurant) => {
    console.log("Edit", restaurant);
  };

  const handleDelete = (restaurant) => {
    setRestaurantToDelete(restaurant);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (accepted) => {
    setShowDeleteModal(false);
    if (accepted && restaurantToDelete) {
      api
        .delete(`restaurants/${restaurantToDelete.id}`)
        .then((response) => {
          setShowSuccessModal(true);
        })
        .catch((err) => {
          setShowSuccessModal(false);
        });
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  return (
    <div>
      <Row>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSee={handleSee}
            />
          ))
        ) : (
          <h1>No restaurants in the system</h1>
        )}
      </Row>
      {showDeleteModal && (
        <CustomModal
          modalTitle="Confirmation"
          message={`Are you sure you want to delete ${restaurantToDelete?.name}?`}
          isAccept={handleConfirmDelete}
          needConfirm={true}
          show={showDeleteModal}
        />
      )}
      {showSuccessModal && (
        <CustomModal
          modalTitle="Success"
          message={`Restaurant deleted successfully`}
          isAccept={handleSuccessModalClose}
          needConfirm={false}
          show={showSuccessModal}
        />
      )}
    </div>
  );
};

export default ShowRestaurantList;
