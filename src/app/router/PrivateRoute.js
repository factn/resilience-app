import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

// This is a work in progress depending on 
// how the backend is handling authentication/auth
// Current setup is for tokens wihtout refresh tokens

const PrivateRoute = props => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={renderProps => {
        if (localStorage.getItem("token")) {
          return <Component {...renderProps} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
