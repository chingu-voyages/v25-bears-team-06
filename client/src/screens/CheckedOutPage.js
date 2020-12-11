import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, CircularProgress } from "@material-ui/core/";
import SingleBookCard from "../components/SingleBookCard";
import Pagination from "../components/Pagination";

const useStyles = makeStyles({
  pageContainer: {
    maxWidth: 1200,
    margin: "auto",
  },
  paginationContainer: {
    position: "relative",
    justifyContent: "center",
  },
});

const CheckedOutPage = () => {
  const classes = useStyles();

  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = checkedOutBooks.length > 7 ? 8 : checkedOutBooks.length;
  // Get currently displayed books - for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = checkedOutBooks.slice(indexOfFirstBook, indexOfLastBook);
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Grid className={classes.pageContainer} container direction="column">
        <Typography variant="h4">Books you have checked out</Typography>
        <Typography variant="h5">Total: #</Typography>

        {/* Display checkedOut books  */}

        {/* {loading && (
          <CircularProgress color="primary" style={{ padding: "2.5rem" }} />
        )}

        {!loading &&
          (checkedOutBooks.length === 0 ? (
            <>
              <Typography variant="subtitle1" gutterBottom>
                You are not currently on a waitlist for any books. <br />
              </Typography>
            </>
          ) : (
            checkedOutBooks.map((book) => (
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
          ))} */}

        {/* Display pagination  */}
        <Grid
          item
          container
          alignItems="center"
          className={classes.paginationContainer}
        >
          <Pagination
            booksPerPage={booksPerPage}
            totalBooks={checkedOutBooks.length}
            paginate={paginate}
            className={classes.pagination}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckedOutPage;
