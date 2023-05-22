import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// Client Component
import Home from "../components/Home";
import PrivateRoute from "./PrivateRoute";
import Header2 from "../components/Header2";
import RestaurantList from "../components/RestaurantList";
import Menus from "../components/Menus";
import OrderForm from "../components/OrderForm";
import Cart from "../components/Cart";
import OrderHistory from "../components/OrderHistory";
import Notification from "../components/Notification";
import NotFound from "../components/Notfound";
// Admin Component
import AdminDashboard from "../components/Admin_components/Dashboard";
import AdminSidebar from "../components/Admin_components/Sidebar";
import AddRestaurant from "../components/Admin_components/AddRestaurant";
import AddMerchant from "../components/Admin_components/AddMerchant";
import MerchantList from "../components/Admin_components/EmployeeList";
import ShowRestaurantList from "../components/Admin_components/ShowRestaurantList";
import AddNewRestaurant from "../components/Admin_components/AddNewRestaurant";
import AddRestaurantBranch from "../components/Admin_components/AddRestaurantBranch";
import ShowBranchList from "../components/Admin_components/ShowBranchList";
// Merchant component
import MerchantSidebar from "../components/Merchan_components/MerchantSidebar";
import MerchantDashboard from "../components/Merchan_components/Dashboard";
import MenuList from "../components/Merchan_components/ShowMenus";
import AddMenu from "../components/Merchan_components/AddMenu";

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
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <AdminSidebar />
        </div>
        <div style={{ flex: "5", margin: "1rem" }}>
          <Routes>
            <Route element={<PrivateRoute role="admin" />}>
              <Route index element={<AdminDashboard />} />
              <Route path="add-restaurant" element={<AddNewRestaurant />} />
              <Route path="add-merchant" element={<AddMerchant />} />
              <Route path="merchants" element={<MerchantList />} />
              <Route path="restaurant-list" element={<ShowRestaurantList />} />
              <Route path="restaurant/:id" element={<AddRestaurant />} />
              <Route
                path="restaurant/add-location/:restaurantId/:restaurantName"
                element={<AddRestaurantBranch />}
              />
              <Route
                path="restaurant/locations/:restaurantId/:restaurantName"
                element={<ShowBranchList />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export function MerchantRoutes() {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <MerchantSidebar />
        </div>
        <div style={{ flex: "5", margin: "1rem" }}>
          <Routes>
            <Route element={<PrivateRoute role="merchant" />}>
              <Route index element={<MerchantDashboard />} />
              <Route path="foods" element={<MenuList />} />
              <Route path="foods/add" element={<AddMenu />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
