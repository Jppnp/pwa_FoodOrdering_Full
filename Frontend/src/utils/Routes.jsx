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
import AdminDashboard from "../components/Admin_components/Dashboard";
import NotFound from "../components/Notfound";
import AdminSidebar from "../components/Admin_components/Sidebar";

export function ClientRoutes() {
  const location = useLocation();
  const shouldShowHeader = location.pathname !== "/login";

  return (
    <div>
      {shouldShowHeader && <Header2 />}
      <Routes>
        <Route element={<PrivateRoute role="client" />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menus />} />
          <Route path="restaurants" element={<RestaurantList />} />
          <Route path="menu/:id" element={<OrderForm />} />
          <Route path="cart" element={<Cart />} />
          <Route path="history" element={<OrderHistory />} />
          <Route path="notification" element={<Notification />} />
          <Route path="*" element-={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export function AdminRoutes() {
  return (
    <div>
      <AdminSidebar />
      <div style={{ marginLeft: "10vh" }}>
        <Routes>
          <Route element={<PrivateRoute role="admin" />}>
            <Route index element={<AdminDashboard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
