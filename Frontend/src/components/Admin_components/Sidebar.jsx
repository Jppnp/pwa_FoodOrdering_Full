import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
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
          <MenuItem icon={<ManageAccountsIcon />}>Manage Merchant</MenuItem>
          <MenuItem icon={<StoreIcon />}>Manage Restaurant</MenuItem>
          <MenuItem icon={<LogoutOutlinedIcon />} onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
