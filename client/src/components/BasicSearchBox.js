import React, { useState, useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SearchContext } from "../SearchContext";

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

  // This value is passed to search results page. Not declaring value before setValue as not needed here.
  const { setValue } = useContext(SearchContext);

  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchInput(newValue);
  };

  // HANDLE SEARCH BUTTON CLICK FUNCTION
  const handleClick = () => {
    setValue(searchInput);
    // clear the text in the inputfield after clicking search btn
    setSearchInput("");
    // redirect to search results page. Must push onto history stack for "back" to work correctly
    if (searchInput.length > 0) {
      history.push("/basicsearch");
    } else {
      // eslint-disable-next-line no-alert
      alert("Please specify what book you are looking for!");
    }
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
      </div>
    </div>
  );
};

export default BasicSearchBox;
