import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, Typography } from "@material-ui/core";
import InventoryCard from "../components/InventoryCard";
import { AuthContext } from "../Context";
import useQuery from "../dataservice/useQuery";
import { GET_INVENTORY } from "../dataservice/queries";

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
  // state
  const [inventory, setInventory] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  // context
  const auth = useContext(AuthContext);
  // useQuery hook
  const { data, error, loading } = useQuery({
    query: GET_INVENTORY.query,
    token: auth && auth.user && auth.user.token,
  });

  useEffect(() => {
    if (data) {
      setInventory(data.getInventory);
    } else if (error) {
      setAlert({ open: true, message: error, backgroundColor: "red" });
    }
  }, [JSON.stringify(data), JSON.stringify(error)]);

  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{ style: { backgroundColor: alert.backgroundColor } }}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={5000}
      />{" "}
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
              id={item._id}
              googleId={item.book.googleId}
              title={item.book.title}
              authors={item.book.authors}
              checkoutData={
                item.checkoutData.length > 0
                  ? item.checkoutData[item.checkoutData.length - 1]
                  : null
              }
              isAvailable={item.isAvailable}
              inventory={inventory}
              setInventory={setInventory}
              setAlert={setAlert}
            />
          ))}
        </section>
      )}
    </main>
  );
}
