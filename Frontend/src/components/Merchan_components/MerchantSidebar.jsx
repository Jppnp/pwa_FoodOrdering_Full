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
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { merchantLogout } from "../../utils/UserControl";

export default function MerchantSidebar() {
  const navigate = useNavigate();
  const { collapseSidebar } = useProSidebar();
  const [showCollapsed, setShowCollapsed] = useState(false);

  const restaurant = JSON.parse(localStorage.getItem("restaurant"))

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
    merchantLogout()
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
            <h2>{restaurant.name}</h2>
          </MenuItem>
          <MenuItem icon={<DashboardIcon />} component={<Link to="/admin" />}>
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<FastfoodIcon />}
            component={<Link to="/merchant/foods" />}
          >
            Foods
          </MenuItem>
          <SubMenu icon={<StoreIcon />} label="Orders">
            <MenuItem
              icon={<NotificationsActiveIcon />}
              component={<Link to="/merchant/order-now" />}
            >
              Ordering now
            </MenuItem>
            <MenuItem
              icon={<NotificationsNoneIcon />}
              component={<Link to="/merchant/orders" />}
            >
              All orders
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
