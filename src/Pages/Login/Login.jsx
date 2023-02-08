import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/images/login-image.jpg";
import "./Login.css";
function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    Password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

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
              value={data.Password}
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
            onClick={() => navigate("/")}
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
