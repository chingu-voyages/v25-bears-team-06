import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
// Pages/Components to Import
import UploadBookPage from "./UploadBookPage";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: "0.5rem",
    maxWidth: 1440,
    minHeight: "80vh",
    margin: "auto",
  },
  welcomeSection: {
    padding: "0.5rem",
  },
  userName: {
    color: theme.palette.secondary.dark,
    fontWeight: 500,
  },
  navSection: {
    padding: "0.5rem",
    marginRight: "1rem",
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
  },
  menuItem: {
    ...theme.typography.tab,
    display: "flex",
    alignItems: "center",
  },
  pagesSection: {
    padding: "0.5rem",
  },
  borrowingContainer: {
    padding: "0.5rem",
    marginBottom: "1rem",
    borderTop: "0.2rem solid",
    borderTopColor: theme.palette.primary.main,
  },
  inventoryContainer: {
    padding: "0.5rem",
    borderTop: "0.2rem solid",
    borderTopColor: theme.palette.primary.main,
  },
}));

const DashboardPage = () => {
  const classes = useStyles();

  return (
    <Router>
      <Paper className={classes.pageContainer}>
        <Grid container>
          <Grid xs={12} className={classes.welcomeSection}>
            <Typography variant="h5" color="primary" gutterBottom>
              {" "}
              My Dashboard
            </Typography>
            <Typography variant="body2">
              {" "}
              Welcome, <span className={classes.userName}>userName</span>
            </Typography>
          </Grid>
          <Grid xs={12} md={2} className={classes.navSection}>
            <Paper>
              <Grid className={classes.borrowingContainer}>
                <Typography variant="h6" gutterBottom>
                  My Borrowing
                </Typography>
                <List>
                  <ListItem divider button component={Link} to="/#">
                    <ListItemText
                      className={classes.menuItem}
                      disableTypography
                    >
                      Check Out (#)
                    </ListItemText>{" "}
                  </ListItem>
                  <ListItem button component={Link} to="/#">
                    <ListItemText
                      className={classes.menuItem}
                      disableTypography
                    >
                      Waitlist (#)
                    </ListItemText>{" "}
                  </ListItem>
                </List>
              </Grid>
            </Paper>

            <Paper>
              <Grid className={classes.inventoryContainer}>
                <Typography variant="h6" gutterBottom>
                  My Inventory
                </Typography>
                <List>
                  <ListItem divider button component={Link} to="/#">
                    <ListItemText
                      className={classes.menuItem}
                      disableTypography
                    >
                      View Inventory (#)
                    </ListItemText>{" "}
                  </ListItem>
                  <ListItem button component={Link} to="/dashboard/uploadbook">
                    <ListItemText
                      className={classes.menuItem}
                      disableTypography
                    >
                      Upload Book &nbsp; <AddBoxIcon color="primary" />
                    </ListItemText>
                  </ListItem>
                </List>
              </Grid>
            </Paper>
          </Grid>

          {/* Router Page Area  */}

          <Grid xs={12} md={9} className={classes.pagesSection}>
            <Switch>
              <Route path="/dashboard/uploadbook" component={UploadBookPage} />
            </Switch>
          </Grid>
        </Grid>
      </Paper>
    </Router>
  );
};

export default DashboardPage;
