import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import ShowUsers from "./components/ShowUsers";
import AddUser from "./components/AddUser";
import Update from "./components/Update";
import LocationMap from "./components/LocationMap";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<ShowUsers />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/update" element={<Update />} />
          <Route path="/map" element={<LocationMap />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
