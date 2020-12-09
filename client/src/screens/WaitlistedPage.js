import React from "react";
import { Typography, Grid, CircularProgress } from "@material-ui/core/";
import SingleBookCard from "../components/SingleBookCard";

const useStyles = makeStyles({
  pageContainer: {
    maxWidth: 1200,
    margin: "auto",
  },
});

const WaitlistedPage = () => {
  const classes = useStyles();

  const [waitlistedBooks, setWaitlistedBooks] = useState([]);

  return (
    <div>
      <Grid className={classes.pageContainer} container direction="column">
        <Typography variant="h3">Books you have waitlisted for</Typography>
        <Typography variant="h5">Total: #</Typography>

        {/* Display waitlisted books  */}
        {loading && (
          <CircularProgress color="primary" style={{ padding: "2.5rem" }} />
        )}

        {!loading &&
          (bookResults.length === 0 ? (
            <>
              <Typography variant="subtitle1" gutterBottom>
                You are not currently on a waitlist for any books. <br />
              </Typography>
            </>
          ) : (
            currentBooks.map((book) => (
              <SingleBookCard
                key={book._id}
                id={book._id}
                title={book.title}
                authors={book.authors}
                googleId={book.googleId}
                publishedDate={book.publishedDate}
                owners={book.owners}
                bookResults={bookResults}
                setBookResults={setBookResults}
              />
            ))
          ))}
      </Grid>
    </div>
  );
};

export default WaitlistedPage;
