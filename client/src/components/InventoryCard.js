import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  inventoryItemInfo: {
    display: "flex",
    flexFlow: "row nowrap",
  },
  inventoryItemImage: {
    margin: theme.spacing(1),
    border: `1px solid black`,
  },
  inventoryItemText: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    padding: theme.spacing(2),
  },
  inventoryItemStatusAvailable: {
    width: "100%",
  },
  inventoryStatusAccordion: {
    width: "100%",
  },
  inventoryStatusAccordionSummary: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: "100%",
  },
  inventoryItemStatusText: {
    margin: theme.spacing(2),
  },
  inventoryItemStatusBtn: {
    margin: theme.spacing(2),
  },
  inventoryUnavailableText: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
  },
  inventoryUnavailableButtonContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  inventoryUnavailableButton: {
    width: "100%",
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
}) {
  const auth = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);

  const [
    returnBook,
    { data: returnData, error: returnError, loading: returnLoading },
  ] = useMutation(RETURN_BOOK.mutation, auth.user.token);

  useEffect(() => {
    if (returnData) {
      return setInventory(() =>
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
    if (returnLoading) {
      return console.log(returnLoading);
    }
    return console.log(returnError);
  }, [returnData, returnError, returnLoading, inventory, setInventory]);

  const handleReturn = async () => {
    await returnBook(
      RETURN_BOOK.variables({
        ownershipId: id,
        returnDate: checkoutData.returnDate || "",
        condition: checkoutData.condition || "",
      }),
    );
  };

  const [
    removeBook,
    { data: removeData, error: removeError, loading: removeLoading },
  ] = useMutation(REMOVE_BOOK.mutation, auth.user.token);

  useEffect(() => {
    if (removeData) {
      return setInventory(() => inventory.filter((item) => item._id !== id));
    }
    if (removeLoading) {
      console.log(removeLoading);
    }
    return console.log(removeError);
  }, [removeData, removeError, removeLoading, inventory, setInventory]);

  const handleRemove = async () => {
    await removeBook(REMOVE_BOOK.variables({ ownershipId: id }));
  };

  const toggleExpanded = (currentAccordion) => (event, isExpanded) => {
    setExpanded(isExpanded ? currentAccordion : false);
  };

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.inventoryItemInfo}>
        <div className={classes.inventoryItemImage}>
          <img
            src={`http://books.google.com/books/content?id=${googleId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
            alt="book cover"
          />
        </div>
        <div className={classes.inventoryItemText}>
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
          <div className={classes.inventoryItemStatusAvailable}>
            <Accordion
              className={classes.inventoryStatusAccordion}
              expanded={expanded === id}
              onChange={toggleExpanded(id)}
            >
              <AccordionSummary
                classes={{ content: classes.inventoryStatusAccordionSummary }}
              >
                <Typography
                  className={classes.inventoryItemStatusText}
                  variant="body1"
                  component="p"
                >
                  Available
                </Typography>
                <Button
                  className={classes.inventoryItemStatusBtn}
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
                    <IconButton
                      className={classes.confirm}
                      onClick={handleRemove}
                    >
                      <CheckCircleIcon className={classes.iconBtn} />
                    </IconButton>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>
        ) : (
          <div>
            <div className={classes.inventoryUnavailableText}>
              <Typography variant="body1" component="p">
                Checked out by:
              </Typography>
              <Typography variant="body1" component="p">
                {checkoutData.user.displayName}
              </Typography>
            </div>
            <div className={classes.inventoryUnavailableText}>
              <Typography variant="body1" component="p">
                Due by:
              </Typography>
              <Typography variant="body1" component="p">
                {format(+checkoutData.dueDate, "PPPP")}
              </Typography>
            </div>
            <div className={classes.inventoryUnavailableButtonContainer}>
              <Button
                onClick={handleReturn}
                className={classes.inventoryUnavailableButton}
                variant="contained"
              >
                Mark as Returned
              </Button>
            </div>
          </div>
        )}
      </div>
    </Paper>
  );
}
