import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const Pagination = ({ booksPerPage, totalBooks, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <Grid container direction="row" justify="center" alignItems="center">
        {pageNumbers.map((number) => (
          <Grid item xs key={number}>
            <Button color="primary" onClick={() => paginate(number)}>
              {number}
            </Button>
          </Grid>
        ))}
      </Grid>
    </nav>
  );
};

export default Pagination;
