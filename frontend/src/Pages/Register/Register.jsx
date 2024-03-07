import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterImage from "../../assets/images/register-image.jpg";
import "./Register.css";
function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    Password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div class="register-container">
      <div class="register-form">
        <div class="register-form-inner">
          <h1>Register</h1>

          <div class="register-form-group mt-3">
            <label for="firstName">
              First Name <span class="required-star">*</span>
            </label>
            <input
              type="text"
              value={data.firstName}
              onChange={handleChange}
              placeholder="Enter a First Name "
              id="email"
            />
          </div>
          <div class="register-form-group ">
            <label for="lastName">
              Last Name <span class="required-star">*</span>
            </label>
            <input
              type="text"
              value={data.lastName}
              onChange={handleChange}
              placeholder="Enter a Last Name"
              id="lastName"
            />
          </div>
          <div class="register-form-group ">
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
          <div class="register-form-group">
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

          <button
            onClick={() => navigate("/")}
            class="rounded-button register-cta"
          >
            Sign up
          </button>

          <div class="register-div">
            Already have an account?{" "}
            <Link to={"/login"} class="link create-account">
              Sign In ?
            </Link>
          </div>
        </div>
      </div>

      <div class="onboarding">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide color-1">
              <div class="slide-image">
                <img src={RegisterImage} loading="lazy" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
