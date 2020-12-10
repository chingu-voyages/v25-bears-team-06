/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Link,
  Avatar,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { AuthContext } from "../Context";
import { LOGIN } from "../dataservice/mutations";
import useMutation from "../dataservice/useMutation";

const useStyles = makeStyles((theme) => ({
  loginContentContainer: {
    display: "flex",
    flexFlow: "column-reverse nowrap",
    maxWidth: 1200,
    margin: "auto",
    padding: "1rem",
    [theme.breakpoints.up("sm")]: {
      flexFlow: "row nowrap",
    },
  },
  formContainer: {
    width: "40%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  avatar: {
    margin: "0.5rem auto",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.primary,
  },
  formHeader: {
    textAlign: "center",
    marginBottom: 0,
  },
  form: {
    display: "flex",
    margin: "0 auto",
    flexFlow: "column nowrap",
    width: "100%",
  },
  formTextField: {
    margin: `${theme.spacing(4)}px auto 0 auto`,
    width: "80%",
  },
  formButtonContainer: {
    margin: `${theme.spacing(4)}px auto`,
    width: "80%",
    textAlign: "center",
  },
  formButton: {
    width: "100%",
  },
  formButtonHelperText: {
    paddingTop: "1rem",
    textAlign: "center",
  },
  loginImageContainer: {
    margin: `${theme.spacing(4)}px auto`,
    minHeight: "20vh",
    background: `linear-gradient(to top right, rgba(255, 255, 255, 0.3), rgba(255, 230, 240, 0.2)), url("/images/library-image.jpg") no-repeat center center/cover`,
    width: "60%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: "1rem",
    },
  },
  imgTextContainer: {
    width: "80%",
    margin: "auto",
  },
  imgText: {
    textAlign: "center",
    marginTop: theme.spacing(4),
    padding: "2rem",
  },
  snackbarContainer: {
    width: "100%",
    position: "relative",
    padding: 0,
  },
  snackbar: {
    position: "absolute",
    top: 10,
    width: "100%",
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [homeRedirect, setHomeRedirect] = useState(false);
  const auth = useContext(AuthContext);

  const [login, { data, loading, error }] = useMutation(LOGIN.mutation);

  // Snackbar function
  const [alert, setAlert] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    if (data) {
      const { email, displayName, token, userId } = data.login;
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("displayName", displayName);
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("userId", userId);
      auth.setUser({ email, token, displayName, userId });
      setAlert({
        open: true,
        message: "Login Successful! Redirecting...",
      });
      window.setTimeout(() => {
        setHomeRedirect(true);
      }, 1000);
    } else if (error) {
      setAlert({
        open: true,
        message: error,
      });
    }
  }, [data, error]);

  function handleChange({ target: { name, value } }) {
    switch (name) {
      case "login-email":
        setLoginEmail(value);
        break;
      case "login-password":
        setLoginPassword(value);
        break;
      default:
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(LOGIN.variables({ email: loginEmail, password: loginPassword }));
  }

  return (
    <div className={classes.page}>
      {homeRedirect && <Redirect to="/" />}
      <Paper className={classes.loginContentContainer}>
        <div className={classes.formContainer}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography className={classes.formHeader} variant="h5">
            Log In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="login-email"
              name="login-email"
              label="E-mail"
              placeholder="E-mail"
              type="email"
              autoFocus
              value={loginEmail}
              onChange={handleChange}
              required
              variant="outlined"
              className={classes.formTextField}
            />
            <TextField
              id="login-password"
              name="login-password"
              label="Password"
              placeholder="password"
              type="password"
              value={loginPassword}
              onChange={handleChange}
              required
              variant="outlined"
              className={classes.formTextField}
            />
            <div className={classes.formButtonContainer}>
              <Button
                className={classes.formButton}
                disabled={loginPassword.length < 1}
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
              >
                Log In
              </Button>
            </div>
            <div className={classes.snackbarContainer}>
              {loading && (
                <CircularProgress
                  color="primary"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "calc(50% - 20px)",
                    marginTop: "-20px",
                  }}
                />
              )}
              <Snackbar
                classes={{
                  root: classes.snackbar,
                }}
                open={alert.open}
                message={alert.message}
                onClose={() => setAlert({ ...alert, open: false })}
                autoHideDuration={5000}
              >
                <Alert
                  variant="filled"
                  severity={(data && "success") || "error"}
                >
                  {alert.message}
                </Alert>
              </Snackbar>
            </div>
            <div className={classes.formButtonContainer}>
              <Typography
                className={classes.formButtonHelperText}
                variant="body2"
              >
                Not a member?{" "}
                <Link href="/signup" underline="none">
                  Sign Up
                </Link>
              </Typography>
            </div>
          </form>
        </div>
        <div className={classes.loginImageContainer}>
          <div className={classes.imgTextContainer}>
            <Typography variant="h6" className={classes.imgText}>
              {/* Text placeholder  */}
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
}
