import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import dummyData from "../dummyData";

// search results styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    // color: theme.palette.text.secondary,
  },
}));

// Display Search Results in a Grid

const BasicSearchResultsPage = () => {
  const classes = useStyles();

  return (
    <div>
      <h1>page to display basic search results</h1>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justify="flex-start"
      >
        {dummyData.map((book) => (
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h3>{book.name}</h3>
              <p>{book.author}</p>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BasicSearchResultsPage;
