import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import StoreIcon from "@mui/icons-material/Store";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function AdminSidebar() {
  const { collapseSidebar } = useProSidebar();
  return (
    <div style={{ height: "100vh", display: "flex" }}>
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
        </Menu>
      </Sidebar>
    </div>
  );
}
