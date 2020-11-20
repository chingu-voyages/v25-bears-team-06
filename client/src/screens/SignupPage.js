import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import signupRequest from "../dataservice/signupRequest";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    width: "500px",
    margin: `${theme.spacing(4)}px auto`,
  },
  errorDiv: {
    height: "50px",
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
  const [shouldRedirect, setShouldRedirect] = useState(false);

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
            setShouldSubmit(false);
            setShouldRedirect(true);
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
      {shouldRedirect && <Redirect to="/" />}
      {hasError && <div className={classes.errorDiv}>{errorMessage}</div>}
      <form className={classes.root} onSubmit={handleSubmit}>
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
        />
        <Button
          disabled={
            signupPassword.length < 1 ||
            signupPassword !== signupConfirmPassword
          }
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
}
