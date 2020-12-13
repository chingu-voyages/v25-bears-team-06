import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SearchContext } from "../../Context";

// searchbar styling
const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    paddingLeft: "1rem",
    marginTop: "0.4rem",
    marginBottom: "0.4rem",
  },
  searchBtn: {
    backgroundColor: theme.palette.primary.dark,
    height: "3.4rem",
    padding: "0.3rem",
    [theme.breakpoints.down("xs")]: {
      height: "3rem",
      padding: "0.1rem",
    },
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    "&:hover": {
      backgroundColor: theme.palette.primary.darker,
    },
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
    color: "#fff",
  },
  searchInput: {
    width: "12rem",
    height: "3.4rem",
    [theme.breakpoints.down("xs")]: {
      height: "3rem",
    },
    backgroundColor: "white",
    borderTopLeftRadius: 5,
  },
}));

const HeaderSearchBox = () => {
  const classes = useStyles();
  const history = useHistory();

  // This value is passed to search results page.
  const { setQuery } = useContext(SearchContext);

  const [input, setInput] = useState("");

  const handleSearchChange = (event) => {
    setInput(event.target.value);
  };

  // HANDLE SEARCH BUTTON CLICK FUNCTION
  const handleClick = () => {
    setQuery(input);

    // redirect to search results page. Must push onto history stack for "back" to work correctly
    if (input.length > 0) {
      if (history.location.pathname !== "/searchresults") {
        history.push("/searchresults");
      }
    }
  };

  const onEnter = (event) => {
    if (event.charCode === 13) {
      handleClick();
    }
  };

  return (
    <div>
      <div className={classes.searchContainer}>
        <TextField
          className={classes.searchInput}
          label="Search our database"
          variant="filled"
          onChange={handleSearchChange}
          value={input}
          color="primary"
          onKeyPress={onEnter}
        />
        <Button
          onClick={handleClick}
          variant="contained"
          className={classes.searchBtn}
          disableElevation
        >
          <SearchIcon className={classes.searchIcon} />
        </Button>
      </div>
    </div>
  );
};

export default HeaderSearchBox;
