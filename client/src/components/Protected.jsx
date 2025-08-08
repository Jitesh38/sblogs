import React from "react";
import { Navigate } from "react-router";

function Protected({ children }) {
    let token = sessionStorage.getItem("token");
    console.log(token);
  return token ? children : <Navigate to={'/login'} />;
}

export default Protected;
