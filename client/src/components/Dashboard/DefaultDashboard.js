import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 4rem",
  },
  image: {
    maxWidth: "300px",
    padding: "2rem",
  },
}));

const DefaultDashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img
        className={classes.image}
        src="/images/dashboard_book_lover.svg"
        alt="undraw book lover graphic"
      />
      <Typography variant="h6">Another Day, Another Book</Typography>
    </div>
  );
};

export default DefaultDashboard;
