import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1rem 0",
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: "100%",
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
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    border: "1px solid #ddd",
  },
  boldText: {
    fontWeight: 500,
  },
  infoText: {
    color: theme.palette.info.main,
  },
}));

export default function CheckedOutCard({
  title,
  googleId,
  authors,
  publishedDate,
  owner,
  dueDate,
}) {
  const classes = useStyles();
  const thumbnail = `http://books.google.com/books/content?id=${googleId}&printsec=frontcover&img=1&zoom=1&source=gbs_api`;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item xs={3} md={2} className={classes.imageContainer}>
            <img className={classes.img} alt="complex" src={thumbnail} />
          </Grid>
          <Grid item xs={9} container className={classes.infoContainer}>
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
        </Grid>

        <br />
        <Typography variant="body1">
          <span className={classes.boldText}>Owned by: &nbsp;</span> {owner}{" "}
        </Typography>
        <Typography variant="body1">
          <span className={classes.boldText}>Due by: &nbsp;</span>{" "}
          <span className={classes.infoText}>{dueDate}</span>
        </Typography>
      </Card>
    </div>
  );
}
