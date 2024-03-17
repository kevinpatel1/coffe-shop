import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import LoginImage from "../../assets/images/login-image.jpg";
import { MyContext } from "../../hooks/MyContextProvider";
import { loginUser } from "../../libs/api";
import "./Login.css";
function Login() {
  const { addToast } = useToasts();
  const { token, updateToken, updateUserDetails } = useContext(MyContext);

  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = await loginUser(data);
    if (userData.status) {
      console.log("userData: ", userData);
      updateToken(userData?.data?.token);
      updateUserDetails(userData?.data?.userDetails);
      navigate("/");
      addToast("Login Successfully!", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast(userData.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div class="login-container">
      <div class="onboarding">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide color-1">
              <div class="slide-image">
                <img src={LoginImage} loading="lazy" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="login-form">
        <div class="login-form-inner">
          <h1>Login</h1>

          <div class="login-form-group mt-5">
            <label for="email">
              Email <span class="required-star">*</span>
            </label>
            <input
              type="text"
              value={data.username}
              name="username"
              onChange={handleChange}
              placeholder="email@website.com"
              id="email"
            />
          </div>
          <div class="login-form-group">
            <label for="pwd">
              Password <span class="required-star">*</span>
            </label>
            <input
              autocomplete="off"
              type="text"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              id="pwd"
            />
          </div>

          <div class="login-form-group single-row">
            <div class="custom-check">
              <input autocomplete="off" type="checkbox" checked id="remember" />
              <label for="remember">Remember me</label>
            </div>

            <a href="#" class="link forgot-link">
              Forgot Password ?
            </a>
          </div>

          <button
            onClick={(e) => handleSubmit(e)}
            class="rounded-button login-cta"
          >
            Login
          </button>

          <div class="register-div">
            Not registered yet?{" "}
            <Link to={"/register"} class="link create-account">
              Create an account ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
