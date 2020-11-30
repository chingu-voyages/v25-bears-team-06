import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SingleBookCard from "../components/SingleBookCard";
import { SearchContext } from "../Context";
import searchRequest from "../dataservice/searchRequest";

const useStyles = makeStyles({
  errorDiv: {
    height: "50%",
  },
});

// Display Search Results in a Grid

const BasicSearchResultsPage = () => {
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

  const classes = useStyles();
  return (
    <div>
      {hasError && <div className={classes.errorDiv}>{errorMessage}</div>}
      <Typography variant="h4">Search Results </Typography>

      <Typography variant="subtitle1">
        Authors and titles that contain:{" "}
        <span style={{ color: "red" }}>{query}</span>
      </Typography>
      {bookResults.length === 0 ? (
        <span>no results found</span>
      ) : (
        bookResults.map((book) => (
          <SingleBookCard
            key={book._id}
            title={book.title}
            author={book.authors}
            googleId={book.googleId}
            publishedDate={book.publishedDate}
          />
        ))
      )}
    </div>
  );
};

export default BasicSearchResultsPage;
