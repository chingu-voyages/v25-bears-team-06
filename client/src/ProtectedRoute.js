/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Context";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(AuthContext);
  const loggedIn = auth && auth.user && auth.user.token;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
