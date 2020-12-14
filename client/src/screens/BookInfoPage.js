import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Paper, Typography, Button, Snackbar } from "@material-ui/core";
import { GET_BOOK_BY_ID } from "../dataservice/queries";
import useQuery from "../dataservice/useQuery";
import Alert from "../components/Alert";

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

const BookInfoPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const { data, error } = useQuery({
    query: GET_BOOK_BY_ID.query,
    variables: GET_BOOK_BY_ID.variables({ id }),
  });

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
          <div>
            <Alert severity="error">{alert.message}</Alert>
          </div>
        </Snackbar>
      </div>
      <div className={classes.root}>
        <Button onClick={handleGoBack}> Back</Button>
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
