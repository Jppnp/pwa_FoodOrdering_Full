import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Tab } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Menus() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const menuItems = [
    {
      id: 1,
      name: "Spaghetti Carbonara!",
      description: "Spaghetti with bacon, eggs, and Parmesan cheese",
      price: 12.99,
      image: require("../assets/profile.webp"),
      category: "food",
    },
    {
      id: 2,
      name: "Grilled Salmon",
      description:
        "Grilled salmon with lemon butter sauce and roasted vegetables",
      price: 18.99,
      image: require("../assets/food.webp"),
      category: "food",
    },
    {
      id: 3,
      name: "New York Cheesecake",
      description:
        "Creamy cheesecake with graham cracker crust and raspberry sauce",
      price: 7.99,
      image: require("../assets/food.webp"),
      category: "food",
    },
    {
      id: 4,
      name: "Lemon Soda",
      description: "Lemon with soda and sugar",
      price: 1.24,
      image: require("../assets/food.webp"),
      category: "drink",
    },
  ];

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];
  console.log(categories);

  const handleTabChange = (e, { activeIndex }) => {
    setActiveCategory(categories[activeIndex]);
  };

  const fileredMenu = menuItems.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      <div className="d-flex justify-content-center">
        <InputGroup
          className="mb-3 justify-content-center"
          style={{ width: "300px" }}
        >
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="🔍 Search for a restaurant"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </div>
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={categories.map((category) => ({
          menuItem: category.charAt(0).toUpperCase() + category.slice(1),
          render: () => (
            <Tab.Pane style={{ border: "0" }}>
              <Row>
                {menuItems
                  .filter((item) =>
                    searchTerm === ""
                      ? category !== "All"
                        ? item.category === category
                        : {}
                      : { fileredMenu }
                  )
                  .map((item) => (
                    <Col key={item.id} xs={12} md={6}>
                      <Link
                        to={"/order"}
                        state={{ selectedMenu: item }}
                        style={{ color: "#000" }}
                      >
                        <Card
                          style={{
                            marginBottom: "20px",
                            justifyContent: "space-between",
                            overflow: "hidden",
                          }}
                        >
                          <Row noGutters>
                            <Col
                              xs={4}
                              md={4}
                              style={{ padding: "20px 10px 20px 25px" }}
                            >
                              <Card.Img
                                src={item.image}
                                alt={item.name}
                                style={{ width: "130px", height: "100px" }}
                              />
                            </Col>
                            <Col xs={8} md={8}>
                              <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <Card.Text>${item.price}</Card.Text>
                              </Card.Body>
                            </Col>
                          </Row>
                        </Card>
                      </Link>
                    </Col>
                  ))}
              </Row>
            </Tab.Pane>
          ),
        }))}
        activeIndex={categories.findIndex(
          (category) => category === activeCategory
        )}
        onTabChange={handleTabChange}
      />
    </Container>
  );
}
