import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Avatar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import loginRequest from "../dataservice/loginRequest";
import { AuthContext } from "../Context";

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
    margin: `${theme.spacing(4)}px auto`,
    minHeight: "20vh",
    background: `linear-gradient(to top right, rgba(255, 255, 255, 0.3), rgba(255, 230, 240, 0.2)), url("/images/library-image.png") no-repeat center center/cover`,
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
    <div className={classes.page}>
      {homeRedirect && <Redirect to="/" />}
      <Paper className={classes.loginContentContainer}>
        <div className={classes.formContainer}>
          {hasError && <div className={classes.errorDiv}>{errorMessage}</div>}
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
