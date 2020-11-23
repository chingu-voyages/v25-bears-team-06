import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SearchContext } from "../Context";

// searchbar styling
const useStyles = makeStyles(() => ({
  searchContainer: {
    display: "flex",
    paddingLeft: "1rem",
    marginTop: "0.4rem",
    marginBottom: "0.4rem",
    marginLeft: "1rem",
  },
  searchBtn: {
    height: "3.4rem",
    padding: "0.3rem",
    marginTop: "0.4rem",
    marginLeft: "-0.5rem",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "12rem",
    height: "3.4rem",
    margin: "0.4rem",
    backgroundColor: "white",
    borderTopLeftRadius: 5,
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
          variant="filled"
          onChange={handleSearchChange}
          value={searchInput}
          color="primary"
        />
        <Button
          onClick={handleClick}
          variant="contained"
          className={classes.searchBtn}
          color="secondary"
          disableElevation
        >
          <SearchIcon className={classes.searchIcon} />
        </Button>
      </div>
    </div>
  );
};

export default BasicSearchBox;
