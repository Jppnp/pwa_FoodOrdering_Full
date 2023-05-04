import React, { useState } from "react";
import { Card, InputGroup, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const RestaurantList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const restaurants = [
    {
      id: 1,
      name: "Italiano Pizzeria",
      address: "123 Main St",
      distance: 2.5,
    },
    {
      id: 2,
      name: "Mama Mia Restaurant",
      address: "456 Elm St",
      distance: 3.2,
    },
    {
      id: 3,
      name: "Thai Garden",
      address: "789 Oak St",
      distance: 4.1,
    },
  ];

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
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
      <div className="d-flex flex-wrap justify-content-center">
        {filteredRestaurants.map((restaurant) => (
          <Link
            to={`/menu`}
            key={restaurant.id}
            style={{ color: "#000" }}
          >
            {/* <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} style={{color: '#000'}}></Link> */}
            <Card style={{ width: "18rem", margin: "1rem" }}>
              <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>{restaurant.address}</Card.Text>
                <Card.Subtitle>
                  Distance: {restaurant.distance} km
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
