import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/login.css";
import Select from "react-select";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
} from "reactstrap";
import MetaTags from "react-meta-tags";

import { withRouter, Link } from "react-router-dom";
import { MyContext } from "../../Components/Hooks/MyContextProvider";
import BgImage from "../../assets/images/bg-image2.jpg";
import Logo from "../../assets/images/landing-logo-img.jpeg";

const Login = () => {
  const { updateRole, updateToken, token, updateUserDetails } =
    useContext(MyContext);
  console.log("token: ", token);
  const [loading, setloading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameErr, setUserNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const [showPassword, setshowPassword] = useState(false);

  const history = useHistory();

  const signinButton = () => {
    setloading(true);
    let error = false;
    if (!userName) {
      setUserNameErr(true);
      error = true;
      toast.error("Please Enter a Username", {
        toastId: "usererror",
      });
    }

    if (!password) {
      error = true;
      toast.error("Please Enter a Password", {
        toastId: "passerror",
      });
      setPasswordErr(true);
    }

    if (!error) {
      let formData = {
        username: userName,
        password: password,
      };

      const token = localStorage.getItem("token");
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      };
      fetch(`${process.env.REACT_APP_API_URL}admin/login`, requestOptions)
        .then((response) => response.json())
        .then(async (data) => {
          if (data && data.err_msg === "Invalid Token") {
            localStorage.clear();

            history.push("/logout");
            // toast.error("Session Expired.", {
            //   toastId: "sessionerror",
            // });
          }

          if (data.status) {
            localStorage.setItem("role", data?.data?.userDetails?.role);
            localStorage.setItem(
              "authUser",
              JSON.stringify(data?.data?.userDetails)
            );
            localStorage.setItem("token", data?.data?.token);

            updateRole(data?.data?.userDetails?.role);
            updateToken(data?.data?.token);
            updateUserDetails(JSON.stringify(data?.data?.userDetails));

            setTimeout(() => {
              history.push("/dashboard");
            }, 1000);
          } else {
            setloading(false);
            toast.error(data?.message);
          }
        })
        .catch((error) => {
          console.log("error: ", error);

          setloading(false);
          toast.error("There was an error, Please try again later.");
        });
    }
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleInputChange = (name, value) => {
    if (name === "username") {
      setUserName(value);
      setUserNameErr(false);
    } else if (name === "password") {
      setPassword(value);
      setPasswordErr(false);
    }
  };

  return (
    <>
      {/* <ParticlesAuth> */}

      <div className="auth-page-content">
        <MetaTags>
          <title>Coffee Gable </title>
        </MetaTags>
        <img
          src={BgImage}
          alt="bg-"
          width={"100%"}
          height={"100%"}
          style={{ position: "absolute" }}
        />

        <Container style={{ position: "relative", marginTop: 50 }}>
          <Row className="justify-content-center align-items-center">
            <Col className="text-center" md={8} lg={6} xl={5}>
              <img src={Logo} height={"200"} width={"200"} alt="logo" />
              <Card className="mt-3 login-card">
                <CardBody
                  style={{ border: "1px solid #9c5945", borderRadius: "14px" }}
                  className="p-4"
                >
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Welcome Back !</h5>
                    <p className="text-muted">
                      Sign in to continue to Coffee Gable{" "}
                    </p>
                  </div>
                  <div className="p-2 mt-4">
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        signinButton();
                        return false;
                      }}
                      className="text-start"
                      action="#"
                    >
                      <div className="mb-3">
                        <Label
                          htmlFor="email"
                          style={{ color: "#353090" }}
                          className="form-label"
                        >
                          username{" "}
                        </Label>
                        <Input
                          name="username"
                          className={`form-control ${
                            userNameErr ? "border-danger" : ""
                          }`}
                          style={{ borderColor: "#9c5945" }}
                          placeholder={"Enter Username"}
                          onChange={(e) => {
                            handleInputChange(e.target.name, e.target.value);
                          }}
                          value={userName}
                        />
                      </div>

                      <div className="mb-3">
                        <div className="float-end">
                          <Link
                            to="/forgot-password"
                            style={{ color: "#353090" }}
                            className=""
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <Label
                          className="form-label"
                          style={{ color: "#353090" }}
                          htmlFor="password-input"
                        >
                          Password
                        </Label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            className={`form-control pe-5 ${
                              passwordErr ? "border-danger" : ""
                            }`}
                            placeholder={"Enter Password"}
                            style={{ borderColor: "#9c5945" }}
                            onChange={(e) => {
                              handleInputChange(e.target.name, e.target.value);
                            }}
                          />
                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                            type="button"
                            id="password-addon"
                            onClick={() => handleClickShowPassword()}
                          >
                            <i className="ri-eye-fill align-middle"></i>
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button
                          className=" w-100"
                          type="submit"
                          style={{
                            backgroundColor: "rgb(156 89 69)",
                            borderColor: "rgb(156 89 69)",
                          }}
                          disabled={loading}
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              {/* <div className="mt-4 text-center">
                  <p className="mb-0">Don't have an account ? <Link to="/register" className="fw-semibold text-primary text-decoration-underline"> Signup </Link> </p>
                </div> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default withRouter(Login);
