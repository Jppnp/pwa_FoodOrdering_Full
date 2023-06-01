import React from "react";
import { Routes, Route } from "react-router-dom";
// Client Component
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
import OrderNow from "../components/Merchan_components/OrderNow";
import { api, isOnline } from "./UserControl";

export function ClientRoutes() {

  function handleOnlineEvent() {
    const storeRequest = JSON.parse(localStorage.getItem("offlineReqeust")) || [];
    if (storeRequest) {
      api
        .post(storeRequest.path, storeRequest.data)
        .then((res) => {
          alert(`Auto syncronized: ${res.data}`);
        })
        .catch((err) => {
          alert(`can not auto syncronize: ${err}`);
        });
    }
  }

  window.addEventListener("online", handleOnlineEvent);
  return (
    <div>
      <div>
        {!isOnline ? (
          <div class="alert alert-warning" role="alert">
            {" "}
            อยู่ในโหมด ออฟไลน์
          </div>
        ) : null}
      </div>
      <Header2 />
      <Routes>
        <Route element={<PrivateRoute role="client" />}>
          <Route index element={<RestaurantList />} />
          <Route path="menus/:rid" element={<Menus />} />
          <Route path="menus/:rid/:id" element={<OrderForm />} />
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
  const location = JSON.parse(localStorage.getItem("restaurant"));
  const socket = new WebSocket(
    `ws://localhost:8080/ws?restaurant_location_id=${location.id}`
  );

  socket.addEventListener("open", () => {
    console.log("WebSocket connection opened");
  });

  socket.addEventListener("message", (event) => {
    console.log("Received message from server:", event.data);
    // Assuming you have a reference to the service worker registration
    const serviceWorker = navigator.serviceWorker.controller;
    if (serviceWorker) {
      const message = "New order notification";
      const path = "/merchant/order-now"; // Customize the path here
      const notificationData = { message, path };
      serviceWorker.postMessage(notificationData);
    }
  });

  // Add event listener for custom event
  window.addEventListener("logout", () => {
    socket.close();
  });

  socket.addEventListener("close", () => {
    console.log("WebSocket connection closed");
  });

  window.addEventListener("beforeunload", () => {
    socket.close();
  });

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
              <Route path="order-now" element={<OrderNow />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
