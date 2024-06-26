import React from "react";
import { Redirect } from "react-router-dom";

//login
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Dashboard from "../pages/Dashboard/Dashboard";
import CategoryList from "../pages/Category/CategoryList";
import ProductList from "../pages/Product/ProductList";
import StockList from "../pages/Stock/StockList";
import CustomerList from "../pages/Cutomer/CustomerList";
import TransactionList from "../pages/Transaction/TransactionList";
import OrderList from "../pages/Order/OrderList";
import ViewOrder from "../pages/Order/ViewOrder";

const protectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/category", component: CategoryList },
  { path: "/product", component: ProductList },
  { path: "/stock", component: StockList },
  { path: "/customer", component: CustomerList },
  { path: "/transcations", component: TransactionList },
  { path: "/order", component: OrderList },
  { path: "/vieworder", component: ViewOrder },

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
