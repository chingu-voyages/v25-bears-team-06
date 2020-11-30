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

  useEffect(function handleEffect() {
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
  }, []);

  const classes = useStyles();

  return (
    <div>
      {hasError && <div className={classes.errorDiv}>{errorMessage}</div>}
      <h1>Search Results Page</h1>
      <Typography variant="subtitle1">
        Authors and titles that contain:{" "}
        <span style={{ color: "red" }}>{query}</span>
      </Typography>

      {bookResults
        .filter(
          (book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()),
        )
        .map((filteredBook) => (
          <SingleBookCard
            key={filteredBook._id}
            title={filteredBook.title}
            author={filteredBook.author}
            thumbnail={filteredBook.thumbnail}
          />
        ))}
    </div>
  );
};

export default BasicSearchResultsPage;
