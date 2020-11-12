import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link, Route } from "react-router-dom";
// import basic search box
import BasicSearchBox from "./BasicSearchBox";

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    padding: 0,
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <header>
        <AppBar position="static">
          <Toolbar>
            <Button component={Link} to="/" className={classes.logoContainer}>
              <Typography className={classes.title} variant="h6" noWrap>
                CommunityBooks
              </Typography>
            </Button>
            <Route render={() => <BasicSearchBox />} />
            <Tabs className={classes.tabContainer}>
              <Tab
                className={classes.tab}
                component={Link}
                to="/about"
                label="About"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/signup"
                label="Sign Up"
              />
              <Tab
                className={classes.tab}
                component={Link}
                to="/login"
                label="Login"
              />
            </Tabs>
          </Toolbar>
        </AppBar>
      </header>
    </div>
  );
};

export default Header;
