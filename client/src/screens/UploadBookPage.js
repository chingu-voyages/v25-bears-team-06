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
import Pagination from "../components/Pagination";
import UploadBookCard from "../components/UploadBookCard";
import { AuthContext } from "../Context";
import { UPLOAD_BOOK } from "../dataservice/mutations";
import useMutation from "../dataservice/useMutation";
import Alert from "../components/Alert";

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
  centered: {
    textAlign: "center",
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

const UploadBookPage = ({ addInventory }) => {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const [uploadBook, { data, error, loading }] = useMutation(
    UPLOAD_BOOK.mutation,
    auth.user.token,
    auth.onTokenExpired,
  );

  const [searchInput, setSearchInput] = useState("");
  const [books, setBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = books.length > 7 ? 8 : books.length;

  const numberOfBooks = books.length;

  const [selectedBookIndex, setSelectedBookIndex] = useState(null);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
  });

  const [pressedEnter, setPressedEnter] = useState(false);

  // to redirect upon success
  const [successRedirect, setSuccessRedirect] = useState(false);

  useEffect(async () => {
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
        message: "Book info uploaded successfully!",
      });
      window.setTimeout(() => {
        setSuccessRedirect(true);
        addInventory(data.addBook.owners[data.addBook.owners.length - 1]);
      }, 1000);
    } else if (error) {
      setAlert({
        open: true,
        message: error,
      });
    } else {
      await fetchBooks();
    }
  }, [searchInput, JSON.stringify(data), error, pressedEnter]);

  // set user input
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSearchInput(newValue);
    setPressedEnter(false);
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
      setPressedEnter(true);
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
          <Typography variant="h4" gutterBottom>
            Share a Book
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.centered}>
            To share a book you own with others, you need to add it to your
            inventory. <br />
            Do this by searching for the title. Once you click on the
            &quot;share&quot; button, others can see that you own that book.
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
              onKeyPress={onEnter}
            />
          </Grid>

          <Grid item>
            <Typography
              variant="subtitle2"
              className={classes.resultsCount}
              gutterBottom
              color="primary"
            >
              Showing{" "}
              {numberOfBooks === 0 ? indexOfFirstBook : indexOfFirstBook + 1}-
              {numberOfBooks < indexOfLastBook
                ? numberOfBooks
                : indexOfLastBook}{" "}
              of {numberOfBooks} results
            </Typography>
          </Grid>

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
            <div>
              <Alert severity={data ? "success" : "error"}>
                {alert.message}
              </Alert>
            </div>
          </Snackbar>

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
