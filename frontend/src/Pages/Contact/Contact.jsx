import "./Contact.css";
import "../Login/Login.css";
import ContactUs from "../../assets/images/contact-us-image.jpg";

const Contact = () => {
  return (
    <div>
      <div class="">
        <img src={ContactUs} height={400} width={"100%"} alt="contact-img" />
      </div>
      <form>
        <div class="login-container w-full">
          <div class="login-form">
            <div className="container">
              <h1>Send Us A Message</h1>
              <div class="row mt-3">
                <div class="col login-form-group mt-2 mb-0">
                  <label for="firstName">
                    First Name <span class="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    // value={data.username}
                    // onChange={handleChange}
                    placeholder="Enter a First Name"
                    id="firstName"
                  />
                </div>
                <div class="col login-form-group mt-2 mb-0">
                  <label for="lastName">
                    Last Name <span class="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    // value={data.username}
                    // onChange={handleChange}
                    placeholder="Enter a Last Name"
                    id="lastName"
                  />
                </div>
              </div>

              <div className="row pt-0">
                <div class="col login-form-group mt-1 mb-0">
                  <label for="email">
                    Email <span class="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    // value={data.username}
                    // onChange={handleChange}
                    placeholder="email@website.com"
                    id="email"
                  />
                </div>

                <div class=" col login-form-group mt-1 mb-0">
                  <label for="phoneNumber">
                    Phone Number <span class="required-star">*</span>
                  </label>
                  <input
                    autocomplete="off"
                    type="number"
                    // value={data.Password}
                    // onChange={handleChange}
                    placeholder="Eg. +1 800 000000"
                    id="phoneNumber"
                  />
                </div>
              </div>
              <div className="row">
                <div class="col login-form-group mt-2 mb-0">
                  <label for="firstName">
                    Message <span class="required-star">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Write us a message"
                  ></textarea>
                </div>
              </div>
              <div className="contact-us-btn d-flex align-items-center justify-content-center">
                <button
                  style={{ backgroundColor: "#996253" }}
                  class=" w-25 rounded-button login-cta"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;
