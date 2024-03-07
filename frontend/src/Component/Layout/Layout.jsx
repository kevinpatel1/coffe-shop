import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";

import "./Layout.css";
const Layout = () => {
  const [loadingState, setLoadingState] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location) {
      setTimeout(() => {
        setLoadingState(false);
      }, 1000);
      setLoadingState(true);
    }
  }, [location]);

  return (
    <div>
      {loadingState ? (
        <Loader />
      ) : (
        <div className="layout_div">
          <div>
            <Header />
          </div>

          <div className="outLet_div">
            <Outlet />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
