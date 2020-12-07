import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import getBookByIdRequest from "../dataservice/getBookByIdRequest";
import CheckOutModal from "../components/CheckOutModal";
import { AuthContext } from "../Context";

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
}));

// Template for book info page
const BookInfoPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const auth = useContext(AuthContext);
  const loggedIn = auth && auth.user && auth.user.token;

  const [open, setOpen] = useState(false);
  const [bookResult, setBookResult] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again later",
  );

  useEffect(
    function handleEffect() {
      async function getBookByIdEffect() {
        try {
          const { getBookById, message } = await getBookByIdRequest({ id });
          if (getBookById) {
            setBookResult(getBookById);
          } else if (message) {
            setHasError(true);
            setErrorMessage(message);
          }
        } catch (err) {
          setHasError(true);
          setErrorMessage(err.message);
        }
      }
      getBookByIdEffect().catch((err) => {
        setHasError(true);
        setErrorMessage(err.message);
      });
    },
    [id],
  );

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
      {hasError && <div className={classes.errorDiv}>{errorMessage}</div>}
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
            <Grid
              item
              xs={12}
              container
              className={classes.btnContainer}
              sm={3}
            >
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                disableElevation
                onClick={handleOpen}
              >
                Checkout
              </Button>
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
