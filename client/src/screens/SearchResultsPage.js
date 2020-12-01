import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SingleBookCard from "../components/SingleBookCard";
import { SearchContext } from "../Context";
import searchRequest from "../dataservice/searchRequest";
import Pagination from "../components/Pagination";

const useStyles = makeStyles({
  pageContainer: {
    maxWidth: 1200,
    margin: "auto",
  },
  errorDiv: {
    height: "50%",
  },
  paginationContainer: {
    position: "relative",
    justifyContent: "center",
  },
});

// Display Search Results in a Grid

const SearchResultsPage = () => {
  const classes = useStyles();

  const [bookResults, setBookResults] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again later.",
  );
  const { query } = useContext(SearchContext);

  useEffect(
    function handleEffect() {
      async function searchEffect() {
        try {
          const { books, message } = await searchRequest({ query });
          if (books && Array.isArray(books)) {
            setBookResults(books);
          } else if (message) {
            setHasError(true);
            setErrorMessage(message);
          }
        } catch (err) {
          setHasError(true);
          setErrorMessage(err.message);
        }
      }
      searchEffect().catch((err) => {
        setHasError(true);
        setErrorMessage(err.message);
      });
    },
    [query],
  );

  const booksPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const numberofbooks = bookResults.length;

  // Get currently displayed books - for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookResults.slice(indexOfFirstBook, indexOfLastBook);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Grid className={classes.pageContainer} container direction="column">
        {hasError && <div className={classes.errorDiv}>{errorMessage}</div>}
        <Typography variant="h4" gutterBottom>
          Search Results{" "}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Authors and titles that contain:{" "}
          <span style={{ color: "red" }}>{query}</span>
        </Typography>

        <Grid item>
          <Typography
            variant="subtitle2"
            className={classes.resultsCount}
            gutterBottom
            color="primary"
          >
            Showing {indexOfFirstBook}-{indexOfLastBook} of {numberofbooks}{" "}
            results
          </Typography>
        </Grid>

        {/* Display Search Results  */}
        {bookResults.length === 0 ? (
          <>
            <Typography variant="subtitle1" gutterBottom>
              No results found. Please try a different search term. <br />
            </Typography>

            <Typography variant="body2">
              If you still don&apos;t see results after modifying your search,
              it could be that none of our members have added this title to our
              database yet.
              <br />
              You can be the first to share this title. Just{" "}
              <Link to="/signup"> sign up</Link> and click on{" "}
              <strong>Upload Book</strong>.
            </Typography>
          </>
        ) : (
          currentBooks.map((book) => (
            <SingleBookCard
              key={book._id}
              title={book.title}
              author={book.authors}
              googleId={book.googleId}
              publishedDate={book.publishedDate}
            />
          ))
        )}

        {/* Display pagination  */}
        <Grid
          item
          container
          alignItems="center"
          className={classes.paginationContainer}
        >
          <Pagination
            booksPerPage={booksPerPage}
            totalBooks={bookResults.length}
            paginate={paginate}
            className={classes.pagination}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchResultsPage;
