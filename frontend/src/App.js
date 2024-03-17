import "./App.css";

import { Routes, Route } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import Home from "./Pages/Home/Home";
import Menu from "./Pages/Menu/Menu";
import ProductView from "./Pages/ProductView/ProductView";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Login/Login";
import ScrollToTop from "./Component/ScrollToTop";
import Register from "./Pages/Register/Register";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import { ToastProvider } from "react-toast-notifications";
import { MyContextProvider } from "./hooks/MyContextProvider";

function App() {
  return (
    <div>
      <ScrollToTop />
      <ToastProvider
        autoDismiss
        autoDismissTimeout={5000}
        // components={{ Toast: Snack }}
        placement="bottom-center"
      >
        <MyContextProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" exact element={<Home />} />
              <Route path="/menu/:categoryMenu" exact element={<Menu />} />
              <Route path="/menu" exact element={<ProductView />} />
              <Route path="/cart" exact element={<Cart />} />
              <Route path="/contact" exact element={<Contact />} />
              <Route path="/about" exact element={<About />} />
            </Route>
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
          </Routes>
        </MyContextProvider>
      </ToastProvider>
    </div>
  );
}

export default App;
