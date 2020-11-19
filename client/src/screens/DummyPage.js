/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Pagination from "../components/Pagination";
// import UploadBookCard from "../components/UploadBookCard";

// searchbar styling
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: "1rem",
  },
  searchContainer: {
    display: "flex",
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
    width: "30rem",
    margin: "0.4rem",
  },
}));

const DummyWithApiKey = () => {
  const classes = useStyles();

  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState([]);

  // Brad's stuff for pagination
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(4);

  const apiKey = "AIzaSyBYQsJshapxdYzybuciNuBb8jJf9mOV5ZA";

  function handleChange(event) {
    const newValue = event.target.value;
    setSearchInput(newValue);
  }

  const handleSubmit = async () => {
    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${apiKey}&maxResults=40`,
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  };

  // Get currents books - for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = result.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center">
        <h1>Upload New Book</h1>
        <h3>
          To upload a book to your inventory, enter the title below to search
          for a book that matches.
        </h3>
        {/* Search input area  */}
        <div>
          <div className={classes.searchContainer}>
            <TextField
              className={classes.searchInput}
              label="Find and select the book you wish to upload"
              variant="standard"
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              <SearchIcon className={classes.searchIcon} />
            </Button>
          </div>
        </div>
        {/* Display search results  */}
        {currentBooks.map((boek) => (
          <img src={boek.volumeInfo.imageLinks.thumbnail} alt={boek.title} />
        ))}
        {/* upload book button  */}
        <Button variant="contained" color="secondary">
          {" "}
          Upload
        </Button>
        <Pagination booksPerPage={booksPerPage} totalBooks={result.length} />
      </Grid>
    </div>
  );
};

export default DummyWithApiKey;
