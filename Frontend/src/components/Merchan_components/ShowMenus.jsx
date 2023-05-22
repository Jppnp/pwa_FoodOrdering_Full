import React, { useState, useEffect } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const restaurant = JSON.parse(localStorage.getItem("restaurant"));

const MenuCard = ({ menu, onEdit, onDelete }) => {
  const { id, name, des, price, image_path, category } = menu;
  console.log(`Menu: ${menu}`);

  return (
    <Col xs={12} md={9} lg={7} xl={6} xxl={5}>
      <Card
        style={{
          marginBottom: "20px",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <Row>
          <Col xs={4} md={4} style={{ padding: "20px 10px 20px 25px" }}>
            <Card.Img
              src={image_path}
              alt={name}
              style={{ width: `${window.innerWidth * 0.15}px`, height: `${window.innerWidth * 0.1}` }}
            />
          </Col>
          <Col xs={8} md={8}>
            <Card.Body style={{marginLeft: '10px'}}>
              <Card.Title>Name: {name}</Card.Title>
              <Card.Text>Description: {des}</Card.Text>
              <Card.Text>Price: {price} ฿</Card.Text>
              <Card.Subtitle>Category: {category}</Card.Subtitle>
            </Card.Body>
          </Col>
        </Row>
        <Row>
          <Card.Body>
            <div className="d-flex justify-content-around">
              <Button variant="primary" onClick={() => onEdit(id)}>
                Edit
              </Button>{" "}
              <Button variant="danger" onClick={() => onDelete(id)}>
                Delete
              </Button>
            </div>
          </Card.Body>
        </Row>
      </Card>
    </Col>
  );
};

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await api.get(`/menus/location/${restaurant.id}`);
        setMenus(response.data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  const handleAddMenu = () => {
    navigate("/merchant/foods/add");
  };

  const handleUpdateMenu = async (menuID, updatedMenu) => {
    try {
      await api.put(`/menus/update/${restaurant.id}/${menuID}`, updatedMenu);
      setMenus((prevMenus) =>
        prevMenus.map((menu) => (menu.id === menuID ? updatedMenu : menu))
      );
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  const handleDeleteMenu = async (menuID) => {
    try {
      await api.delete(`/menus/delete/${restaurant.id}/${menuID}`);
      setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== menuID));
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  return (
    <div>
      <Button
        variant="success"
        onClick={handleAddMenu}
        className="mb-3"
        style={{ float: "right" }}
      >
        + Add Menu
      </Button>
      <Row>
        {menus.length === 0 ? (
          <h2>No menus available</h2>
        ) : (
          menus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              onEdit={handleUpdateMenu}
              onDelete={handleDeleteMenu}
            />
          ))
        )}
      </Row>
    </div>
  );
};

export default MenuList;
