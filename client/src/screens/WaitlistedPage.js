import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
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

const WaitlistedPage = ({ userData, setUserData }) => {
  const classes = useStyles();
  const [waitlistedBooks, setWaitlistedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  if (!userData) {
    return <CircularProgress color="primary" />;
  }

  const booksPerPage =
    userData &&
    userData.waitlisted &&
    Array.isArray(userData.waitlisted) &&
    userData.waitlisted.length > 7
      ? 8
      : userData.waitlisted.length;
  // Get currently displayed books - for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = userData.waitlisted.slice(
    indexOfFirstBook,
    indexOfLastBook,
  );
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Grid className={classes.pageContainer} container direction="column">
        <Typography variant="h4">Books you have waitlisted for</Typography>
        <Typography variant="h5">
          Total: {userData.waitlisted.length}
        </Typography>

        {/* Display waitlisted books  */}

        {userData.waitlisted.length === 0 ? (
          <>
            <Typography variant="subtitle1" gutterBottom>
              You are not currently on a waitlist for any books. <br />
            </Typography>
          </>
        ) : (
          userData.waitlisted.map(({ _id, waitlist, book }) => (
            <SingleBookCard
              key={book._id + Math.random()}
              id={book._id}
              title={book.title}
              authors={book.authors}
              googleId={book.googleId}
              publishedDate={book.publishedDate}
              owners={book.owners}
              waitlist={waitlist}
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
