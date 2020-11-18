import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "1rem",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

// card template for book output
const UploadBookCard = (props) => {
  const classes = useStyles();
  const { title, author, thumbnail, rating, language } = props;

  // functions for checkboxes

  const [state, setState] = useState(true);

  const handleChange = (event) => {
    setState({ state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row">
        {/* checkbox on left */}
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkingBox}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label="Add"
        />
        {/* book information section on right */}
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={thumbnail} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    Title: {title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Language: {language}
                  </Typography>
                  <Typography variant="body2" color="textPrimary">
                    Rating: {rating}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: "pointer" }}>
                    by {author}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default UploadBookCard;
