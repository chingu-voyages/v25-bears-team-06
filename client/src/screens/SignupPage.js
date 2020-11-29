import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import signupRequest from "../dataservice/signupRequest";
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

export default function SignupPage() {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupDisplayName, setSignupDisplayName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again later.",
  );
  const [homeRedirect, setHomeRedirect] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(
    function handleEffect() {
      async function signupEffect() {
        try {
          const { createAccount, message } = await signupRequest({
            email: signupEmail,
            displayName: signupDisplayName,
            password: signupPassword,
            confirmPassword: signupConfirmPassword,
          });
          if (createAccount) {
            const { email, displayName, token, userId } = createAccount;
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
        signupEffect().catch((err) => {
          setHasError(true);
          setErrorMessage(err.message);
        });
      }
    },
    [
      shouldSubmit,
      signupEmail,
      signupDisplayName,
      signupPassword,
      signupConfirmPassword,
      auth,
    ],
  );

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
    setShouldSubmit(true);
  }

  const classes = useStyles();

  return (
    <>
      {homeRedirect && <Redirect to="/" />}
      <Typography className={classes.pageHeader} variant="h3" component="h1">
        Sign Up
      </Typography>
      <div className={classes.pageContentContainer}>
        <div className={classes.formContainer}>
          {hasError && <div className={classes.errorDiv}>{errorMessage}</div>}
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
              >
                Submit
              </Button>
            </div>
            <div className={classes.formButtonContainer}>
              <Typography
                className={classes.formButtonHelperText}
                component="p"
                variant="p"
              >
                Already a member?
              </Typography>
              <Button className={classes.formButton} variant="contained">
                <Link to="/login">Log In</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
