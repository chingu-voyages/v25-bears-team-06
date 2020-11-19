import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

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

const SignupPage = () => {
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

  useEffect(() => {
    const reqBody = {
      query: `
        mutation SignUp($email: String!, $displayName: String!, $password: String!, $confirmPassword: String!) {
          createAccount(
            email: $email,
            displayName: $displayName,
            password: $password,
            confirmPassword: $confirmPassword
          ) {
            userId
            token
            email
            displayName
          }
        }    
      `,
      variables: {
        email: signupEmail,
        displayName: signupDisplayName,
        password: signupPassword,
        confirmPassword: signupConfirmPassword,
      },
    };

    const url =
      process.env.REACT_APP_API_URL || "http://localhost:5000/graphql";

    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    };

    const signUpRequest = async () => {
      try {
        const response = await fetch(url, opts);
        const result = await response.json();
        if (response.ok) {
          const {
            data: {
              createAccount: { email, displayName, token, userId },
            },
          } = result;
          window.localStorage.setItem("email", email);
          window.localStorage.setItem("displayName", displayName);
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("userId", userId);
          setShouldSubmit(false);
          setShouldRedirect(true);
        } else {
          setHasError(true);
          setErrorMessage(result.errors[0].message);
        }
      } catch (err) {
        setHasError(true);
        setErrorMessage(err.message);
      } finally {
        setShouldSubmit(false);
      }
    };
    if (shouldSubmit) {
      signUpRequest().catch((err) => {
        setHasError(true);
        setErrorMessage(err.message);
      });
    }
  }, [
    shouldSubmit,
    signupEmail,
    signupDisplayName,
    signupPassword,
    signupConfirmPassword,
  ]);

  const handleChange = ({ target: { name, value } }) => {
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShouldSubmit(true);
  };

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
};

export default SignupPage;
