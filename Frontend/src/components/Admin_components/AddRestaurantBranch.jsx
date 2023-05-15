import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CustomModal from "../CustomModal";

const AddRestaurantBranch = () => {
  const { restaurantId, restaurantName } = useParams();
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalGo, setShowModalGo] = useState(false);
  const navigate = useNavigate();
  
  
  const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  

  const handleConfirm = (accepted) => {
    setShowModal(false);
    if (accepted) {
      const newBranch = {
        address: address,
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
        restaurant_id: parseInt(restaurantId, 10),
        name: branchName,
      };

      console.log(`new Branch : ${JSON.stringify(newBranch)}`);

      api
        .post("/restaurant/locations", JSON.stringify(newBranch))
        .then((response) => {
          response.status === 200
            ? setShowModalGo(true)
            : console.log(
                `Error response to post new Branch: ${response.message}`
              );
        })
        .catch((error) => {
          console.log(`Error  Message: ${error.data === "error"}`);
          console.log(error);
        });
    }
  };
  const goTo = () => {
    setShowModalGo(false);
    navigate(`/admin/restaurant/locations/${restaurantId}/${restaurantName}`);
  };

  return (
    <div>
      <h2>Add New Branch for {restaurantName}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="branchName">
          <Form.Label>Branch Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter branch name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="latitude">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="longitude">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: "1rem" }}>
          Add Branch
        </Button>
      </Form>
      {showModal && (
        <CustomModal
          modalTitle="Confirmation"
          message={`Are you sure you want to add this branch?`}
          isAccept={handleConfirm}
          needConfirm={true}
          show={showModal}
        />
      )}
      {showModalGo && (
        <CustomModal
          modalTitle="แจ้งเตือนสำเร็จ"
          message={"ได้เพิ่มข้อมูลสาขา เข้าสู่ร้านอาหารแล้ว"}
          isAccept={goTo}
          needConfirm={false}
          show={showModalGo}
        />
      )}
    </div>
  );
};

export default AddRestaurantBranch;
