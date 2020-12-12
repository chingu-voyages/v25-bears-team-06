import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Card,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { format } from "date-fns";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import useMutation from "../../dataservice/useMutation";
import { RETURN_BOOK, REMOVE_BOOK } from "../../dataservice/mutations";
import { AuthContext } from "../../Context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1rem 0",
  },
  card: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "100%",
  },
  bookInfoContainer: {
    display: "flex",
    flexFlow: "row nowrap",
  },
  bookThumbContainer: {
    width: 128,
    height: 128,
    alignItems: "center",
    verticalAlign: "middle",
    justifyContent: "center",
    position: "relative",
    display: "inline-flex",
  },
  bookThumb: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    border: "1px solid #ddd",
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
    marginTop: "0.8rem",
    boxShadow: "none",
  },
  availableSummaryContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: 0,
    cursor: "default",
    [theme.breakpoints.down("xs")]: {
      flexFlow: "column nowrap",
      alignItems: "flex-start",
    },
  },
  availabilitySummaryText: {
    color: theme.palette.success.dark,
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1),
      marginBottom: 0,
      marginLeft: 0,
    },
  },
  boldText: {
    fontWeight: 500,
  },
  availabilitySummaryBtn: {
    margin: "theme.spacing(1)",
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.error.light,
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1),
      marginLeft: 0,
    },
  },
  checkedOutSummaryContainer: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: 0,
    cursor: "default",
    [theme.breakpoints.down("xs")]: {
      flexFlow: "column nowrap",
      paddingTop: theme.spacing(1),
      alignItems: "flex-start",
    },
  },
  checkedOutSummaryTextContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "none",
  },
  textRow: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  checkedOutSummaryBtn: {
    margin: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(1),
      marginLeft: 0,
    },
  },
  accordionDetails: {
    padding: 0,
    marginLeft: theme.spacing(2),
    backgroundColor: "gold",
  },
  accordionDetailsFlex: {
    display: "flex",
    // flexFlow: "row",
    alignItems: "center",
    color: "purple",
    justifyContent: "space-between",
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
    <div className={classes.root}>
      <Card className={classes.card}>
        <div className={classes.bookInfoContainer}>
          <div className={classes.bookThumbContainer}>
            <img
              src={`http://books.google.com/books/content?id=${googleId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
              alt="book cover"
              className={classes.bookThumb}
            />
          </div>
          <div className={classes.bookInfo}>
            <Typography variant="body1">{title}</Typography>
            {authors && <Typography variant="body2">by {authors}</Typography>}
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
                <AccordionSummary
                  classes={{ content: classes.availableSummaryContainer }}
                >
                  <Typography
                    className={classes.availabilitySummaryText}
                    variant="body1"
                  >
                    Available for checkout
                  </Typography>
                  <Button
                    className={classes.availabilitySummaryBtn}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={toggleExpanded(id)}
                    disableElevation
                  >
                    Remove
                  </Button>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                  <div className={classes.accordionDetailsFlex}>
                    <Typography variant="h6">Confirm Removal</Typography>

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
                  </div>
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
                    content: classes.checkedOutSummaryContainer,
                  }}
                >
                  <div className={classes.checkedOutSummaryTextContainer}>
                    <div className={classes.textRow}>
                      <Typography variant="body1" className={classes.boldText}>
                        Checked out by: &nbsp;
                      </Typography>
                      <Typography variant="body1" className={classes.infoText}>
                        {checkoutData.user.displayName}
                      </Typography>
                    </div>
                    <div className={classes.textRow}>
                      <Typography variant="body1" className={classes.boldText}>
                        Due by: &nbsp;
                      </Typography>
                      <Typography variant="body1">
                        {format(+checkoutData.dueDate, "PPPP")}
                      </Typography>
                    </div>
                  </div>

                  <Button
                    className={classes.checkedOutSummaryBtn}
                    variant="contained"
                    disableElevation
                    color="primary"
                  >
                    Mark as Returned
                  </Button>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                  <div className={classes.accordionDetailsFlex}>
                    <Typography variant="h6">Confirm Return</Typography>
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
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
