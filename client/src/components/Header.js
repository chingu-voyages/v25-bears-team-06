import React, { useContext, useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Button,
  Tabs,
  Tab,
  useMediaQuery,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core/";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
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
    height: "25px",
    padding: "0.2rem",
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
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

  const auth = useContext(AuthContext);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // keep active tab highlighted on refresh

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (
      (window.location.pathname === "/signup" && value !== 1) ||
      (window.location.pathname === "/dashboard" && value !== 1)
    ) {
      setValue(1);
    } else if (window.location.pathname === "/login" && value !== 2) {
      setValue(2);
    }
  }, [value]);

  // is user logged in?
  const loggedIn = auth && auth.user && auth.user.token;

  // responsiveness variables
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const lessSmScreenSize = useMediaQuery(theme.breakpoints.down("sm"));
  const largerSmScreenSize = useMediaQuery(theme.breakpoints.up("sm"));
  const [openDrawer, setOpenDrawer] = useState(false);

  // desktop menu tabs
  const tabs = (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        <Tab className={classes.tab} component={Link} to="/" label="About" />
        {loggedIn ? (
          <Tab
            className={classes.tab}
            component={Link}
            to="/dashboard"
            display="inline"
            label="Dashboard"
          />
        ) : (
          <Tab
            className={classes.tab}
            component={Link}
            to="/signup"
            label="Sign Up"
          />
        )}

        {loggedIn ? (
          <Tab
            className={classes.tab}
            component={Link}
            to="/"
            onClick={() => auth.logout()}
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

  // mobile drawer tabs
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
              About
            </ListItemText>{" "}
          </ListItem>
          {loggedIn ? (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
                setValue(1);
              }}
              divider
              button
              component={Link}
              to="/dashboard"
              selected={value === 1}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                Dashboard
              </ListItemText>{" "}
            </ListItem>
          ) : (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
                setValue(1);
              }}
              divider
              button
              component={Link}
              to="/signup"
              selected={value === 1}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                SignUp
              </ListItemText>{" "}
            </ListItem>
          )}
          {loggedIn ? (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
                setValue(0);
                auth.logout();
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
                setValue(2);
              }}
              button
              component={Link}
              to="/login"
              selected={value === 2}
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
          {largerSmScreenSize && (
            <Button
              component={Link}
              to={loggedIn ? "/dashboard" : "/"}
              className={classes.logoContainer}
              onClick={() => setValue(0)}
            >
              <img
                src="/images/openshelf2_1.png"
                alt="shelf Logo"
                className={classes.title}
              />
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
