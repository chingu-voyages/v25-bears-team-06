import React from "react";
import clsx from "clsx";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "5px",
  },
  plain: {
    backgroundColor: "white",
    color: "black",
    border: "1px solid black",
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: "white",
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: "white",
  },
  alertText: {
    fontWeight: 500,
    fontSize: "0.9rem",
  },
  icon: {
    color: "white",
    paddingRight: "10px",
  },
}));
export default function Alert({ severity, children }) {
  const classes = useStyles();

  const AlertIcon = () => {
    let icon = <div />;
    if (severity === "success") {
      icon = <CheckCircleOutlineIcon className={classes.icon} />;
    } else if (severity === "error") {
      icon = <ErrorOutlineIcon className={classes.icon} />;
    }

    return icon;
  };
  // const AlertIcon = <ErrorOutlineIcon style={{ color: "white" }} />;
  let alertClass = classes.plain;
  if (severity === "success") {
    alertClass = classes.success;
  } else if (severity === "error") {
    alertClass = classes.error;
  }
  return (
    <div className={clsx(classes.container, alertClass)}>
      <AlertIcon />
      <Typography variant="body2" className={classes.alertText}>
        {children}
      </Typography>
    </div>
  );
}