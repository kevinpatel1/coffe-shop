import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "../../assets/images/landing-logo-img.jpeg";
import { GrCart } from "react-icons/gr";
import { useSelector } from "react-redux";
import { MyContext } from "../../hooks/MyContextProvider";

const Header = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const { token, userDetails, updateToken, updateUserDetails } =
    useContext(MyContext);

  const { Carts } = useSelector((state) => state._todoProduct);

  const [navbarToggler, setNavbarToggler] = React.useState(false);
  console.log(location?.pathname?.split("/")[2]);

  const handleSignOut = () => {
    updateToken("");
    updateUserDetails("");
    localStorage.clear();
    navigate("/login");
  };

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
                    <div class="dropdown">
                      <p
                        class={`nav-link dropbtn ${
                          location?.pathname?.split("/")[1] === "menu"
                            ? "active"
                            : ""
                        }`}
                      >
                        Shop
                      </p>
                      <div class="dropdown-content">
                        <Link
                          className={`${
                            location?.pathname?.split("/")[2] === "coffee"
                              ? "dropdown-active"
                              : ""
                          }`}
                          to={"/menu/coffee"}
                        >
                          Coffee{" "}
                        </Link>
                        <Link
                          className={`${
                            location?.pathname?.split("/")[2] === "coffeeBeans"
                              ? "dropdown-active"
                              : ""
                          }`}
                          to={"/menu/coffeeBeans"}
                        >
                          Coffee Beans
                        </Link>
                        <Link
                          className={`${
                            location?.pathname?.split("/")[2] === "coffeeGear"
                              ? "dropdown-active"
                              : ""
                          }`}
                          to={"/menu/coffeeGear"}
                        >
                          Coffee Gear
                        </Link>
                      </div>
                    </div>
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
                {token && (
                  <div style={{ cursor: "pointer ", marginTop: 10 }}>
                    <Link to={"/cart"}>
                      <GrCart className="ml-3 pointer" />
                      <div className="badge">{Carts?.length}</div>
                    </Link>
                  </div>
                )}
                {token ? (
                  <li class="nav-item">
                    <div class="dropdown">
                      <div
                        style={{ cursor: "pointer" }}
                        className=" mx-2 d-flex justify-content-center align-items-center"
                      >
                        <i className="fa fa-user" aria-hidden="true"></i>

                        <p
                          class={` px-2  mb-0 ${
                            location?.pathname?.split("/")[1] === "/profile"
                              ? "active"
                              : ""
                          }`}
                        >
                          {userDetails?.firstName + " " + userDetails?.lastName}
                        </p>
                      </div>
                      <div class="dropdown-content">
                        <Link
                          className={`${
                            location?.pathname?.split("/")[2] === "profile"
                              ? "dropdown-active"
                              : ""
                          }`}
                          to={"/profile"}
                        >
                          Profile{" "}
                        </Link>
                        <Link
                          to={""}
                          onClick={(e) => {
                            handleSignOut();
                          }}
                        >
                          Log Out
                        </Link>
                      </div>
                    </div>
                  </li>
                ) : (
                  <Link className="custom-login" to={"/login"}>
                    Login
                  </Link>
                )}
                {!token && (
                  <div style={{ cursor: "pointer ", marginTop: 10 }}>
                    <Link to={"/cart"}>
                      <GrCart className="ml-3 pointer" />
                      <div className="badge">{Carts?.length}</div>
                    </Link>
                  </div>
                )}
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
