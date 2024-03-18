import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";
const MyContext = createContext();
const MyContextProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userDetails, setUserDetails] = useState(
    localStorage.getItem("userDetails") || ""
  );

  const updateRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };
  const updateToken = (newRole) => {
    setToken(newRole);
    localStorage.setItem("token", newRole);
  };
  const updateUserDetails = (newRole) => {
    setUserDetails(newRole);
    localStorage.setItem("userDetails", newRole);
  };

  const logoutFunction = () => {
    setUserDetails("");
    setToken("");
    setRole("");
    localStorage.clear();
  };
  return (
    <MyContext.Provider
      value={{
        updateRole,
        role,
        token,
        updateToken,
        userDetails,
        updateUserDetails,
        logoutFunction,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
