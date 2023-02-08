import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "../../assets/images/landing-logo-img.png";
import { GrCart } from "react-icons/gr";
import { useSelector } from "react-redux";

const Header = () => {
  let location = useLocation();

  const { Carts } = useSelector((state) => state._todoProduct);

  const [navbarToggler, setNavbarToggler] = React.useState(false);

  const hideHeaders = () => {
    if (location.pathname !== "/login") {
      return (
        <>
          <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
              <Link to="/">
                <a href="javascript:void(0)">
                  <img src={Logo} width="60px" height="60px" alt="logo" />
                </a>
              </Link>

              <button
                class={
                  navbarToggler ? "navbar-toggler" : "navbar-toggler collapsed"
                }
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded={navbarToggler ? "true" : "false"}
                aria-label="Toggle navigation"
                onClick={() => setNavbarToggler(!navbarToggler)}
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div
                class={
                  navbarToggler
                    ? "collapse navbar-collapse show"
                    : "collapse navbar-collapse"
                }
                id="navbarSupportedContent"
                style={{ justifyContent: "center" }}
              >
                <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                    <Link
                      class={`nav-link ${
                        location?.pathname === "/" ? " active" : ""
                      }`}
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      class={`nav-link ${
                        location?.pathname === "/menu" ||
                        location?.pathname === "/product"
                          ? " active"
                          : ""
                      }`}
                      to="/menu"
                    >
                      Menu
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      class={`nav-link ${
                        location?.pathname === "/about" ? " active" : ""
                      }`}
                      to="/about"
                    >
                      About
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      class={`nav-link ${
                        location?.pathname === "/contact" ? " active" : ""
                      }`}
                      to="/contact"
                    >
                      Contact us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="d-flex ">
                <Link className="custom-login" to={"/login"}>
                  Login
                </Link>
                <div style={{ cursor: "pointer ", marginTop: 10 }}>
                  <Link to={"/cart"}>
                    <GrCart className="ml-3 pointer" />
                    <div className="badge">{Carts?.length}</div>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </>
      );
    } else {
      return null;
    }
  };

  return hideHeaders();
};
export default Header;
