import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { Paper, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { format } from "date-fns";
import { AuthContext } from "../Context";
import { RETURN_BOOK } from "../dataservice/mutations";
import useMutation from "../dataservice/useMutation";

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
}) {
  const auth = useContext(AuthContext);

  const [returnBook, { data, error, loading }] = useMutation(
    RETURN_BOOK.mutation,
    auth.user.token,
  );

  const handleReturn = async () => {
    await returnBook(
      RETURN_BOOK.variables({
        ownershipId: id,
        returnDate: checkoutData.returnDate || "",
        condition: checkoutData.condition || "",
      }),
    );
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
            >
              Remove
            </Button>
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
