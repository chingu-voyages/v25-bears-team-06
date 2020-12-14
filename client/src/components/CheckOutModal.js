import React, { useState, useContext, useEffect } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { addDays, format, getTime } from "date-fns";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// data request
import {
  CHECKOUT_BOOK,
  JOIN_WAITLIST,
  LEAVE_WAITLIST,
} from "../dataservice/mutations";
import useMutation from "../dataservice/useMutation";
import { AuthContext } from "../Context";
import CheckOutModalAccordion from "./CheckOutModalAccordion";

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
  availBtn: {
    width: "100%",
    fontSize: "0.8rem",
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

  const auth = useContext(AuthContext);

  // checkout book function
  const [
    checkoutBook,
    {
      data: checkoutBookData,
      error: checkoutBookError,
      loading: checkoutBookLoading,
    },
  ] = useMutation(
    CHECKOUT_BOOK.mutation,
    auth.user ? auth.user.token : null,
    auth.onTokenExpired,
  );

  useEffect(() => {
    if (checkoutBookData) {
      const ownerIndex = owners.findIndex(
        (owner) => owner._id === checkoutBookData.checkoutBook._id,
      );
      const ownersCopy = [...owners];
      ownersCopy[ownerIndex] = { ...checkoutBookData.checkoutBook };
      setOwners(ownersCopy, bookId);

      setAlert({
        open: true,
        message: "Checkout Successful",
        type: "success",
      });
    }
    if (checkoutBookError) {
      setAlert({
        open: true,
        message: checkoutBookError,
        type: "error",
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

  // join waitlist function
  const [
    joinWaitlist,
    {
      data: joinWaitlistData,
      error: joinWaitlistError,
      loading: joinWaitlistLoading,
    },
  ] = useMutation(
    JOIN_WAITLIST.mutation,
    auth.user && auth.user.token,
    auth.onTokenExpired,
  );

  useEffect(() => {
    if (joinWaitlistData) {
      const ownerIndex = owners.findIndex(
        (owner) => owner._id === joinWaitlistData.joinWaitlist._id,
      );
      const ownersCopy = [...owners];
      ownersCopy[ownerIndex].waitlist.push({ _id: auth.user.userId });
      setOwners(ownersCopy, bookId);

      setAlert({
        open: true,
        message: "Joined Waitlist",
        type: "success",
      });
    }
    if (joinWaitlistError) {
      setAlert({
        open: true,
        message: joinWaitlistError,
        type: "error",
      });
    }
  }, [JSON.stringify(joinWaitlistData), joinWaitlistError, setAlert]);

  const handleJoinWaitlist = async ({ ownershipId }) => {
    await joinWaitlist(JOIN_WAITLIST.variables({ ownershipId }));
    setExpanded(false);
  };

  // leave waitlist function

  const [
    leaveWaitlist,
    {
      data: leaveWaitlistData,
      error: leaveWaitlistError,
      tope: leaveWaitlistLoading,
    },
  ] = useMutation(
    LEAVE_WAITLIST.mutation,
    auth.user && auth.user.token,
    auth.onTokenExpired,
  );

  useEffect(() => {
    if (leaveWaitlistData) {
      const ownerIndex = owners.findIndex(
        (owner) => owner._id === leaveWaitlistData.leaveWaitlist._id,
      );
      const ownersCopy = [...owners];
      ownersCopy[ownerIndex].waitlist = ownersCopy[ownerIndex].waitlist.filter(
        ({ _id }) => _id !== auth.user.userId,
      );
      setOwners(ownersCopy, bookId);

      setAlert({
        open: true,
        message: "Left Waitlist",
        type: "success",
      });
    }
    if (leaveWaitlistError) {
      setAlert({
        open: true,
        message: leaveWaitlistError,
        type: "error",
      });
    }
  }, [JSON.stringify(leaveWaitlistData), leaveWaitlistError, setAlert]);

  const handleLeaveWaitlist = async ({ ownershipId }) => {
    await leaveWaitlist(LEAVE_WAITLIST.variables({ ownershipId }));
    setExpanded(false);
  };

  const handleCheckWaitlist = (owner) =>
    owner && owner.waitlist && Array.isArray(owner.waitlist)
      ? owner.waitlist
          .map(({ _id }) => _id)
          .indexOf(auth && auth.user && auth.user.userId)
      : null;

  const handleModalAccordion = (owner) => {
    // book is available
    if (owner.isAvailable) {
      return {
        accordionSummaryButton: (
          <Button
            className={classes.availBtn}
            variant="contained"
            color="primary"
            disableElevation
          >
            Checkout
          </Button>
        ),
        accordionDetails: (
          <Grid item container xs={12}>
            <Grid item xs={9}>
              <Typography variant="h6">Confirm Your Checkout</Typography>
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
                onClick={() => handleCheckout({ ownershipId: owner._id })}
              >
                <CheckCircleIcon className={classes.iconBtn} />
              </IconButton>
            </Grid>
          </Grid>
        ),
      };
    }
    if (
      owner.checkoutData[owner.checkoutData.length - 1].user._id ===
        auth.user.userId &&
      !owner.checkoutData[owner.checkoutData.length - 1].returnDate
    ) {
      return {
        accordionSummaryButton: (
          <Button
            className={classes.availBtn}
            component={Link}
            to="/dashboard/checkedout"
            variant="contained"
            color="primary"
            disableElevation
          >
            View All Checked Out
          </Button>
        ),
      };
    }
    // book has been returned and user is the next person on waitlist
    if (
      owner.checkoutData[owner.checkoutData.length - 1].returnDate &&
      owner.waitlist.length &&
      owner.waitlist[0]._id === auth.user.userId
    ) {
      return {
        accordionSummaryButton: (
          <Button
            className={classes.availBtn}
            variant="contained"
            color="primary"
            disableElevation
          >
            Checkout
          </Button>
        ),
        accordionDetails: (
          <Grid item container xs={12}>
            <Grid item xs={9}>
              <Typography variant="h6">Confirm Checkout</Typography>
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
                onClick={() => handleCheckout({ ownershipId: owner._id })}
              >
                <CheckCircleIcon className={classes.iconBtn} />
              </IconButton>
            </Grid>
          </Grid>
        ),
      };
    }
    if (
      !owner.waitlist.length ||
      owner.waitlist
        .map(({ _id }) => _id)
        .indexOf(auth && auth.user && auth.user.userId) === -1
    ) {
      return {
        accordionSummaryButton: (
          <Button
            className={classes.availBtn}
            variant="contained"
            color="primary"
            disableElevation
          >
            Join Waitlist
          </Button>
        ),
        accordionDetails: (
          <Grid item container xs={12}>
            <Grid item xs={9}>
              <Typography variant="h6">Confirm joining waitlist.</Typography>
              <Typography variant="body2">
                There {owner.waitlist.length === 1 ? "is" : "are"}{" "}
                {owner.waitlist.length}{" "}
                {owner.waitlist.length === 1 ? "person" : "people"} ahead of
                you.
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
                onClick={() => handleJoinWaitlist({ ownershipId: owner._id })}
              >
                <CheckCircleIcon className={classes.iconBtn} />
              </IconButton>
            </Grid>
          </Grid>
        ),
      };
    }

    // same as above except the waitlist does include the current user
    return {
      accordionSummaryButton: (
        <Button
          className={classes.availBtn}
          variant="contained"
          color="primary"
          disableElevation
        >
          Leave Waitlist
        </Button>
      ),
      accordionDetails: (
        <Grid item container xs={12}>
          <Grid item xs={9}>
            <Typography variant="h6">Confirm leaving waitlist.</Typography>
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
              onClick={() => handleLeaveWaitlist({ ownershipId: owner._id })}
            >
              <CheckCircleIcon className={classes.iconBtn} />
            </IconButton>
          </Grid>
        </Grid>
      ),
    };
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
            <>
              {/* Checked Out */}
              <Grid item container spacing={1}>
                <Grid item>
                  <Typography variant="body1">Checked Out</Typography>
                </Grid>
              </Grid>
              {owners
                .filter(
                  (owner) =>
                    // user is found in the checkout data without a return date
                    owner.checkoutData &&
                    owner.checkoutData.length &&
                    owner.checkoutData[owner.checkoutData.length - 1].user &&
                    owner.checkoutData[owner.checkoutData.length - 1].user
                      ._id === auth.user.userId &&
                    !owner.checkoutData[owner.checkoutData.length - 1]
                      .returnDate,
                )
                .map((owner) => (
                  <CheckOutModalAccordion
                    key={owner._id}
                    owner={owner}
                    expanded={expanded}
                    toggleExpanded={toggleExpanded}
                    handleModalAccordion={handleModalAccordion}
                    formattedDueDate={formattedDueDate}
                    handleCheckout={handleCheckout}
                    handleJoinWaitlist={handleJoinWaitlist}
                  />
                ))}
              {/* Waitlisted */}
              <Grid item container spacing={1}>
                <Grid item>
                  <Typography variant="body1">Waitlisted For</Typography>
                </Grid>
              </Grid>
              {owners
                .filter(
                  (owner) =>
                    owner.checkoutData &&
                    owner.checkoutData.length &&
                    ((owner.checkoutData[owner.checkoutData.length - 1].user &&
                      owner.checkoutData[owner.checkoutData.length - 1].user
                        ._id !== auth.user.userId) ||
                      owner.checkoutData[owner.checkoutData.length - 1]
                        .returnDate) &&
                    owner.waitlist &&
                    owner.waitlist.filter((w) => w._id === auth.user.userId)
                      .length,
                )
                .map((owner) => (
                  <CheckOutModalAccordion
                    key={owner._id}
                    owner={owner}
                    expanded={expanded}
                    toggleExpanded={toggleExpanded}
                    handleModalAccordion={handleModalAccordion}
                    formattedDueDate={formattedDueDate}
                    handleCheckout={handleCheckout}
                    handleJoinWaitlist={handleJoinWaitlist}
                  />
                ))}
              {/* Avialable Copies */}
              <Grid item container spacing={1}>
                <Grid item>
                  <Typography variant="body1">Available Copies</Typography>
                </Grid>
                {owners
                  .filter(
                    (owner) =>
                      !owner.checkoutData.length ||
                      (owner.checkoutData &&
                        owner.checkoutData.length &&
                        owner.checkoutData[owner.checkoutData.length - 1]
                          .user &&
                        (owner.checkoutData[owner.checkoutData.length - 1].user
                          ._id !== auth.user.userId ||
                          (owner.checkoutData[owner.checkoutData.length - 1]
                            .user._id === auth.user.userId &&
                            owner.checkoutData[owner.checkoutData.length - 1]
                              .returnDate)) &&
                        // user does not appear on wait list
                        !owner.waitlist.filter(
                          (w) => w._id === (auth.user && auth.user.userId),
                        ).length),
                  )
                  .map((owner) => (
                    <CheckOutModalAccordion
                      key={owner._id}
                      owner={owner}
                      expanded={expanded}
                      toggleExpanded={toggleExpanded}
                      handleModalAccordion={handleModalAccordion}
                      formattedDueDate={formattedDueDate}
                      handleCheckout={handleCheckout}
                      handleJoinWaitlist={handleJoinWaitlist}
                    />
                  ))}
                {/* start accordion below */}
                {/* end Accordion above the last grid close  */}
              </Grid>
            </>
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
