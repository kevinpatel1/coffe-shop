import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterImage from "../../assets/images/register-image.jpg";
import { useToasts } from "react-toast-notifications";
import "./Register.css";
import { registerUser } from "../../libs/api";
function Register() {
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    Password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerData = await registerUser(data);

    if (registerData.status) {
      navigate("/login");
      addToast(
        "Email id Send Successfully! You can Verify Your Account through Email.",
        {
          appearance: "success",
          autoDismiss: true,
        }
      );
    } else {
      addToast(registerData.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
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
              name="firstName"
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
              name="lastName"
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
              value={data.email}
              onChange={handleChange}
              name="email"
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
              name="Password"
              value={data.Password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              id="pwd"
            />
          </div>

          <button
            onClick={(e) => handleSubmit(e)}
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
