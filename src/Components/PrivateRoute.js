import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { user } from "../services/userService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthorised = useSelector((state) => state.user.isAuthorised);
  console.log(isAuthorised);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorised ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
