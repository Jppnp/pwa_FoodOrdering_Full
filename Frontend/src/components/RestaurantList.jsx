import React, { useEffect, useState } from "react";
import { Card, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { api, isOnline } from "../utils/UserControl";

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

const RestaurantCard = ({ restaurant }) => {
  const { id, name, address, restaurant_id, lat, lng } = restaurant;
  const [mainRestaurant, setMainRestaurant] = useState([]);
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/restaurants/${restaurant_id}`);
        const restaurantData = response.data;

        setMainRestaurant(restaurantData);

        const hasData =
          JSON.parse(localStorage.getItem("RestaurantList")) || [];
        const updatedData = {
          rid: restaurant_id,
          name: restaurantData.name,
        };

        const foundedIndex = hasData.findIndex(
          (item) => item.rid === restaurant_id
        );
        if (foundedIndex !== -1) {
          hasData.splice(foundedIndex, 1);
        }

        hasData.push(updatedData);
        localStorage.setItem("RestaurantList", JSON.stringify(hasData));
      } catch (error) {
        console.log(`Error while fetching main restaurant: ${error}`);

        if (!isOnline) {
          const data = JSON.parse(localStorage.getItem("RestaurantList"));
          const foundRestaurant = data.find(
            (item) => item.rid === restaurant_id
          );
          setMainRestaurant(foundRestaurant);
        }
      }
    };

    fetchData();

    // Get the current location using Geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const distance = calculateDistance(latitude, longitude, lat, lng);
          setDistance(distance.toFixed(2)); // Round to 2 decimal places
        },
        (error) => {
          setError(error.message); // Set the error message
          if (error.code === error.PERMISSION_DENIED) {
            alert("Please allow geolocation to calculate the distance.");
          }
        }
      );
    } else {
      console.log("Geolocation is not supported");
    }
  }, [restaurant_id, lat, lng]);

  return (
    <Link to={`/client/menus/${id}`} style={{ color: "#000" }}>
      <Card style={{ width: "18rem", margin: "1rem" }}>
        <Card.Body>
          <Card.Title>
            {mainRestaurant.name} <br />{" "}
            <span style={{ color: "#004d39" }}>สาขา {name}</span>
          </Card.Title>
          <Card.Text>{address}</Card.Text>
          {error ? (
            <Card.Subtitle>Error retrieving distance</Card.Subtitle>
          ) : (
            <Card.Subtitle>
              {distance ? distance + " km" : "Calculating..."}
            </Card.Subtitle>
          )}
        </Card.Body>
      </Card>
    </Link>
  );
};

const RestaurantList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get("restaurant/locations");
        const data = response.data;

        setRestaurants(data);
        localStorage.setItem("restaurants", JSON.stringify(data));
      } catch (err) {
        console.log(`Error get restaurant: ${err}`);

        if (!isOnline) {
          const data = JSON.parse(localStorage.getItem("restaurants"));
          setRestaurants(data);
        }
      }
    };

    if (!isOnline) {
      const data = JSON.parse(localStorage.getItem("restaurants"));
      setRestaurants(data);
    } else {
      fetchRestaurants();
    }
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
