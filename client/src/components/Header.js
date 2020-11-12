import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
// imports for basic search 1
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import dummyData from "../dummyData";
// end of basic search imports 1

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    padding: 0,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  // styles for the search result output 2
  root: {
    flexGrow: 1,
    margin: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    // color: theme.palette.text.secondary,
  },
  // end of styles for search result output 2
}));

const Header = () => {
  const classes = useStyles();
  // basic search function
  //   const [filter, setFilter] = useState("");

  //   const handleSearchChange = (event) => {
  //     setFilter(event.target.value);
  //   };
  // end of basic search function

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

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <IconButton className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </div>
              <InputBase
                // onChange={handleSearchChange}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
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
      <h1>basic search results function in Header component</h1>
      <p>how to show on a different page?</p>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justify="flex-start"
      >
        {dummyData.map((book) => (
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              dummyData[book].name.includes(filter) &&
              <h3>{book.name}</h3>
              <p>{book.author}</p>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <p>returning a p below the header </p>
    </div>
  );
};

export default Header;
