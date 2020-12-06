import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { CircularProgress } from "@material-ui/core";
import SingleBookCard from "../components/SingleBookCard";
import { SearchContext } from "../Context";
import SEARCH_BOOKS from "../dataservice/queries/searchBooks";
import Pagination from "../components/Pagination";
import useQuery from "../dataservice/useQuery";

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

  const { query } = useContext(SearchContext);

  const { data, loading, error } = useQuery({
    query: SEARCH_BOOKS.query,
    variables: SEARCH_BOOKS.variables({ query }),
  });

  const [currentPage, setCurrentPage] = useState(1);

  // get books from data
  let bookResults = [];
  if (data) {
    bookResults = data.books;
  }

  const booksPerPage = 8;
  const numberofbooks = bookResults.length;
  const booksPerPage = bookResults.length > 7 ? 8 : bookResults.length;

  // Get currently displayed books - for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookResults.slice(indexOfFirstBook, indexOfLastBook);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Grid className={classes.pageContainer} container direction="column">
        {error && <div className={classes.errorDiv}>{error}</div>}
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
        {loading && (
          <CircularProgress color="primary" style={{ padding: "2.5rem" }} />
        )}
        {!loading &&
          (bookResults.length === 0 ? (
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
                  id={book._id}
                  title={book.title}
                  authors={book.authors}
                  googleId={book.googleId}
                  publishedDate={book.publishedDate}
                  owners={book.owners}
                />
              ))
            ))}

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
