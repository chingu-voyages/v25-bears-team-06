import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";

// Modal imports
import Dialog from "@material-ui/core/Dialog";
import CheckOutModal from "./CheckOutModal";

// auth import
import { AuthContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1rem",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 900,
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
  btn: {
    margin: 2,
    [theme.breakpoints.down("xl")]: {
      marginBottom: "1rem",
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "0.3rem",
      marginLeft: "0.3rem",
      width: "46%",
    },
  },
}));

// card template for book output
const SingleBookCard = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { id, title, authors, googleId, publishedDate, owners } = props;

  // Modal actions
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // auth state
  // is user logged in?
  const auth = useContext(AuthContext);
  const loggedIn = auth && auth.user && auth.user.token;

  const thumbnail = `http://books.google.com/books/content?id=${googleId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={3} md={2} className={classes.imageContainer}>
            <img className={classes.img} alt="complex" src={thumbnail} />
          </Grid>
          <Grid item xs={9} sm={6} container className={classes.infoContainer}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {title}
                </Typography>
                {publishedDate && (
                  <Typography variant="body2">{publishedDate}</Typography>
                )}
              </Grid>
              <Grid item>
                {authors && (
                  <Typography variant="body2">by {authors}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container className={classes.btnContainer} sm={3}>
            <Button
              component={Link}
              to={`/bookinfo/${id}`}
              className={classes.btn}
              variant="contained"
              color="primary"
              disableElevation
            >
              Learn More
            </Button>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleOpen}
            >
              Checkout
            </Button>
          </Grid>
          {/* Modal  */}
          <Dialog open={open} onClose={handleClose}>
            <CheckOutModal
              title={title}
              thumbnail={thumbnail}
              publishedDate={publishedDate}
              authors={authors}
              loggedIn={loggedIn}
              owners={owners}
            />
          </Dialog>
        </Grid>
      </Paper>
    </div>
  );
};

export default SingleBookCard;
