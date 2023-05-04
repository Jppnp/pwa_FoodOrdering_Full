import React, { useEffect, useState } from "react";
import {
  IconButton,
  Toolbar,
  Typography,
  MenuItem,
  AppBar,
  Button,
  Drawer,
} from "@mui/material";
import makeStyles from "@mui/styled-engine";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";


const headersData = [
  {
    label: "Users",
    href: "/users",
  },
  {
    label: "Add User",
    href: "/add",
  },
  {
    label: "Map",
    href: "/map",
  },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  banner: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  drawerContainer: {
    padding: "20px 30px"  
  }
}));

export default function Newheader() {
  const { header, banner } = useStyles();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  // Title For Header
  const title = (
    <Typography variant="h6" component="h1" className={banner}>
      Food Ordering
    </Typography>
  );

  // Create Buttons
  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: Link,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  // DrawerChoices
  const getDrawerChoices = () => {
    return headersData.map(({label, href}) => {
      return (
        <Link
        {...{
          component: Link,
          to: href,
          color: "ingherit",
          style: { textDecoration: "none" },
          key: label,
        }}
      >
        <MenuItem>{label}</MenuItem>
      </Link>
      )
    })
  };

  // Display For Desktop
  const displayDesktop = () => {
    console.log("Display Desktop")
    return <Toolbar>
      {title}
      {getMenuButtons()}
      </Toolbar>;
  };

  // Display For Mobile
  const displayMobile = () => {
    console.warn(`DrawerStatus:` + drawerOpen)
    console.log("Display Mobile")
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: {drawerOpen},
            onClose: {handleDrawerClose},
          }}
        >
          <div className="DrawerContainer" >{getDrawerChoices()}</div>
        </Drawer>
        <div>{title}</div>
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
