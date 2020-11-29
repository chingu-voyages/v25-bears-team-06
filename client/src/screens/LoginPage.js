import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import loginRequest from "../dataservice/loginRequest";
import { AuthContext } from "../Context";

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
  },
  formButton: {
    width: "100%",
  },
  formButtonHelperText: {
    textAlign: "center",
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
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again later.",
  );
  const [homeRedirect, setHomeRedirect] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(
    function handleEffect() {
      async function loginEffect() {
        try {
          const { login, message } = await loginRequest({
            email: loginEmail,
            password: loginPassword,
          });
          if (login) {
            const { email, displayName, token, userId } = login;
            window.localStorage.setItem("email", email);
            window.localStorage.setItem("displayName", displayName);
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("userId", userId);
            auth.setUser({ email, token, displayName, userId });
            setShouldSubmit(false);
            setHomeRedirect(true);
          } else if (message) {
            setHasError(true);
            setErrorMessage(message);
            setShouldSubmit(false);
          }
        } catch (err) {
          setHasError(true);
          setErrorMessage(err.message);
          setShouldSubmit(false);
        }
      }
      if (shouldSubmit) {
        loginEffect().catch((err) => {
          setHasError(true);
          setErrorMessage(err.message);
        });
      }
    },
    [shouldSubmit, auth, loginEmail, loginPassword],
  );

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
    setShouldSubmit(true);
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
          {hasError && <div className={classes.errorDiv}>{errorMessage}</div>}
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
              >
                Log In
              </Button>
            </div>
            <div className={classes.formButtonContainer}>
              <Typography
                className={classes.formButtonHelperText}
                component="p"
                variant="p"
              >
                Not a memeber?
              </Typography>
              <Button className={classes.formButton} variant="contained">
                <Link to="/signup">Sign Up</Link>
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
