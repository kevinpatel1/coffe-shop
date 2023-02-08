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

function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/menu" exact element={<Menu />} />
          <Route path="/product" exact element={<ProductView />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/about" exact element={<About />} />
        </Route>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
