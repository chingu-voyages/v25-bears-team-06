import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Pagination from "../components/Pagination";
import UploadBookCard from "../components/UploadBookCard";
import uploadBookRequest from "../dataservice/uploadBookRequest";
import { AuthContext } from "../Context";

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
  searchInput: {
    width: "30rem",
    margin: "0.4rem",
  },
  resultsCount: {
    color: "gray",
    marginLeft: "-19rem",
  },
}));

const UploadLiveSearchPage = () => {
  const classes = useStyles();
  // auth state
  // assuming user is user logged in?
  const auth = useContext(AuthContext);

  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const apiKey = process.env.REACT_APP_API_KEY;

  const numberofbooks = books.length;
  // set user input
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSearchInput(newValue);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${apiKey}&maxResults=40`,
      );
      setBooks(result.data.items);
    };
    fetchBooks();
  }, [apiKey, searchInput]);

  // Get currents books - for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // display all authors from api response array
  const allAuthors = (namesArr) => {
    let authors = namesArr;
    if (authors == null) {
      authors = "No author listed";
    } else if (authors.length > 0 && authors.length <= 2) {
      authors = authors.join(" and ");
    } else if (authors.length > 2) {
      const lastAuthor = `, and ${authors.slice(-1)}`;
      authors.pop();
      authors = authors.join(", ");
      authors += lastAuthor;
    }
    return authors;
  };

  const uploadBook = async (bookIndex) => {
    const selectedBook = currentBooks[bookIndex];

    const googleId = selectedBook.id;
    const {
      title,
      authors,
      description,
      categories,
      pageCount,
      publishedDate,
      publisher,
    } = selectedBook.volumeInfo;

    const formattedAuthors = allAuthors(authors);

    try {
      const { addBook, message } = await uploadBookRequest(
        {
          googleId,
          title,
          authors: formattedAuthors,
          description,
          categories,
          pageCount,
          publishedDate,
          publisher,
        },
        auth.user.token,
      );

      // redirect to user's inventory page
    } catch (err) {
      return false;
    }
    return true;
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              variant="filled"
              label="Start typing to find the book you wish to upload"
              value={searchInput}
              onChange={handleChange}
            />
          </div>
        </div>
        <small className={classes.resultsCount}>
          Showing {indexOfFirstBook}-{indexOfLastBook} of {numberofbooks}{" "}
          results
        </small>
        {/* Display search results  */}
        {currentBooks.map((book, index) => {
          return (
            <UploadBookCard
              key={book.id}
              thumbnail={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
              title={book.volumeInfo.title}
              author={allAuthors(book.volumeInfo.authors)}
              publishedDate={book.volumeInfo.publishedDate}
              uploadBook={() => uploadBook(index)}
            />
          );
        })}
        {/* Display pagination  */}
        <Pagination
          booksPerPage={booksPerPage}
          totalBooks={books.length}
          paginate={paginate}
        />
      </Grid>
    </div>
  );
};

export default UploadLiveSearchPage;
