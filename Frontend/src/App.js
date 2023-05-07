import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AppRoutes from "./utils/Routes";
// Merchan Component

function App() {
  return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
