import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import SingleBookCard from "../components/SingleBookCard";
import Pagination from "../components/Pagination";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    maxWidth: 1200,
    margin: "auto",
  },
  headerSection: {
    marginBottom: theme.spacing(4),
  },
  paginationContainer: {
    position: "relative",
    justifyContent: "center",
  },
}));

const WaitlistedPage = ({
  checkedOut,
  waitlisted,
  setWaitlistedAndCheckedOut,
  loading,
  setAlert,
}) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) {
    return <CircularProgress color="primary" />;
  }

  const numberOfBooks = waitlisted.length;
  const booksPerPage = waitlisted.length > 4 ? 5 : waitlisted.length;
  // Get currently displayed books - for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = waitlisted.slice(indexOfFirstBook, indexOfLastBook);
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const setOwners = (newOwners, bookId) => {
    // 3 Cases where Dashboard UI needs updating upon receiving new owners data
    // 1) User Joins Waitlist (update waitlisted)
    // 2) User Leaves Waitlist (update waitlisted)
    // 3) User Checks out book && leaves waitlist (update waitlisted AND checkedOut)
    // and at the same time, handle modal UI updating

    // get index in waitlist of the book we are performing the action for
    const waitlistIndex = waitlisted.findIndex(
      ({ book }) => book._id === bookId,
    );

    const waitlistedCopy = [...waitlisted];

    // Gather lengths of all waitlists & checkoutData of all ownerships at waitlistIndex
    const prevWaitlistLengths = [];
    const prevCheckoutDataLengths = [];
    waitlisted[waitlistIndex].book.owners.forEach(
      ({ waitlist, checkoutData }) => {
        prevWaitlistLengths.push(waitlist.length);
        prevCheckoutDataLengths.push(checkoutData.length);
      },
    );

    newOwners.every(({ waitlist, checkoutData }, i) => {
      const prevWaitlistLength = prevWaitlistLengths[i];
      const prevCheckoutDataLength = prevCheckoutDataLengths[i];

      // Check if new waitlist lengths match with previous lengths
      if (waitlist.length !== prevWaitlistLength) {
        if (waitlist.length > prevWaitlistLength) {
          // CASE 1: joined a waitlist
          waitlistedCopy[waitlistIndex].book = {
            ...waitlistedCopy[waitlistIndex].book,
            newOwners,
          };
          const newWaitlistItem = { ...waitlistedCopy[waitlistIndex] };
          waitlistedCopy.unshift(waitlistedCopy[newWaitlistItem]);

          // update dashboard with updated waitlist with no changes to checkedOut
          setWaitlistedAndCheckedOut(waitlistedCopy, checkedOut);
        } else {
          // CASE 2: left a waitlist

          // Update waitlist at index with new owners data
          waitlistedCopy[waitlistIndex].book = {
            ...waitlistedCopy[waitlistIndex].book,
            newOwners,
          };

          const checkedOutCopy = [...checkedOut];
          if (checkoutData.length !== prevCheckoutDataLength) {
            // CASE 3: they made a checkout in addition to leaving a waitlist

            // push the updated waitlist ownership object to the front of checkedOut array
            const newCheckedOutItem = { ...waitlistedCopy[waitlistIndex] };
            checkedOutCopy.unshift(newCheckedOutItem);
          }
          // Delete current waitlist from dashboard waitlisted array
          waitlistedCopy.splice(waitlistIndex, 1);

          setWaitlistedAndCheckedOut(waitlistedCopy, checkedOutCopy);
        }
        return false;
      }
      return true;
    });
  };

  return (
    <div>
      <Grid className={classes.pageContainer} container direction="column">
        <header className={classes.headerSection}>
          <Typography variant="h4" gutterBottom>
            Books you have waitlisted for
          </Typography>
          <Typography
            variant="subtitle2"
            className={classes.resultsCount}
            gutterBottom
            color="primary"
          >
            Showing{" "}
            {numberOfBooks === 0 ? indexOfFirstBook : indexOfFirstBook + 1}-
            {numberOfBooks < indexOfLastBook ? numberOfBooks : indexOfLastBook}{" "}
            of {numberOfBooks} results
          </Typography>
        </header>

        {/* Display waitlisted books  */}

        {waitlisted.length === 0 ? (
          <>
            <Typography variant="subtitle1" gutterBottom>
              You are not currently on a waitlist for any books. <br />
            </Typography>
          </>
        ) : (
          currentBooks.map(({ book }) => (
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
            totalBooks={waitlisted.length}
            paginate={paginate}
            className={classes.pagination}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default WaitlistedPage;
