import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Snackbar,
  CircularProgress,
  Typography,
  Grid,
} from "@material-ui/core";
import { format } from "date-fns";
import CheckedOutCard from "../components/Cards/CheckedOutCard";
import Pagination from "../components/Pagination";
import { AuthContext } from "../Context";
import useQuery from "../dataservice/useQuery";
import { GET_USER } from "../dataservice/queries";
import Alert from "../components/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
  },
  centered: {
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  headerSection: {
    marginBottom: theme.spacing(4),
  },
  paginationContainer: {
    position: "relative",
    justifyContent: "center",
  },
}));

export default function CheckedOutPage() {
  const classes = useStyles();

  const [alert, setAlert] = useState({
    open: false,
    message: "",
  });

  const auth = useContext(AuthContext);
  const { token } = auth.user;

  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  const { data, loading, error } = useQuery({
    query: GET_USER.query,
    token,
    onTokenExpired: () => auth.onTokenExpired(),
  });

  useEffect(() => {
    if (data) {
      setCheckedOutBooks(data.getUser.checkedOut);
    } else if (error) {
      setAlert({
        open: true,
        message: error,
      });
    }
  }, [data, error]);

  const [currentPage, setCurrentPage] = useState(1);
  const numberOfBooks = checkedOutBooks.length;
  const booksPerPage = checkedOutBooks.length > 4 ? 5 : checkedOutBooks.length;
  // Get currently displayed books - for pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = checkedOutBooks.slice(indexOfFirstBook, indexOfLastBook);

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
        autoHideDuration={(data && 1000) || 5000}
      >
        <div>
          <Alert severity={(data && "success") || "error"}>
            {alert.message}
          </Alert>
        </div>
      </Snackbar>
      <header className={classes.headerSection}>
        <Typography variant="h4" gutterBottom>
          Books you have checked out
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
        (checkedOutBooks.length === 0 ? (
          <>
            <Typography variant="body1" gutterBottom>
              It looks like you haven&apos;t checked out any books yet.
              <br />
              Simply search our database above and click on checkout if you see
              a book you&apos;d like to read.
            </Typography>
          </>
        ) : (
          <section>
            {currentBooks.map((item) => (
              <CheckedOutCard
                key={item._id}
                googleId={item.book.googleId}
                title={item.book.title}
                authors={item.book.authors}
                publishedDate={item.book.publishedDate}
                owner={item.owner.displayName}
                dueDate={format(
                  Number(
                    item.checkoutData[item.checkoutData.length - 1].dueDate,
                  ),
                  "PPPP",
                )}
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
          totalBooks={checkedOutBooks.length}
          paginate={paginate}
          className={classes.pagination}
        />
      </Grid>
    </main>
  );
}
