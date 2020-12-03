import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// Expansion imports
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
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
  accordionSummary: {
    padding: 1,
  },
  iconBtn: {
    fontSize: "2rem",
  },
  cancel: {
    color: "red",
  },
  confirm: {
    color: "lime",
  },
}));

export default function CheckOutModal({
  title,
  thumbnail,
  publishedDate,
  authors,
  loggedIn,
  owners,
}) {
  const classes = useStyles();

  return (
    <DialogContent>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={3} className={classes.imageContainer}>
            <img className={classes.img} alt="complex" src={thumbnail} />
          </Grid>
          <Grid item xs={9} container className={classes.infoContainer}>
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
                {authors && (
                  <Typography variant="body2">by {authors}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* check auth state for modal options */}
          {loggedIn ? (
            <Grid item container spacing={1}>
              <Grid item>
                <Typography variant="body1">Available Copies</Typography>
              </Grid>
              {/* start accordion here  */}
              {owners.map((owner) => (
                <Grid
                  key={owner._id}
                  item
                  xs={12}
                  className={classes.userContainer}
                >
                  <Accordion>
                    <AccordionSummary
                      aria-controls="panel1c-content"
                      id="panel1c-header"
                      className={classes.accordionSummary}
                    >
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
                            {owner.isAvailable ? "Checkout" : "Join Waitlist"}
                          </Button>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    {/* accordion expanded details below  */}
                    <AccordionDetails>
                      <Grid item container xs={12}>
                        <Grid item xs={8}>
                          <Typography variant="h6">Confirm Checkout</Typography>
                          <Typography variant="body2">
                            Book will be due by
                          </Typography>
                        </Grid>

                        <Grid item container xs={4}>
                          <IconButton>
                            <CancelIcon
                              className={[classes.iconBtn, classes.cancel]}
                            />
                          </IconButton>
                          <IconButton>
                            <CheckCircleIcon
                              className={[classes.iconBtn, classes.confirm]}
                            />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
              {/* end Accordion above the last grid close  */}
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
  );
}
