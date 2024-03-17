import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";
const MyContext = createContext();
const MyContextProvider = ({ children }) => {
  const location = useLocation();
  const [contextData, setContextData] = useState(
    JSON.parse(localStorage.getItem("contextData")) || null
  );

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "english"
  );
  const [currentIndex, setCurrentIndex] = useState(
    localStorage.getItem("currentIndex") || 0
  );
  const [resolutionData, setResolutionData] = useState(
    JSON.parse(localStorage.getItem("resolutionData")) || []
  );
  const [printResolutionData, setPrintResolutionData] = useState(
    JSON.parse(localStorage.getItem("printResolutionData")) || []
  );

  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [permissions, setPermissions] = useState(
    JSON?.parse(localStorage.getItem("permissions")) || ""
  );

  useEffect(() => {
    // Check if the path is '/lettercontent' and set the language accordingly
    if (location.pathname === "/lettercontent") {
      setLanguage("gujarati");
      localStorage.setItem("language", "gujarati");
    } else {
      // For other pages, set the language based on local storage or default to 'english'
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage && storedLanguage !== language) {
        setLanguage(storedLanguage);
      }
    }
  }, [location.pathname, language]);

  const updateData = (newData) => {
    setContextData(newData);
    localStorage.setItem("contextData", JSON.stringify(newData));
  };

  const updateLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };
  const updateCurrentIndex = (index) => {
    setCurrentIndex(index);
    localStorage.setItem("currentIndex", index);
  };
  const updateResolution = (newData) => {
    setResolutionData(newData);
    localStorage.setItem("resolutionData", JSON.stringify(newData));
  };
  const updatePrintResolution = (newData) => {
    setPrintResolutionData(newData);
    localStorage.setItem("printResolutionData", JSON.stringify(newData));
  };
  const updateScriptResolution = (scriptData) => {
    setResolutionData((prevData) => {
      // Modify the data based on your requirements
      let newData = [...prevData];
      if (language === "english") {
        newData[currentIndex]["scriptEng"] = scriptData;
      } else {
        newData[currentIndex]["scriptGuj"] = scriptData;
      }
      // ... Modify newData based on CKEditor changes ...

      return newData;
    });
  };

  const updateRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };
  const updatePermissions = () => {
    setPermissions(JSON?.parse(localStorage.getItem("permissions")));
  };

  return (
    <MyContext.Provider
      value={{
        contextInquiryData: contextData,
        updateData,
        language,
        updateLanguage,
        updateRole,
        role,
        updatePermissions,
        permissions,
        updateResolution,
        resolutionData,
        updateScriptResolution,
        currentIndex,
        updateCurrentIndex,
        updatePrintResolution,
        printResolutionData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
