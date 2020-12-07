import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1rem",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 700,
  },
  imageContainer: {
    width: 128,
    height: 128,
    alignItems: "center",
    verticalAlign: "middle",
    justifyContent: "center",
    position: "relative",
    display: "inline-flex",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  btnContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    margin: 2,
    [theme.breakpoints.down("xl")]: {
      width: "100%",
      height: "3rem",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: "2.5rem",
    },
  },
}));

// card template for book output
const UploadBookCard = (props) => {
  const classes = useStyles();
  const {
    title,
    author,
    publishedDate,
    uploadBook,
    thumbnail,
    isLoading,
  } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={3} className={classes.imageContainer}>
            <img className={classes.img} alt="book cover" src={thumbnail} />
          </Grid>
          <Grid item xs={9} sm={6} container className={classes.infoContainer}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {publishedDate}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">by {author}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container className={classes.btnContainer} sm={3}>
            {!isLoading ? (
              <Button
                onClick={uploadBook}
                className={classes.btn}
                variant="contained"
                color="primary"
                disableElevation
              >
                Upload
              </Button>
            ) : (
              <CircularProgress color="primary" />
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default UploadBookCard;
