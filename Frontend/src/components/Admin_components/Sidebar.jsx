import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import { useNavigate, Link } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { userLogout } from "../../utils/UserControl";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { collapseSidebar } = useProSidebar();
  const [showCollapsed, setShowCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowCollapsed(window.innerWidth < 992);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  useEffect(() => {
    if (showCollapsed) {
      collapseSidebar();
    }
  }, [showCollapsed, collapseSidebar]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
      }}
    >
      <Sidebar>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Admin</h2>
          </MenuItem>
          <MenuItem icon={<DashboardIcon />} component={<Link to="/admin" />}>
            Dashboard
          </MenuItem>
          <SubMenu icon={<ManageAccountsIcon />} label="Manage Merchant">
            <MenuItem
              icon={<PeopleOutlinedIcon />}
              component={<Link to="/admin/merchants" />}
            >
              Merchants
            </MenuItem>
            <MenuItem
              icon={<PersonAddAltOutlinedIcon />}
              component={<Link to="/admin/add-merchant" />}
            >
              Add Merchant
            </MenuItem>
          </SubMenu>
          <SubMenu icon={<StoreIcon />} label="Manage Restaurant">
            <MenuItem icon={<StoreOutlinedIcon />} component={<Link to="/admin/restaurant-list"/>}>My Restaurants</MenuItem>
            <MenuItem
              icon={<AddBusinessOutlinedIcon />}
              component={<Link to="/admin/add-restaurant" />}
            >
              Add Restuarant
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<LogoutOutlinedIcon />} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
