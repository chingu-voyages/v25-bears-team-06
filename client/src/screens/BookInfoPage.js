import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import {
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import getBookByIdRequest from "../dataservice/getBookByIdRequest";
import CheckOutModal from "../components/CheckOutModal";
import { AuthContext } from "../Context";
import { GET_BOOK_BY_ID } from "../dataservice/queries";
import useQuery from "../dataservice/useQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1rem",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
  },
  imageContainer: {
    alignItems: "center",
    verticalAlign: "middle",
    justifyContent: "center",
    position: "relative",
    display: "inline-flex",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  btn: {
    margin: 2,
    [theme.breakpoints.down("xl")]: {
      width: "100%",
      height: "3rem",
    },
  },
  snackbarContainer: {
    width: "100%",
    position: "relative",
    margin: "0 auto",
    padding: 0,
  },
  snackbar: {
    position: "absolute",
    top: 0,
    margin: "0 0 0",
  },
}));

// Template for book info page
const BookInfoPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const loggedIn = auth && auth.user && auth.user.token;

  const { data, loading, error } = useQuery({
    query: GET_BOOK_BY_ID.query,
    variables: GET_BOOK_BY_ID.variables({ id }),
  });

  const [open, setOpen] = useState(false);
  const [bookResult, setBookResult] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    if (data) {
      setBookResult(data.getBookById);
    } else if (error) {
      setAlert({
        open: true,
        message: error,
      });
    }
  }, [data, error]);

  // back to search results
  const handleGoBack = () => {
    history.goBack();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const thumbnail = `http://books.google.com/books/content?id=${bookResult.googleId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;

  return (
    <>
      <div className={classes.snackbarContainer}>
        <Snackbar
          classes={{
            root: classes.snackbar,
          }}
          open={alert.open}
          message={alert.message}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setAlert({ ...alert, open: false })}
          autoHideDuration={5000}
        >
          <Alert variant="filled" severity="error">
            {alert.message}
          </Alert>
        </Snackbar>
      </div>
      <div className={classes.root}>
        <Button onClick={handleGoBack}> Back to search results</Button>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={3} md={2} className={classes.imageContainer}>
              <img className={classes.img} alt="book cover" src={thumbnail} />
            </Grid>
            <Grid
              item
              xs={9}
              sm={6}
              container
              className={classes.infoContainer}
            >
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {bookResult.title}
                  </Typography>
                  {bookResult.categories && (
                    <Typography variant="body2">
                      {bookResult.categories.join(" ")}
                    </Typography>
                  )}
                  {bookResult.pageCount && (
                    <Typography variant="body2">
                      {bookResult.pageCount} pages
                    </Typography>
                  )}
                  {bookResult.publisher && (
                    <Typography variant="body2">
                      {bookResult.publisher}
                    </Typography>
                  )}
                  {bookResult.publishedDate && (
                    <Typography variant="body2">
                      {bookResult.publishedDate}
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  {bookResult.author && (
                    <Typography variant="body2">
                      by {bookResult.author}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} container sm={3}>
              {!loading ? (
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={handleOpen}
                  disabled={!!error}
                >
                  Checkout
                </Button>
              ) : (
                <CircularProgress
                  color="primary"
                  style={{ margin: "0 auto" }}
                />
              )}
            </Grid>
            <Dialog open={open} onClose={handleClose}>
              <CheckOutModal
                title={bookResult.title}
                thumbnail={thumbnail}
                publishedDate={bookResult.publishedDate}
                authors={bookResult.authors}
                loggedIn={loggedIn}
                owners={bookResult.owners}
              />
            </Dialog>
            <Grid item container>
              {bookResult.description && (
                <Typography variant="body2">
                  {bookResult.description}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default BookInfoPage;
