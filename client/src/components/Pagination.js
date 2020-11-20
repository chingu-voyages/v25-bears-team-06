import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// style pagination buttons
const useStyles = makeStyles({
  pageBtn: {
    background: "linear-gradient(180deg, #3f50b5 30%, #757ce8 90%)",
    border: 0,
    marginRight: "0.2rem",
    marginBottom: 5,
    borderRadius: 5,
    color: "white",
    height: 25,
    "&:focus": {
      background: "#f50057",
    },
    // padding: "0",
  },
});

const Pagination = ({ booksPerPage, totalBooks, paginate }) => {
  const classes = useStyles();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <Grid container direction="row" justify="center" alignItems="center">
        {pageNumbers.map((number) => (
          <Grid item xs key={number}>
            <Button
              color="primary"
              className={classes.pageBtn}
              onClick={() => paginate(number)}
            >
              {number}
            </Button>
          </Grid>
        ))}
      </Grid>
    </nav>
  );
};

export default Pagination;
