import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Tab } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { api } from "../utils/UserControl";

export default function Menus() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  const { rid } = useParams();

  useEffect(() => {
    api.get(`menus/location/${rid}`).then((res) => {
      setMenuItems(res.data)
    }).catch(err => {
      console.log(`error get menu: ${err}`)
    })
  }, [rid]);

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];

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
                        to={`/client/menus/${rid}/${item.id}`}
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
                          <Row>
                            <Col
                              xs={4}
                              md={4}
                              style={{ padding: "20px 10px 20px 25px" }}
                            >
                              <Card.Img
                                src={item.image_path}
                                alt={item.name}
                                style={{ width: "130px", height: "100px" }}
                              />
                            </Col>
                            <Col xs={8} md={8}>
                              <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <Card.Text>{item.price} ฿</Card.Text>
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
