import React, { useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link, Route } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import search box component
import HeaderSearchBox from "./HeaderSearchBox";
import { AuthContext } from "../Context";

// Styling for heading component
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
      [theme.breakpoints.down("xs")]: {
        marginBottom: "1.25em",
        paddingLeft: 0,
      },
    },
  },
  logoContainer: {
    marginRight: "auto",
    [theme.breakpoints.down("xs")]: {
      margin: 0,
      padding: 0,
      minWidth: 30,
    },
  },
  logoIcon: {
    marginRight: 5,
  },
  title: {
    color: "white",
    marginRight: "20",
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  hideHome: {
    display: "none",
  },
  drawerIconContainer: {
    marginLeft: "auto",
  },
  drawerIcon: {
    width: "3rem",
    height: "3rem",
    color: "white",
  },
  drawer: {
    backgroundColor: "#3F51B5",
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "#fff",
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

// Header component
const Header = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  // eslint-disable-next-line no-shadow
  const handleChange = (event, value) => {
    setValue(value);
  };

  // keep active tab highlighted on refresh

  useEffect(() => {
    if (
      (window.location.pathname === "/" && value !== 0) ||
      (window.location.pathname === "/searchresults" && value !== 0)
    ) {
      setValue(0);
    } else if (window.location.pathname === "/about" && value !== 1) {
      setValue(1);
    } else if (
      (window.location.pathname === "/signup" && value !== 2) ||
      (window.location.pathname === "/uploadbook" && value !== 2)
    ) {
      setValue(2);
    } else if (
      (window.location.pathname === "/login" && value !== 3) ||
      (window.location.pathname === "/myinventory" && value !== 3)
    ) {
      setValue(3);
    }
  }, [value]);

  // is user logged in?
  const auth = useContext(AuthContext);
  const loggedIn = auth && auth.user && auth.user.token;

  // clear local storage on logout
  const clearLocalStorage = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
    localStorage.removeItem("userId");
    auth.setUser(null);
  };

  // responsiveness variables
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const lessSmScreenSize = useMediaQuery(theme.breakpoints.down("sm"));
  const lessXsScreenSize = useMediaQuery(theme.breakpoints.up("sm"));
  const [openDrawer, setOpenDrawer] = useState(false);

  // responsiveness menu items
  // desktop menu tabs
  const tabs = (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        <Tab
          className={(classes.tab, classes.hideHome)}
          component={Link}
          to="/"
          label="Home"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/about"
          label="About"
        />
        {loggedIn ? (
          <Tab
            className={classes.tab}
            component={Link}
            to="/uploadbook"
            display="inline"
            label={
              <div>
                <AddBoxIcon style={{ verticalAlign: "middle" }} /> Upload Book{" "}
              </div>
            }
          />
        ) : (
          <Tab
            className={classes.tab}
            component={Link}
            to="/signup"
            label="Sign Up"
          />
        )}

        {loggedIn && (
          <Tab
            className={classes.tab}
            component={Link}
            to="/myinventory"
            label="My Inventory"
          />
        )}

        {loggedIn ? (
          <Tab
            className={classes.tab}
            component={Link}
            to="/"
            onClick={() => {
              clearLocalStorage();
            }}
            label={
              <div>
                <ExitToAppIcon style={{ verticalAlign: "middle" }} /> Logout{" "}
              </div>
            }
          />
        ) : (
          <Tab
            className={classes.tab}
            component={Link}
            to="/login"
            label="Login"
          />
        )}
      </Tabs>
    </>
  );

  // responsiveness mobile drawer
  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        anchor="right"
      >
        <div className={classes.toolbarMargin} />
        <List>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue(0);
            }}
            divider
            button
            component={Link}
            to="/"
            selected={value === 0}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Home
            </ListItemText>{" "}
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue(1);
            }}
            divider
            button
            component={Link}
            to="/about"
            selected={value === 1}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              About
            </ListItemText>{" "}
          </ListItem>
          {loggedIn ? (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
                setValue(2);
              }}
              divider
              button
              component={Link}
              to="/uploadbook"
              selected={value === 2}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                Upload a book
              </ListItemText>{" "}
            </ListItem>
          ) : (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
                setValue(2);
              }}
              divider
              button
              component={Link}
              to="/signup"
              selected={value === 2}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                SignUp
              </ListItemText>{" "}
            </ListItem>
          )}
          {loggedIn && (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
                setValue(3);
              }}
              divider
              button
              component={Link}
              to="/myinventory"
              selected={value === 3}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                My Inventory{" "}
              </ListItemText>{" "}
            </ListItem>
          )}

          {loggedIn ? (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
                setValue(0);
                clearLocalStorage();
              }}
              button
              component={Link}
              to="/"
              selected={value === 0}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                Logout
              </ListItemText>{" "}
            </ListItem>
          ) : (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
                setValue(3);
              }}
              button
              component={Link}
              to="/login"
              selected={value === 3}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                Login
              </ListItemText>{" "}
            </ListItem>
          )}
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <header>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          {lessXsScreenSize && (
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
            >
              <Typography className={classes.title} variant="h6" noWrap>
                <LocalLibraryIcon className={classes.logoIcon} />
                CommunityBooks
              </Typography>
            </Button>
          )}

          <Route
            render={() => <HeaderSearchBox className={classes.searchBox} />}
          />
          {/* check if screensize below md to display tabs or burger */}
          {lessSmScreenSize ? drawer : tabs}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </header>
  );
};

export default Header;
