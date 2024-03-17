import React, { useEffect } from "react";

//import Scss
import "./assets/scss/themes.scss";

//imoprt Route
import Route from "./Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContextProvider } from "./Components/Hooks/MyContextProvider";

function App() {
  toast.configure();

  return (
    <React.Fragment>
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <MyContextProvider>
        <Route />
      </MyContextProvider>
    </React.Fragment>
  );
}

export default App;
