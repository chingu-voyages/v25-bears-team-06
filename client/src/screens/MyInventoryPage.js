import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import InventoryCard from "../components/InventoryCard";
import getInventoryRequest from "../dataservice/getInventoryRequest";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(4)}px ${theme.spacing(2)}px`,
  },
  pageHeader: {
    paddingBottom: theme.spacing(2),
  },
  pageSubHeader: {
    paddingBottom: theme.spacing(2),
  },
}));

export default function MyInventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again later",
  );
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(
    function handleEffect() {
      async function inventoryEffect() {
        try {
          const { getInventory, message } = await getInventoryRequest({
            token,
          });
          console.log(getInventory, message);
          if (getInventory) {
            console.log(getInventory);
            setInventory(getInventory);
          } else if (
            message.includes("expired") ||
            message.includes("Authentication required")
          ) {
            setShouldRedirect(true);
          } else if (message) {
            setHasError(true);
            setErrorMessage(message);
          }
        } catch (err) {
          setHasError(true);
          setErrorMessage(err.message);
        }
      }
      inventoryEffect().catch((err) => {
        setHasError(true);
        setErrorMessage(err.message);
      });
    },
    [token],
  );

  const classes = useStyles();
  return (
    <main className={classes.root}>
      {shouldRedirect && <Redirect to="/login" />}
      {hasError && <div className={classes.errorDiv}>{errorMessage}</div>}
      <Typography className={classes.pageHeader} variant="h4" component="h1">
        My Inventory
      </Typography>
      <Typography
        className={classes.pageSubHeader}
        variant="body1"
        component="p"
      >
        Books in your inventory are visible by the community.
      </Typography>
      <Typography
        className={classes.pageSubHeader}
        variant="body1"
        component="p"
      >
        Number of Books in Inventory: {inventory && inventory.length}
      </Typography>
      {inventory && inventory.length && (
        <section>
          {inventory.map((item) => (
            <InventoryCard
              key={item._id}
              googleId={item.book.googleId}
              title={item.book.title}
              authors={item.book.authors}
              checkoutData={item.checkoutData}
              isAvailable={item.isAvailable}
            />
          ))}
        </section>
      )}
    </main>
  );
}
