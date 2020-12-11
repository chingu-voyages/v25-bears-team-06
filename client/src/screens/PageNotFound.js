import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  pageContainer: {
    maxWidth: 1400,
    height: "60vh",
    margin: "0 auto",
    display: "flex",
    flexFlow: "column",
  },
  errorImage: {
    marginTop: "3rem",
    height: "100%",
    objectFit: "contain",
  },
}));

const PageNotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.pageContainer}>
      <img
        src="/images/error-img.png"
        alt="Page Not Found Sign"
        className={classes.errorImage}
      />
    </div>
  );
};

export default PageNotFound;
