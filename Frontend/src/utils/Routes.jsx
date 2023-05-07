import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../components/Home";
import PrivateRoute from "./PrivateRoute";
import Header2 from "../components/Header2";
import RestaurantList from "../components/RestaurantList";
import Menus from "../components/Menus";
import OrderForm from "../components/OrderForm";
import Cart from "../components/Cart";
import OrderHistory from "../components/OrderHistory";
import Notification from "../components/Notification";

export default function AppRoutes() {
  const location = useLocation();
  const shouldShowHeader = location.pathname !== "/login";

  return (
    <div>
      {shouldShowHeader && <Header2 />}
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} exact />
          <Route path="/menu" element={<Menus />} exact />
          <Route path="/restaurants" element={<RestaurantList />} exact />
          <Route path="/order" element={<OrderForm />} exact />
          <Route path="/cart" element={<Cart />} exact />
          <Route path="/history" element={<OrderHistory />} exact />
          <Route path="/notification" element={<Notification />} exact />
        </Route>
      </Routes>
    </div>
  );
}
