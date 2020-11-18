/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import UploadBookCard from "../components/UploadBookCard";

// searchbar styling
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: "1rem",
  },
  searchContainer: {
    display: "flex",
    // backgroundColor: fade(theme.palette.common.white, 0.15),
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

const UploadBook = () => {
  const classes = useStyles();

  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState({ items: [] });

  // set user input
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSearchInput(newValue);
  };

  const handleClick = async () => {
    const result = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`,
    );
    setBooks(result.data);
  };

  const allAuthors = (authors) => {
    if (authors.length <= 2) {
      authors = authors.join(" and ");
    } else if (authors.length > 2) {
      const lastAuthor = ` and ${authors.slice(-1)}`;
      authors.pop();
      authors = authors.join(", ");
      authors += lastAuthor;
    }
    return authors;
  };

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
              value={searchInput}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" onClick={handleClick}>
              <SearchIcon className={classes.searchIcon} />
            </Button>
          </div>
        </div>
        {/* Display search results  */}
        {books.items.map((book) => {
          return (
            <UploadBookCard
              thumbnail={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
              title={book.volumeInfo.title}
              author={allAuthors(book.volumeInfo.authors)}
              rating={book.volumeInfo.averageRating}
              language={book.volumeInfo.language}
            />
          );
        })}
        {/* upload book button  */}
        <Button variant="contained" color="secondary">
          {" "}
          Upload
        </Button>
      </Grid>
    </div>
  );
};

export default UploadBook;
