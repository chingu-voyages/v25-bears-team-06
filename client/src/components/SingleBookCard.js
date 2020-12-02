import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";

// Modal imports
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

// auth import
import { AuthContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1rem",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 900,
  },
  imageContainer: {
    width: 128,
    height: 128,
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
      marginBottom: "1rem",
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "0.3rem",
      marginLeft: "0.3rem",
      width: "46%",
    },
  },
  modalBtn: {
    width: "43%",
    margin: "0.5rem",
  },
  availBtn: {
    width: "100%",
    fontSize: "0.8rem",
  },
  availItem: {
    backgroundColor: "lime",
    marginBottom: "0.3rem",
  },
  notAvailItem: {
    backgroundColor: "red",
    marginBottom: "0.3rem",
  },
}));

// card template for book output
const SingleBookCard = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { id, title, author, googleId, publishedDate, owners } = props;
  // go to book info page
  const handleClick = () => {
    history.push("/bookinfo");
  };

  // Modal actions
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // auth state
  // is user logged in?
  const auth = useContext(AuthContext);
  const loggedIn = auth && auth.user && auth.user.token;

  const thumbnail = `http://books.google.com/books/content?id=${googleId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={3} md={2} className={classes.imageContainer}>
            <img className={classes.img} alt="complex" src={thumbnail} />
          </Grid>
          <Grid item xs={9} sm={6} container className={classes.infoContainer}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {title}
                </Typography>
                {publishedDate && (
                  <Typography variant="body2">{publishedDate}</Typography>
                )}
              </Grid>
              <Grid item>
                {author && <Typography variant="body2">by {author}</Typography>}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container className={classes.btnContainer} sm={3}>
            <Button
              component={Link}
              to={`/bookinfo/${id}`}
              className={classes.btn}
              variant="contained"
              color="primary"
              disableElevation
            >
              Learn More
            </Button>
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
          {/* Modal  */}
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <Paper className={classes.paper}>
                <Grid container spacing={2} disableElevation>
                  <Grid item xs={3} className={classes.imageContainer}>
                    <img
                      className={classes.img}
                      alt="complex"
                      src={thumbnail}
                    />
                  </Grid>
                  <Grid item xs={9} container className={classes.infoContainer}>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {title}
                        </Typography>
                        {publishedDate && (
                          <Typography variant="body2">
                            {publishedDate}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item>
                        {author && (
                          <Typography variant="body2">by {author}</Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* check auth state for modal options */}
                  {loggedIn ? (
                    <Grid item container spacing={2}>
                      <Grid item>
                        <Typography variant="body1">
                          Available Copies
                        </Typography>
                      </Grid>
                      {owners.map((owner) => (
                        <Grid item container>
                          <Grid
                            item
                            container
                            xs={12}
                            className={
                              owner.isAvailable
                                ? classes.availItem
                                : classes.notAvailItem
                            }
                          >
                            <Grid item xs={9}>
                              <Typography>{owner.owner.displayName}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Button
                                className={classes.availBtn}
                                variant="contained"
                                color="primary"
                                disableElevation
                              >
                                {owner.isAvailable
                                  ? "Checkout"
                                  : "Join Waitlist"}
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Grid item container>
                      <Grid item>
                        {" "}
                        <Typography variant="body1">
                          You must be logged in to check out this book.
                        </Typography>{" "}
                      </Grid>
                      <Grid item container>
                        <Button
                          component={Link}
                          to="/login"
                          className={classes.modalBtn}
                          variant="contained"
                          color="primary"
                          disableElevation
                        >
                          Login
                        </Button>
                        <Button
                          component={Link}
                          to="/signup"
                          className={classes.modalBtn}
                          variant="contained"
                          color="primary"
                          disableElevation
                        >
                          Sign Up
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </DialogContent>
          </Dialog>
        </Grid>
      </Paper>
    </div>
  );
};

export default SingleBookCard;
