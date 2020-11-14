import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// import BasicSearchResultsPage from "../screens/BasicSearchResultsPage";

// searchbar styling
const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "1rem",
    marginTop: "0.4rem",
    marginBottom: "0.4rem",
    marginLeft: "1rem",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "12rem",
    margin: "0.4rem",
  },
}));

// Basic Search Box

const BasicSearchBox = () => {
  const classes = useStyles();
  const history = useHistory();

  const [searchInput, setSearchInput] = useState("");
  // TODO 1of2 showing until find a way to export into searchResultsPage function.
  const [show, setShow] = useState("");

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchInput(newValue);
  };

  // HANDLE SEARCH BUTTON CLICK FUNCTION
  const handleClick = () => {
    // TODO 2of2 have now captured user input, how to export without using it as a prop because we dont want to display the physical searchbox in the results page
    setShow(searchInput);
    // clear the text in the inputfield after clicking search btn
    setSearchInput("");
    // redirect to search results page. Must push onto history stack for "back" to work correctly
    history.push("/basicsearch");
  };

  return (
    <div>
      <div className={classes.searchContainer}>
        <TextField
          className={classes.searchInput}
          label="Search our database"
          variant="standard"
          onChange={handleSearchChange}
          value={searchInput}
        />
        <Button onClick={handleClick} variant="contained" color="primary">
          <SearchIcon className={classes.searchIcon} />
        </Button>
        {/* DELETE this below when solution found */}
        <small>{show}</small>
      </div>
    </div>
  );
};

export default BasicSearchBox;
