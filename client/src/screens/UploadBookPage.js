import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  InputAdornment,
  TextField,
  Snackbar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Alert from "@material-ui/lab/Alert";
import { set } from "date-fns";
import Pagination from "../components/Pagination";
import UploadBookCard from "../components/UploadBookCard";
import { AuthContext } from "../Context";
import { UPLOAD_BOOK } from "../dataservice/mutations";
import useMutation from "../dataservice/useMutation";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1rem",
  },
  pageContainer: {
    maxWidth: 1200,
    margin: "auto",
    position: "relative",
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
  snackbar: {
    position: "absolute",
    top: 0,
    width: "100%",
  },
}));

const UploadBookPage = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const [uploadBook, { data, error, loading }] = useMutation(
    UPLOAD_BOOK.mutation,
    auth.user.token,
  );

  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const numberofbooks = books.length;

  // meant for showing loading only on given listing
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);

  // show success msg
  const [alert, setAlert] = useState({
    open: false,
    message: "",
  });

  // to redirect upon success
  const [successRedirect, setSuccessRedirect] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchInput !== "") {
        const result = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${process.env.REACT_APP_API_KEY}&maxResults=40`,
        );
        setBooks(result.data.items);
      }
    };

    if (data) {
      setAlert({
        open: true,
        message: "Book uploaded successfully!",
      });
      window.setTimeout(() => {
        setSuccessRedirect(true);
      }, 1000);
    } else if (error) {
      setAlert({
        open: true,
        message: error,
      });
    } else {
      fetchBooks();
    }
  }, [searchInput, data, error]);

  // set user input
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSearchInput(newValue);
  };

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

  const onUpload = async (bookIndex) => {
    const selectedBook = currentBooks[bookIndex];
    setSelectedBookIndex(bookIndex);

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

    uploadBook(
      UPLOAD_BOOK.variables({
        googleId,
        title,
        authors: formattedAuthors,
        description,
        categories,
        pageCount,
        publishedDate,
        publisher,
      }),
    );
  };

  const onEnter = (event) => {
    if (event.charCode === 13) {
      setSearchInput(searchInput);
    }
  };

  return (
    <>
      {successRedirect && <Redirect to="/dashboard/myinventory" />}
      <div className={classes.root}>
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
              label="Start typing ..."
              value={searchInput}
              onChange={handleChange}
              onKeyDown={onEnter}
            />
          </Grid>

          <Grid item>
            <Typography variant="subtitle2" className={classes.resultsCount}>
              Showing {indexOfFirstBook}-{indexOfLastBook} of {numberofbooks}{" "}
              results
            </Typography>
          </Grid>

          {/* Success/Error Message */}
          <Snackbar
            classes={{
              root: classes.snackbar,
            }}
            open={alert.open}
            message={alert.message}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={() => setAlert({ ...alert, open: false })}
            autoHideDuration={5000}
          >
            <Alert variant="filled" severity={data ? "success" : "error"}>
              {alert.message}
            </Alert>
          </Snackbar>
          {/* end of success msg  */}

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
                  uploadBook={() => onUpload(index)}
                  isLoading={loading && selectedBookIndex === index}
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
    </>
  );
};

export default UploadBookPage;
