/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Link,
  Button,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
// import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { AuthContext } from "../Context";
import { SIGNUP } from "../dataservice/mutations";
import useMutation from "../dataservice/useMutation";
import Alert from "../components/Alert";

const useStyles = makeStyles((theme) => ({
  loginContentContainer: {
    display: "flex",
    flexFlow: "column-reverse nowrap",
    maxWidth: 1200,
    margin: "auto",
    padding: "1rem",
    [theme.breakpoints.up("sm")]: {
      flexFlow: "row-reverse nowrap",
    },
  },
  formContainer: {
    position: "relative",
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
    position: "relative",
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
    background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 230, 240, 0.5)), url("/images/holding-books.jpg") no-repeat center center/cover`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "60%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: "1rem",
    },
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  imgTextContainer: {
    width: "80%",
    margin: "auto",
    padding: "2rem",
    textAlign: "center",
  },
  imgText: {
    // textAlign: "center",
    // marginTop: "theme.spacing(4)",
  },
  snackbarContainer: {
    position: "relative",
    padding: 0,
    margin: "0 auto",
  },
  snackbar: {
    position: "absolute",
    top: 10,
    width: "100%",
  },
}));

export default function SignupPage() {
  const classes = useStyles();

  const auth = useContext(AuthContext);
  const [signup, { data, loading, error }] = useMutation(SIGNUP.mutation);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupDisplayName, setSignupDisplayName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [homeRedirect, setHomeRedirect] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    if (data) {
      const { email, displayName, token, userId } = data.createAccount;
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("displayName", displayName);
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("userId", userId);
      auth.setUser({ email, displayName, token, userId });
      setAlert({
        open: true,
        message: "Signup Successful! Redirecting...",
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
      case "signup-email":
        setSignupEmail(value);
        break;
      case "signup-display-name":
        setSignupDisplayName(value);
        break;
      case "signup-password":
        setSignupPassword(value);
        break;
      case "signup-confirm-password":
        setSignupConfirmPassword(value);
        break;
      default:
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    signup(
      SIGNUP.variables({
        email: signupEmail,
        displayName: signupDisplayName,
        password: signupPassword,
        confirmPassword: signupConfirmPassword,
      }),
    );
  }

  return (
    <>
      {homeRedirect && <Redirect to="/dashboard" />}
      <Paper className={classes.loginContentContainer}>
        <div className={classes.formContainer}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography className={classes.formHeader} variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="signup-email"
              name="signup-email"
              label="E-mail"
              placeholder="E-mail"
              type="email"
              autoFocus
              value={signupEmail}
              onChange={handleChange}
              required
              variant="outlined"
              className={classes.formTextField}
            />
            <TextField
              id="signup-display-name"
              name="signup-display-name"
              label="Display Name"
              type="text"
              placeholder="display name"
              value={signupDisplayName}
              onChange={handleChange}
              required
              variant="outlined"
              className={classes.formTextField}
            />
            <TextField
              id="signup-password"
              name="signup-password"
              label="Password"
              placeholder="password"
              type="password"
              value={signupPassword}
              onChange={handleChange}
              required
              variant="outlined"
              className={classes.formTextField}
            />
            <TextField
              id="signup-confirm-password"
              name="signup-confirm-password"
              label="Confirm Password"
              placeholder="confirm password"
              type="password"
              value={signupConfirmPassword}
              onChange={handleChange}
              required
              variant="outlined"
              className={classes.formTextField}
            />
            <div className={classes.formButtonContainer}>
              <Button
                className={classes.formButton}
                disabled={
                  signupPassword.length < 1 ||
                  signupPassword !== signupConfirmPassword
                }
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
              >
                Submit
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
                <div>
                  <Alert severity={(data && "success") || "error"}>
                    {alert.message}
                  </Alert>
                </div>
              </Snackbar>
            </div>
            <div className={classes.formButtonContainer}>
              <Typography
                className={classes.formButtonHelperText}
                variant="body2"
              >
                Already a member?{" "}
                <Link href="/login" underline="none">
                  Log In
                </Link>
              </Typography>
            </div>
          </form>
        </div>
        <div className={classes.loginImageContainer}>
          <div className={classes.imgTextContainer}>
            <Typography variant="h3" gutterBottom className={classes.imgText}>
              Start sharing.
            </Typography>
            <Typography variant="h6" gutterBottom className={classes.imgText}>
              Create an account to borrow or loan books.
            </Typography>
            <Typography variant="body2" className={classes.imgText}>
              <Link href="/about" underline="none">
                Learn more
              </Link>
            </Typography>
          </div>
        </div>
      </Paper>
    </>
  );
}
