import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Snackbar,
  CircularProgress,
  Typography,
  Grid,
} from "@material-ui/core";
import { format } from "date-fns";
import CheckedOutCard from "../components/cards/CheckedOutCard";
import Pagination from "../components/Pagination";
import { AuthContext } from "../Context";
import useQuery from "../dataservice/useQuery";
import { GET_USER } from "../dataservice/queries";
import Alert from "../components/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
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
    backgroundColor: "",
  });
  // context
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
  const numberofbooks = checkedOutBooks.length;
  const booksPerPage = checkedOutBooks.length > 7 ? 8 : checkedOutBooks.length;
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
      <header className={`${classes.centered} ${classes.headerSection}`}>
        <Typography variant="h4" gutterBottom>
          Books you have checked out
        </Typography>
        <Typography
          variant="subtitle2"
          className={classes.resultsCount}
          gutterBottom
          color="primary"
        >
          Showing {indexOfFirstBook}-{indexOfLastBook} of {numberofbooks}{" "}
          results
        </Typography>
      </header>

      {/* card section */}
      <div className={classes.centered}>
        {loading && (
          <CircularProgress color="primary" style={{ padding: "2.5rem" }} />
        )}
      </div>
      {checkedOutBooks && checkedOutBooks.length && (
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
                Number(item.checkoutData[item.checkoutData.length - 1].dueDate),
                "PPPP",
              )}
            />
          ))}
        </section>
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
          totalBooks={checkedOutBooks.length}
          paginate={paginate}
          className={classes.pagination}
        />
      </Grid>
    </main>
  );
}
