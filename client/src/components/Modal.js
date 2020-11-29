import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Modal imports
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Link } from "react-router-dom";

// auth import
// import { AuthContext } from "../Context";

//styles
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

const Modal = () => {
  const classes = useStyles();
  return (
    <div>
      {/* Modal  */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Paper className={classes.paper}>
            <Grid container spacing={2} disableElevation>
              <Grid item xs={3} className={classes.imageContainer}>
                <img className={classes.img} alt="complex" src={thumbnail} />
              </Grid>
              <Grid item xs={9} container className={classes.infoContainer}>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      Title: {title}
                    </Typography>
                    <Typography variant="body2">
                      Published: {publishedDate}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">by {author}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/* check auth state for modal options */}
              {loggedIn ? (
                <Grid item container spacing={2}>
                  <Grid item>
                    <Typography variant="body1">Available Copies</Typography>
                  </Grid>
                  <Grid item container>
                    <Grid item container xs={12} className={classes.availItem}>
                      <Grid item xs={9}>
                        <Typography>Username 123</Typography>
                      </Grid>

                      <Grid item xs={3}>
                        <Button
                          className={classes.availBtn}
                          variant="contained"
                          color="primary"
                          disableElevation
                        >
                          Checkout
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      className={classes.notAvailItem}
                    >
                      <Grid item xs={9}>
                        <Typography>Username 789</Typography>
                      </Grid>

                      <Grid item xs={3}>
                        {" "}
                        <Button
                          className={classes.availBtn}
                          variant="contained"
                          color="primary"
                          disableElevation
                        >
                          Join Waitlist
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
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
              {/* logged OUT */}

              {/* logged IN */}

              {/* edit before this line  */}
            </Grid>
          </Paper>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
