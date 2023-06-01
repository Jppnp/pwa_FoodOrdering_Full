import React, { useEffect, useState } from "react";
import { Card, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { api, isOnline } from "../utils/UserControl";

const RestaurantCard = ({ restaurant }) => {
  const { id, name, address, restaurant_id } = restaurant;

  const [mainRestaurant, setMainRestaurant] = useState([]);
  useEffect(() => {
    api
      .get(`/restaurants/${restaurant_id}`)
      .then((res) => {
        setMainRestaurant(res.data);
        const hasData =
          JSON.parse(localStorage.getItem("restaurantList")) || [];
        const updataData = {
          rid: restaurant_id,
          name: mainRestaurant.name,
        };
        if (hasData) {
          const founded = hasData.filter((item) => item.rid === restaurant_id);
          if (founded) {
            const filterData = hasData.filter(
              (item) => item.rid !== founded.rid
            );
            filterData.push(updataData);
            localStorage.setItem("restaurantList", JSON.stringify(filterData));
          } else {
            hasData.push(updataData);
            localStorage.setItem("restaurantList", JSON.stringify(hasData));
          }
        } else {
          hasData.push(updataData);
          localStorage.setItem("restaurantList", JSON.stringify(hasData));
        }
      })
      .catch((err) => {
        console.log(`error while get main restaurant ${err}`);
        if (!isOnline) {
          let data = JSON.parse(localStorage.getItem("restaurantList"));
          data.filter((item) => item.rid === restaurant_id);
          setMainRestaurant(data);
        }
      });
  }, [restaurant_id]);

  return (
    <Link to={`/client/menus/${id}`} style={{ color: "#000" }}>
      <Card style={{ width: "18rem", margin: "1rem" }}>
        <Card.Body>
          <Card.Title>
            {mainRestaurant.name} <br />{" "}
            <span style={{ color: "#004d39" }}>สาขา {name}</span>
          </Card.Title>
          <Card.Text>{address}</Card.Text>
          <Card.Subtitle>Distance: km</Card.Subtitle>
        </Card.Body>
      </Card>
    </Link>
  );
};

const RestaurantList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    api
      .get("restaurant/locations")
      .then((res) => {
        setRestaurants(res.data);
        localStorage.setItem("restaurants", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(`Error get restaurant: ${err}`);
        if (!isOnline) {
          let data = JSON.parse(localStorage.getItem("restaurants"));
          setRestaurants(data);
        }
      });
  }, []);

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
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
