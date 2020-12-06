import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { AuthContext } from "../Context";
import { LOGIN } from "../dataservice/mutations";
import useMutation from "../dataservice/useMutation";

const useStyles = makeStyles((theme) => ({
  pageHeader: {
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  pageContentContainer: {
    display: "flex",
    flexFlow: "column nowrap",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      flexFlow: "row nowrap",
    },
  },
  formContainer: {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
  },
  form: {
    display: "flex",
    flexFlow: "column nowrap",
    width: "100%",
    margin: `${theme.spacing(4)}px auto`,
  },
  formTextField: {
    margin: `${theme.spacing(4)}px auto 0 auto`,
    width: "80%",
  },
  formButtonContainer: {
    margin: `${theme.spacing(4)}px auto 0 auto`,
    width: "80%",
    textAlign: "center",
  },
  formButton: {
    width: "100%",
  },
  formButtonHelperText: {
    textAlign: "center",
    marginBottom: "0.2rem",
  },
  errorDiv: {
    height: "50px",
  },
  loginImageContainer: {
    maxWidth: "500px",
    margin: `${theme.spacing(4)}px auto`,
    width: "80%",
  },
  loginImage: {
    width: "100%",
  },
}));

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [homeRedirect, setHomeRedirect] = useState(false);
  const auth = useContext(AuthContext);

  const [login, { data, loading, error }] = useMutation(LOGIN.mutation);

  useEffect(() => {
    if (data) {
      const { email, displayName, token, userId } = data.login;
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("displayName", displayName);
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("userId", userId);
      auth.setUser({ email, token, displayName, userId });
      setHomeRedirect(true);
    }
  }, [data, auth]);

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

    // setShouldSubmit(true);
  }

  const classes = useStyles();

  return (
    <>
      {homeRedirect && <Redirect to="/" />}
      <Typography className={classes.pageHeader} variant="h3" component="h1">
        Login
      </Typography>
      <div className={classes.pageContentContainer}>
        <div className={classes.formContainer}>
          {error && <div className={classes.errorDiv}>{error}</div>}
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
              {(!loading && (
                <Button
                  className={classes.formButton}
                  disabled={loginPassword.length < 1}
                  type="submit"
                  variant="contained"
                >
                  Log In
                </Button>
              )) || <CircularProgress color="primary" />}
            </div>
            <div className={classes.formButtonContainer}>
              <Typography
                className={classes.formButtonHelperText}
                variant="body2"
              >
                Not a member?
              </Typography>
              <Button
                className={classes.formButton}
                variant="contained"
                component={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
        <div className={classes.loginImageContainer}>
          <img
            className={classes.loginImage}
            src="/images/library-image.png"
            alt="library"
          />
        </div>
      </div>
    </>
  );
}
