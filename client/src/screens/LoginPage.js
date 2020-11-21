import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import loginRequest from "../dataservice/loginRequest";

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

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again later.",
  );
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(function handleEffect() {
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
      loginEffect().catch((err) => {
        setHasError(true);
        setErrorMessage(err.message);
      });
    }
  });

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
      {shouldRedirect && <Redirect to="/" />}
      {hasError && <div className={classes.errorDiv}>{errorMessage}</div>}
      <form className={classes.root} onSubmit={handleSubmit}>
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
        />

        <Button disabled={loginPassword.length < 1} type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}
