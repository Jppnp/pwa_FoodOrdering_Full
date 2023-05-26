import React, { useState, useEffect } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/UserControl";

const restaurant = JSON.parse(localStorage.getItem("restaurant"));

const MenuCard = ({ menu, onEdit, onDelete }) => {
  const { id, name, description, price, image_path, category } = menu;
  console.log(`Menu: ${menu}`);

  return (
    <Col xs={12} md={6} lg={4} xl={3} style={{ marginBottom: "20px" }}>
      <Card style={{ marginBottom: "20px", height: "100%" }}>
        <Card.Img
          variant="top"
          src={image_path}
          alt={name}
          style={{ objectFit: "cover", height: "200px" }}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text style={{color: "green"}}>ราคา: {price} ฿</Card.Text>
          <Card.Subtitle>หมวดหมู่: {category}</Card.Subtitle>
          <div className="d-flex justify-content-around mt-3">
            <Button variant="primary" onClick={() => onEdit(id)}>
              แก้ไข
            </Button>{" "}
            <Button variant="danger" onClick={() => onDelete(id)}>
              ลบ
            </Button>
          </div>
        </Card.Body>
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
