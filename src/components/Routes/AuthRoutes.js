import React from "react";
import Form from "../Form";
import SignIn from "../SignIn";

const AuthRoutes = [
  {
    path: "/",
    component: SignIn,
    exact: true,
  },
  {
    path: "/signin",
    component: SignIn,
    exact: true,
  },
];

export default AuthRoutes;
