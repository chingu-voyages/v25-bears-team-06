import React, { useState, useContext, useEffect } from "react";
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
import { addDays, format, getTime } from "date-fns";
// data request
import { CHECKOUT_BOOK, JOIN_WAITLIST } from "../dataservice/mutations";
import useMutation from "../dataservice/useMutation";
import { AuthContext } from "../Context";

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
    backgroundColor: theme.palette.success.main,
    marginBottom: "0.3rem",
    borderRadius: 5,
  },
  notAvailItem: {
    backgroundColor: theme.palette.error.main,
    marginBottom: "0.3rem",
    borderRadius: 5,
  },
  ownerName: {
    paddingLeft: "0.7rem",
  },
  iconBtn: {
    fontSize: "2rem",
  },
  cancel: {
    color: theme.palette.error.main,
  },
  confirm: {
    color: theme.palette.success.main,
  },
}));

export default function CheckOutModal({
  bookId,
  title,
  thumbnail,
  publishedDate,
  authors,
  loggedIn,
  owners,
  setOwners,
  setAlert,
}) {
  const classes = useStyles();

  // book due by date
  const date = new Date();
  const checkoutDate = getTime(date);
  const dueDate = getTime(addDays(date, 21));
  const formattedDueDate = format(dueDate, "PPPP");

  // set expanded
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = (currentAccordion) => (event, isExpanded) => {
    setExpanded(isExpanded ? currentAccordion : false);
  };

  // checkout book function
  const auth = useContext(AuthContext);

  const [
    checkoutBook,
    { data: checkoutBookData, checkoutBookError, checkoutBookLoading },
  ] = useMutation(CHECKOUT_BOOK.mutation, auth && auth.user && auth.user.token);

  useEffect(() => {
    if (checkoutBookData) {
      const ownerIndex = owners.findIndex(
        (owner) => owner._id === checkoutBookData.checkoutBook._id,
      );
      const ownersCopy = [...owners];
      ownersCopy[ownerIndex] = checkoutBookData.checkoutBook;
      setOwners(ownersCopy, bookId);

      setAlert({
        open: true,
        message: "Checkout Successful",
        backgroundColor: "green",
      });
    }
    if (checkoutBookError) {
      setAlert({
        open: true,
        message: checkoutBookError,
        backgroundColor: "red",
      });
    }
  }, [JSON.stringify(checkoutBookData), checkoutBookError, setAlert]);

  const handleCheckout = async ({ ownershipId }) => {
    await checkoutBook(
      CHECKOUT_BOOK.variables({
        ownershipId,
        checkoutDate: checkoutDate.toString(),
        dueDate: dueDate.toString(),
      }),
    );
    setExpanded(false);
  };

  const [
    joinWaitlist,
    {
      data: joinWaitlistData,
      error: joinWaitlistError,
      loading: joinWaitlistLoading,
    },
  ] = useMutation(JOIN_WAITLIST.mutation, auth && auth.user && auth.user.token);

  useEffect(() => {
    if (joinWaitlistData) {
      console.log(joinWaitlistData);
    }
    if (joinWaitlistError) {
      setAlert({
        open: true,
        message: joinWaitlistError,
        backgroundColor: "red",
      });
    }
  }, [JSON.stringify(joinWaitlistData), joinWaitlistError, setAlert]);

  const handleJoinWaitlist = async ({ ownershipId }) => {
    await joinWaitlist(JOIN_WAITLIST.variables({ ownershipId }));
    setExpanded(false);
  };

  const handleCheckWaitlist = (owner) =>
    owner && owner.waitlist && Array.isArray(owner.waitlist)
      ? owner.waitlist
          .map(({ _id }) => _id)
          .indexOf(auth && auth.user && auth.user.userId)
      : null;

  const handleModalButton = (owner) => {
    // book is available
    if (owner.isAvailable) {
      return "Checkout";
    }
    if (
      owner.checkoutData[owner.checkoutData.length - 1].user._id ===
        auth.user.userId &&
      !owner.checkoutData[owner.checkoutData.length - 1].returnDate
    ) {
      return "View All Checked Out";
    }
    // book has been returned and user is the next person on waitlist
    if (
      owner.checkoutData[owner.checkoutData.length - 1].returnDate &&
      owner.waitlist.length &&
      owner.waitlist[0]._id === auth.user.userId
    ) {
      return "Checkout";
    }
    if (
      !owner.waitlist.length ||
      owner.waitlist
        .map(({ _id }) => _id)
        .indexOf(auth && auth.user && auth.user.userId) === -1
    ) {
      // book is unavailable and waitlist is empty or
      // waitlist is not empty but does not include current user
      return "Join Waitlist";
    }
    // same as above except the waitlist does include the current user
    return "Leave Waitlist";
  };

  return (
    <DialogContent>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={3} className={classes.imageContainer}>
            <img className={classes.img} alt="complex" src={thumbnail} />
          </Grid>
          <Grid item xs={9} container>
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
              {/* start accordion below */}
              {owners.map((owner) => (
                <Grid key={owner._id} item xs={12}>
                  <Accordion
                    expanded={expanded === owner._id}
                    onChange={toggleExpanded(owner._id)}
                  >
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
                        alignItems="center"
                      >
                        <Grid item xs={8} sm={9}>
                          <Typography className={classes.ownerName}>
                            {owner.owner.displayName}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} sm={3}>
                          <Button
                            className={classes.availBtn}
                            variant="contained"
                            color="primary"
                            disableElevation
                          >
                            {handleModalButton(owner)}
                          </Button>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    {/* accordion expanded details below  */}
                    <AccordionDetails>
                      {owner.isAvailable ? (
                        <Grid item container xs={12}>
                          <Grid item xs={9}>
                            <Typography variant="h6">
                              Confirm Checkout
                            </Typography>
                            <Typography variant="body2">
                              Book will be due by {formattedDueDate}
                            </Typography>
                          </Grid>

                          <Grid item container xs={3}>
                            <IconButton
                              className={classes.cancel}
                              onClick={toggleExpanded(owner._id)}
                            >
                              <CancelIcon className={classes.iconBtn} />
                            </IconButton>
                            <IconButton
                              className={classes.confirm}
                              onClick={() =>
                                handleCheckout({ ownershipId: owner._id })
                              }
                            >
                              <CheckCircleIcon className={classes.iconBtn} />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid item container xs={12}>
                          <Grid item xs={9}>
                            <Typography variant="h6">
                              Confirm joining waitlist.
                            </Typography>
                          </Grid>

                          <Grid item container xs={3}>
                            <IconButton
                              className={classes.cancel}
                              onClick={toggleExpanded(owner._id)}
                            >
                              <CancelIcon className={classes.iconBtn} />
                            </IconButton>
                            <IconButton
                              className={classes.confirm}
                              onClick={() =>
                                handleJoinWaitlist({ ownershipId: owner._id })
                              }
                            >
                              <CheckCircleIcon className={classes.iconBtn} />
                            </IconButton>
                          </Grid>
                        </Grid>
                      )}
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
