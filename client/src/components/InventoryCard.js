import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { format } from "date-fns";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import useMutation from "../dataservice/useMutation";
import { RETURN_BOOK, REMOVE_BOOK } from "../dataservice/mutations";
import { AuthContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(4)}px auto`,
    maxWidth: "375px",
    [theme.breakpoints.up("md")]: {
      maxWidth: "750px",
    },
  },
  bookInfoContainer: {
    display: "flex",
    flexFlow: "row nowrap",
  },
  bookThumb: {
    margin: theme.spacing(1),
    border: `1px solid black`,
  },
  bookInfo: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  bookAvailableContainer: {
    width: "100%",
  },
  availabilityAccordion: {
    width: "100%",
  },
  availableSummary: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: "100%",
  },
  availabilitySummaryText: {
    margin: theme.spacing(2),
  },
  availabilitySummaryBtn: {
    margin: theme.spacing(2),
  },
  checkedOutSummary: {
    display: "flex",
    flexFlow: "column nowrap",
  },
  checkedOutSummaryText: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
  },
  checkedOutSummaryBtnContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  checkedOutSummaryBtn: {
    width: "100%",
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

export default function InventoryCard({
  id,
  title,
  googleId,
  authors,
  checkoutData,
  isAvailable,
  inventory,
  setInventory,
  setAlert,
}) {
  const auth = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  const [
    returnBook,
    { data: returnData, error: returnError, loading: returnLoading },
  ] = useMutation(RETURN_BOOK.mutation, auth && auth.user && auth.user.token);

  useEffect(() => {
    if (returnData) {
      setInventory(
        () =>
          inventory &&
          inventory.map((item) => {
            if (item._id === returnData.returnBook._id) {
              return {
                ...item,
                isAvailable: returnData.returnBook.isAvailable,
              };
            }
            return { ...item };
          }),
      );
    }
    if (returnError) {
      setAlert({ open: true, message: returnError, backgroundColor: "red" });
    }
  }, [
    JSON.stringify(returnData),
    JSON.stringify(returnError),
    JSON.stringify(inventory),
    setInventory,
  ]);

  const handleReturn = async () => {
    await returnBook(
      RETURN_BOOK.variables({
        ownershipId: id,
        returnDate: Date.now().toString(),
        condition: checkoutData.condition,
      }),
    );
    setExpanded(false);
  };

  const [
    removeBook,
    { data: removeData, error: removeError, loading: removeLoading },
  ] = useMutation(REMOVE_BOOK.mutation, auth && auth.user && auth.user.token);

  useEffect(() => {
    if (removeData) {
      setInventory(() => inventory.filter((item) => item._id !== id));
    }
    if (removeError) {
      setAlert({ open: true, message: removeError, backgroundColor: "red" });
    }
  }, [
    JSON.stringify(removeData),
    JSON.stringify(removeError),
    JSON.stringify(inventory),
    setInventory,
  ]);

  const handleRemove = async () => {
    await removeBook(REMOVE_BOOK.variables({ ownershipId: id }));
  };

  const toggleExpanded = (currentAccordion) => (event, isExpanded) => {
    setExpanded(isExpanded ? currentAccordion : false);
  };

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.bookInfoContainer}>
        <div className={classes.bookThumb}>
          <img
            src={`http://books.google.com/books/content?id=${googleId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
            alt="book cover"
          />
        </div>
        <div className={classes.bookInfo}>
          <Typography variant="body1" component="p">
            {title}
          </Typography>
          {authors && (
            <Typography variant="body2" component="p">
              by {authors}
            </Typography>
          )}
        </div>
      </div>
      <div>
        {isAvailable ? (
          <div className={classes.bookAvailableContainer}>
            <Accordion
              className={classes.availabilityAccordion}
              expanded={expanded === id}
              onChange={toggleExpanded(id)}
            >
              <AccordionSummary classes={{ content: classes.availableSummary }}>
                <Typography
                  className={classes.availabilitySummaryText}
                  variant="body1"
                  component="p"
                >
                  Available
                </Typography>
                <Button
                  className={classes.availabilitySummaryBtn}
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={toggleExpanded(id)}
                >
                  Remove
                </Button>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item container xs={12}>
                  <Grid item xs={9}>
                    <Typography variant="h6">Confirm Removal</Typography>
                  </Grid>
                  <Grid item container xs={3}>
                    <IconButton
                      className={classes.cancel}
                      onClick={toggleExpanded(id)}
                    >
                      <CancelIcon className={classes.iconBtn} />
                    </IconButton>
                    {removeLoading ? (
                      <CircularProgress color="primary" />
                    ) : (
                      <IconButton
                        className={classes.confirm}
                        onClick={handleRemove}
                      >
                        <CheckCircleIcon className={classes.iconBtn} />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>
        ) : (
          <div>
            <Accordion
              className={classes.availabilityAccordion}
              expanded={expanded === id}
              onChange={toggleExpanded(id)}
            >
              <AccordionSummary
                classes={{
                  content: classes.checkedOutSummary,
                }}
              >
                <div className={classes.checkedOutSummaryText}>
                  <Typography variant="body1" component="p">
                    Checked out by:
                  </Typography>
                  <Typography variant="body1" component="p">
                    {checkoutData.user.displayName}
                  </Typography>
                </div>
                <div className={classes.checkedOutSummaryText}>
                  <Typography variant="body1" component="p">
                    Due by:
                  </Typography>
                  <Typography variant="body1" component="p">
                    {format(+checkoutData.dueDate, "PPPP")}
                  </Typography>
                </div>
                <div className={classes.checkedOutSummaryBtnContainer}>
                  <Button
                    className={classes.checkedOutSummaryBtn}
                    variant="contained"
                  >
                    Mark as Returned
                  </Button>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item container xs={12}>
                  <Grid item xs={9}>
                    <Typography variant="h6">Confirm Return</Typography>
                  </Grid>
                  <Grid item container xs={3}>
                    <IconButton
                      className={classes.cancel}
                      onClick={toggleExpanded(id)}
                    >
                      <CancelIcon className={classes.iconBtn} />
                    </IconButton>
                    {returnLoading ? (
                      <CircularProgress color="primary" />
                    ) : (
                      <IconButton
                        className={classes.confirm}
                        onClick={handleReturn}
                      >
                        <CheckCircleIcon className={classes.iconBtn} />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </div>
    </Paper>
  );
}
