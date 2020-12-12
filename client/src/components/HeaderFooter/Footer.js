import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  footer: {
    color: theme.palette.text.secondary,
    width: "100%",
    marginTop: "2rem",
    height: 40,
    zIndex: theme.zIndex.modal + 1,
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Bears 6 | Voyage 25
      </Typography>
    </footer>
  );
};

export default Footer;
