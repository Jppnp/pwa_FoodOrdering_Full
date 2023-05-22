import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CustomModal from "../CustomModal";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const BranchCard = ({ branch, onDelete }) => {
  const { id, name, address, lat, lng } = branch;

  return (
    <Col md={6} lg={4} xl={3}>
      <Card style={{ marginBottom: "1rem" }} id={id}>
        <Card.Body>
          <Card.Title>{`${name}`}</Card.Title>
          <Card.Text>{`Address: ${address}`}</Card.Text>
          <Card.Text>{`Latitude: ${lat}`}</Card.Text>
          <Card.Text>{`Longitude: ${lng}`}</Card.Text>
          <Button variant="danger" onClick={() => onDelete(branch)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

const ShowBranchList = () => {
  let { restaurantId, restaurantName } = useParams();
  const [branches, setBranches] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch branches for the given restaurant
    if (restaurantId) {
      api
        .get(`restaurant/locations/${restaurantId}`)
        .then((response) => {
          if (!response.data !== null) {
            setBranches(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [restaurantId]);

  const handleDelete = (branch) => {
    setBranchToDelete(branch);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (accepted) => {
    setShowDeleteModal(false);
    if (accepted && branchToDelete) {
      api
        .delete(`restaurant/locations/${branchToDelete.id}`)
        .then((response) => {
          setShowSuccessModal(true);
          setBranches(branches.filter((b) => b.id !== branchToDelete.id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleAddBranch = () => {
    navigate(
      `/admin/restaurant/add-location/${restaurantId}/${restaurantName}`
    );
  };

  return (
    <div>
      <div
        className="d-flex justify-content-end"
        style={{ marginBottom: `1rem` }}
      >
        <Button variant="success" onClick={handleAddBranch}>
          + Add New Branch
        </Button>
      </div>
      {branches.length > 0 ? (
        <div>
          <Row>
            {branches.map((branch) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                onDelete={handleDelete}
              />
            ))}
          </Row>
          {showDeleteModal && (
            <CustomModal
              modalTitle="Confirmation"
              message={`Are you sure you want to delete this branch?`}
              isAccept={handleConfirmDelete}
              needConfirm={true}
              show={showDeleteModal}
            />
          )}
          {showSuccessModal && (
            <CustomModal
              modalTitle="Success"
              message={`Branch deleted successfully`}
              isAccept={handleSuccessModalClose}
              needConfirm={false}
              show={showSuccessModal}
            />
          )}
        </div>
      ) : (
        <h3>No branches available for this restaurant</h3>
      )}
    </div>
  );
};

export default ShowBranchList;
