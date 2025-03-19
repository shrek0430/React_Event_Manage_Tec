import React from "react";
import { Navigate } from "react-router-dom";



import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Header from "../Layouts/Header";


const authProtectedRoutes = [
  {
    path: "/dashboard",
    exact: true,
    component: <Header/>,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },

];

export { authProtectedRoutes, publicRoutes };