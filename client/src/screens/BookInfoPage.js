import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1rem",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
  },
  imageContainer: {
    alignItems: "center",
    verticalAlign: "middle",
    justifyContent: "center",
    position: "relative",
    display: "inline-flex",
    // backgroundColor: "lime",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  infoContainer: {
    // backgroundColor: "yellow",
  },
  btnContainer: {
    // backgroundColor: "blue",
  },
  btn: {
    // backgroundColor: "orange",
    margin: 2,
    [theme.breakpoints.down("xl")]: {
      // backgroundColor: "black",
      width: "100%",
      height: "3rem",
    },
  },
}));

// Template for book info page
const BookInfoPage = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const {
    title,
    author,
    thumbnail,
    description,
    mainCategory,
    pageCount,
    publishedDate,
    publisher,
  } = props;

  // back to search results
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <Button onClick={handleGoBack}> Back to search results</Button>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={3} md={2} className={classes.imageContainer}>
            <img className={classes.img} alt="book cover" src={thumbnail} />
          </Grid>
          <Grid item xs={9} sm={6} container className={classes.infoContainer}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Title: {title} Example Title
                </Typography>
                <Typography variant="body2">
                  Category: {mainCategory} Business & Economics
                </Typography>
                <Typography variant="body2">
                  Page Count: {pageCount} 321
                </Typography>
                <Typography variant="body2">
                  Publisher: {publisher} Random House
                </Typography>
                <Typography variant="body2">
                  Published: {publishedDate} 2005-01-01
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  by {author} some Person and some other Person
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container className={classes.btnContainer} sm={3}>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              disableElevation
            >
              Checkout
            </Button>
          </Grid>
          <Grid item container>
            <Typography variant="subtitle1">Description</Typography>{" "}
            <Typography variant="body2">
              {description}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              nihil rem aliquam repudiandae soluta itaque voluptatem quam
              officia facilis dicta. Molestias eos repellendus cum aut qui
              officia, nesciunt, doloribus enim saepe quia odio quos. Totam
              dicta atque molestias vitae excepturi?
              <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consequuntur reiciendis magni molestias impedit necessitatibus
              ipsam debitis at labore ex iste, tenetur architecto eos cupiditate
              suscipit aut in aperiam reprehenderit dolorum! Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Accusamus tempore earum
              officia asperiores repudiandae quibusdam nam nemo voluptatem,
              excepturi qui aliquid ea labore deleniti iste a corporis?
              Distinctio aperiam tempora officia aspernatur, labore cupiditate
              quas, accusantium impedit, quibusdam minima nihil?
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default BookInfoPage;
