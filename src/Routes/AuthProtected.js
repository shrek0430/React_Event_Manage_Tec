import React from "react";
import { Navigate, Route } from "react-router-dom";

const AuthProtected = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} element={<Component />} />;
};

export { AuthProtected, AccessRoute };
