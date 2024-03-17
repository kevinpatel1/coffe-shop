import React from "react";
import { Redirect } from "react-router-dom";

//login
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Dashboard from "../pages/Dashboard/Dashboard";

const protectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
];

export { protectedRoutes, publicRoutes };
