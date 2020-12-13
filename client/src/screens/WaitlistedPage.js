import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import SingleBookCard from "../components/SingleBookCard";
import Pagination from "../components/Pagination";
import Alert from "../components/Alert";

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

const WaitlistedPage = ({
  checkedOut,
  setCheckedOut,
  waitlisted,
  setWaitlisted,
  loading,
  setAlert,
}) => {
  const classes = useStyles();
  const [waitlistedBooks, setWaitlistedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) {
    return <CircularProgress color="primary" />;
  }

  const booksPerPage = waitlisted.length > 7 ? 8 : waitlisted.length;
  // Get currently displayed books - for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = waitlisted.slice(indexOfFirstBook, indexOfLastBook);
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const setOwners = (newOwners, bookId) => {
    const waitlistIndex = waitlisted.findIndex(
      ({ book }) => book._id === bookId,
    );

    const waitlistedCopy = [...waitlisted];
    waitlistedCopy[waitlistIndex].book = {
      ...waitlistedCopy[waitlistIndex].book,
      newOwners,
    };
    setWaitlisted(waitlistedCopy);
  };

  return (
    <div>
      <Grid className={classes.pageContainer} container direction="column">
        <Typography variant="h4">Books you have waitlisted for</Typography>
        <Typography variant="h5">Total: {waitlisted.length}</Typography>

        {/* Display waitlisted books  */}

        {waitlisted.length === 0 ? (
          <>
            <Typography variant="subtitle1" gutterBottom>
              You are not currently on a waitlist for any books. <br />
            </Typography>
          </>
        ) : (
          waitlisted.map(({ _id, book }) => (
            <SingleBookCard
              key={book._id + Math.random()}
              id={book._id}
              title={book.title}
              authors={book.authors}
              googleId={book.googleId}
              publishedDate={book.publishedDate}
              owners={book.owners}
              setOwners={setOwners}
              setAlert={setAlert}
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
            totalBooks={waitlistedBooks.length}
            paginate={paginate}
            className={classes.pagination}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default WaitlistedPage;
