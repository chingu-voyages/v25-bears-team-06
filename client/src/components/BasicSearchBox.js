import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
// TODO import { useState } again - cant save when not using.
// Replaced material-ui IconButton and InputBase - not functioning like normal input and btn

// searchbar styling
const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "1rem",
    paddingRight: "1rem",
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

// Basic Search
const BasicSearchBox = () => {
  const classes = useStyles();
  //   const { history } = props;
  //   const [userInput, setUserInput] = useState({});
  //   const [filter, setFilter] = useState("");

  //   // handle user input
  //    const handleSearchChange = (e) => {
  //     setFilter(e.target.value);
  //   };

  return (
    <div>
      <div className={classes.searchContainer}>
        <SearchIcon className={classes.searchIcon} />

        {/* eslint-disable-next-line react/jsx-no-undef */}
        <TextField
          className={classes.searchInput}
          //   onChange={handleSearchChange}
          label="Search our database"
          variant="standard"
        />
      </div>
    </div>
  );
};

export default BasicSearchBox;
