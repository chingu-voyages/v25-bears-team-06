/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthContext } from "../Context";
import { GET_USER } from "../dataservice/queries";
import useQuery from "../dataservice/useQuery";
// Pages/Components to Import
import UploadBookPage from "./UploadBookPage";
import WaitlistedPage from "./WaitlistedPage";
import CheckedOutPage from "./CheckedOutPage";
import MyInventoryPage from "./MyInventoryPage";
import DefaultDashboard from "../components/Dashboard/DefaultDashboard";
import Alert from "../components/Alert";

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
    whiteSpace: "nowrap",
  },
  pagesSection: {
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    margin: "0 auto",
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
  spinner: {
    margin: "0 auto",
  },
  inlineSpinner: {
    display: "inline",
    maxWidth: "15px",
    maxHeight: "15px",
    padding: "0 5px",
    margin: 0,
  },
  snackbarContainer: {
    width: "100%",
    position: "relative",
    padding: 0,
  },
  snackbar: {
    position: "absolute",
    width: "100%",
    top: 0,
  },
}));

const DashboardPage = () => {
  const classes = useStyles();

  const auth = useContext(AuthContext);
  const { token, displayName } = auth.user;

  const { data, loading, error } = useQuery({
    query: GET_USER.query,
    token,
    onTokenExpired: () => auth.onTokenExpired(),
  });
  const [userData, setUserData] = useState({
    owns: [],
    checkedOut: [],
    waitlisted: [],
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    if (data) {
      setUserData(data.getUser);
      setAlert({
        open: true,
        message: "Syncing Data...",
      });
    } else if (error) {
      setAlert({
        open: true,
        message: error,
      });
    }
  }, [data, error]);

  const setInventory = (newInventory) => {
    setUserData({
      ...userData,
      owns: [...newInventory],
    });
  };

  const setCheckedOut = (newCheckedOut) => {
    setUserData({
      ...userData,
      checkedOut: [newCheckedOut],
    });
  };

  const setWaitlisted = (newWaitlisted) => {
    setUserData({
      ...userData,
      waitlisted: [...newWaitlisted],
    });
  };

  const addInventory = (newItem) => {
    setUserData({
      ...userData,
      owns: [newItem, ...userData.owns],
    });
  };

  return (
    <Router>
      <Paper className={classes.pageContainer}>
        <Grid container>
          <Grid item xs={12} className={classes.welcomeSection}>
            <div className={classes.snackbarContainer}>
              <Snackbar
                classes={{
                  root: classes.snackbar,
                }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
                open={alert.open}
                message={alert.message}
                onClose={() => setAlert({ ...alert, open: false })}
                autoHideDuration={(data && 1500) || 5000}
              >
                <div>
                  <Alert severity={(data && "success") || "error"}>
                    {alert.message}
                  </Alert>
                </div>
              </Snackbar>
            </div>
            <Typography variant="h5" color="primary" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1">
              Welcome, <span className={classes.userName}>{displayName}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={2} className={classes.navSection}>
            <Paper>
              <Grid className={classes.borrowingContainer}>
                <Typography variant="h6" gutterBottom>
                  My Borrowing
                </Typography>
                <List>
                  <ListItem
                    divider
                    button
                    component={Link}
                    to="/dashboard/checkedout"
                  >
                    <ListItemText
                      className={classes.menuItem}
                      disableTypography
                    >
                      Checked Out (
                      {!loading && data ? (
                        userData.checkedOut.length
                      ) : (
                        <CircularProgress
                          className={clsx(
                            classes.spinner,
                            classes.inlineSpinner,
                          )}
                          color="primary"
                        />
                      )}
                      )
                    </ListItemText>
                  </ListItem>
                  <ListItem button component={Link} to="/dashboard/waitlisted">
                    <ListItemText
                      className={classes.menuItem}
                      disableTypography
                    >
                      Waitlist (
                      {!loading && data ? (
                        userData.waitlisted.length
                      ) : (
                        <CircularProgress
                          className={clsx(
                            classes.spinner,
                            classes.inlineSpinner,
                          )}
                          color="primary"
                        />
                      )}
                      )
                    </ListItemText>
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
                  <ListItem
                    divider
                    button
                    component={Link}
                    to="/dashboard/myinventory"
                  >
                    <ListItemText
                      className={classes.menuItem}
                      disableTypography
                    >
                      Inventory (
                      {!loading && data ? (
                        userData.owns.length
                      ) : (
                        <CircularProgress
                          className={clsx(
                            classes.spinner,
                            classes.inlineSpinner,
                          )}
                          color="primary"
                        />
                      )}
                      )
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

          <Grid item xs={12} md={9} className={classes.pagesSection}>
            <Switch>
              <ProtectedRoute
                exact
                path="/dashboard"
                component={DefaultDashboard}
              />
              <ProtectedRoute
                exact
                path="/dashboard/uploadbook"
                component={() => <UploadBookPage addInventory={addInventory} />}
              />
              <ProtectedRoute
                exact
                path="/dashboard/waitlisted"
                component={() => (
                  <WaitlistedPage
                    userData={userData}
                    setUserData={setUserData}
                    checkedOut={userData.checkedOut}
                    setCheckedOut={setCheckedOut}
                    waitlisted={userData.waitlisted}
                    setWaitlisted={setWaitlisted}
                  />
                )}
              />
              <ProtectedRoute
                exact
                path="/dashboard/checkedout"
                component={CheckedOutPage}
              />
              <ProtectedRoute
                exact
                path="/dashboard/myinventory"
                component={() => (
                  <MyInventoryPage
                    inventory={userData.owns}
                    setInventory={setInventory}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </Grid>
        </Grid>
      </Paper>
    </Router>
  );
};

export default DashboardPage;
