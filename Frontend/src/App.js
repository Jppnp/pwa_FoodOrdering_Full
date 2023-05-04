import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
// import Header from "./components/Header";
// import ShowUsers from "./components/ShowUsers";
// import AddUser from "./components/AddUser";
// import Update from "./components/Update";
// import LocationMap from "./components/LocationMap";
// import Login from "./components/Login";
import Header2 from "./components/Header2";
import RestaurantList from "./components/RestaurantList";
import Menus from "./components/Menus";
import OrderForm from "./components/OrderForm";
import Cart from "./components/Cart";
import OrderHistory from "./components/OrderHistory";

function App() {
  console.warn("Hello");
  console.log("InnerWidth:" + window.innerWidth);
  return (
    <BrowserRouter>
      <div>
        <Header2 />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menus />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/history" element={<OrderHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
