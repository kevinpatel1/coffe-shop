import React, { createContext, useState } from "react";
const MyContext = createContext();
const MyContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || null
  );
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || null
  );

  const updateToken = (newData) => {
    setToken(newData);
    localStorage.setItem("token", JSON.stringify(newData));
  };
  const updateUserDetails = (newData) => {
    setUserDetails(newData);
    localStorage.setItem("userDetails", JSON.stringify(newData));
  };

  return (
    <MyContext.Provider
      value={{
        token,
        updateToken,
        userDetails,
        updateUserDetails,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
