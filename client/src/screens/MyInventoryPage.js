import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Snackbar,
  Typography,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import InventoryCard from "../components/Cards/InventoryCard";
import Pagination from "../components/Pagination";
import Alert from "../components/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
  },
  headerSection: {
    marginBottom: theme.spacing(4),
  },
  paginationContainer: {
    position: "relative",
    justifyContent: "center",
  },
}));

const MyInventoryPage = ({ inventory, setInventory, loading }) => {
  const classes = useStyles();

  const [alert, setAlert] = useState({
    open: false,
    message: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const numberOfBooks = inventory.length;
  const booksPerPage = inventory.length > 4 ? 5 : inventory.length;
  // Get currently displayed books - for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = inventory.slice(indexOfFirstBook, indexOfLastBook);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className={classes.root}>
      <Snackbar
        classes={{
          root: classes.snackbar,
        }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={alert.open}
        message={alert.message}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={(inventory && 1000) || 5000}
      >
        <div>
          <Alert severity={(inventory && "success") || "error"}>
            {alert.message}
          </Alert>
        </div>
      </Snackbar>
      <header className={classes.headerSection}>
        <Typography variant="h4" gutterBottom>
          My Inventory
        </Typography>
        <Typography variant="body1" gutterBottom>
          Books in your inventory are visible by the community.
        </Typography>
        <Typography
          variant="subtitle2"
          className={classes.resultsCount}
          gutterBottom
          color="primary"
        >
          Showing{" "}
          {numberOfBooks === 0 ? indexOfFirstBook : indexOfFirstBook + 1}-
          {numberOfBooks < indexOfLastBook ? numberOfBooks : indexOfLastBook} of{" "}
          {numberOfBooks} results
        </Typography>
      </header>

      {/* card section */}
      {loading && (
        <CircularProgress color="primary" style={{ padding: "2.5rem" }} />
      )}

      {!loading &&
        (inventory.length === 0 ? (
          <>
            <Typography variant="body1" gutterBottom>
              It looks like you haven&apos;t uploaded any books yet.
              <br />
              Click on Upload Book to add books you want to share with others.
            </Typography>
          </>
        ) : (
          <section>
            {currentBooks.map((item) => (
              <InventoryCard
                key={item._id}
                id={item._id}
                googleId={item.book.googleId}
                title={item.book.title}
                authors={item.book.authors}
                checkoutData={
                  item.checkoutData.length > 0
                    ? item.checkoutData[item.checkoutData.length - 1]
                    : null
                }
                isAvailable={item.isAvailable}
                inventory={inventory}
                setInventory={setInventory}
                setAlert={setAlert}
              />
            ))}
          </section>
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
          totalBooks={inventory.length}
          paginate={paginate}
          className={classes.pagination}
        />
      </Grid>
    </main>
  );
};

export default MyInventoryPage;
