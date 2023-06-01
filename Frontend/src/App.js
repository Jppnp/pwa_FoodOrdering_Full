import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import { ClientRoutes, AdminRoutes, MerchantRoutes } from "./utils/Routes";
import NotFound from "./components/Notfound";
import RegistrationForm from "./components/Resgister";
// Merchan Component
import LoginMerchant from "./components/Merchan_components/LonginMerchant";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/client/*" element={<ClientRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/merchant/*" element={<MerchantRoutes />} />
        <Route index element={<Navigate to="/login" />} />
        <Route path="/login-merchant" element={<LoginMerchant />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
