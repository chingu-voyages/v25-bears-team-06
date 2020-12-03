import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Pagination from "../components/Pagination";
import UploadBookCard from "../components/UploadBookCard";
import uploadBookRequest from "../dataservice/uploadBookRequest";
import { AuthContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1rem",
  },
  pageContainer: {
    maxWidth: 1200,
    margin: "auto",
  },
  searchContainer: {
    [theme.breakpoints.down("xl")]: {
      width: "30rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "20rem",
    },
    marginTop: "0.4rem",
  },
  searchInput: {
    margin: "0.4rem",
    width: "98%",
    marginBottom: "2rem",
  },
  resultsCount: {
    color: "gray",
  },
}));

const UploadBookPage = () => {
  const classes = useStyles();
  // auth state - assuming user is logged in
  const auth = useContext(AuthContext);

  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again later",
  );

  const apiKey = process.env.REACT_APP_API_KEY;

  const numberofbooks = books.length;
  // set user input
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSearchInput(newValue);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${apiKey}&maxResults=40`,
        );
        if (result.status !== 200) {
          setHasError(true);
          if (result.statusText) setErrorMessage(result.statusText);
          return;
        }
        setBooks(result.data.items);
      } catch (err) {
        setHasError(true);
        setErrorMessage(err.message);
      }
    };
    if (apiKey && searchInput.trim())
      fetchBooks().catch((err) => {
        setHasError(true);
        setErrorMessage(err.message);
      });
  }, [apiKey, searchInput]);

  // Get currently displayed books - for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // display all authors from api response array
  const authorsToString = (namesArr) => {
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

    const formattedAuthors = authorsToString(authors);

    try {
      const { message } = await uploadBookRequest(
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

      if (message) {
        setHasError(true);
        setErrorMessage(message);
      }

      // redirect to user's inventory page
    } catch (err) {
      setHasError(true);
      setErrorMessage(err.message);
      return false;
    }
    return true;
  };

  return (
    <div className={classes.root}>
      {hasError && <div className={classes.errorDiv}>{errorMessage}</div>}
      <Grid
        className={classes.pageContainer}
        container
        direction="column"
        alignItems="center"
      >
        <Typography variant="h3" gutterBottom>
          Upload New Book
        </Typography>
        <Typography variant="body1" gutterBottom>
          To upload a book to your inventory, enter the title below to search
          for a book that matches.
        </Typography>

        {/* Search input area  */}
        <Grid item className={classes.searchContainer}>
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
        </Grid>

        <Grid item>
          <Typography variant="subtitle2" className={classes.resultsCount}>
            Showing {indexOfFirstBook}-{indexOfLastBook} of {numberofbooks}{" "}
            results
          </Typography>
        </Grid>

        {/* Display search results  */}
        <Grid>
          {currentBooks.map((book, index) => {
            return (
              <UploadBookCard
                key={book.id}
                thumbnail={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                title={book.volumeInfo.title}
                author={authorsToString(book.volumeInfo.authors)}
                publishedDate={book.volumeInfo.publishedDate}
                uploadBook={() => uploadBook(index)}
              />
            );
          })}
        </Grid>

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

export default UploadBookPage;
