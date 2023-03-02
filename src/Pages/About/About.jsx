import "./About.css";
import AboutUs from "../../assets/images/about-us.png";
import landingSeparator from "../../assets/images/landing-separator-1.png";

const About = () => {
  return (
    <div>
      <div class="">
        <img src={AboutUs} height={400} width={"100%"} alt="contact-img" />
      </div>
      <div className="heading_div mt-4">
        <h1>About Us </h1>{" "}
        <img className=" " src={landingSeparator} alt="LandingLogo3" />
      </div>
      <div className=" about-us-content d-flex justify-content-center align-items-center ">
        <p>
          Coffee Gable brings you everything you would need to make a great cup
          of coffee at home or at a cafe. Shop our wide range of extremely
          high-quality coffee beans, premium coffee, and some cool coffee
          brewing gear.
        </p>
      </div>
    </div>
  );
};

export default About;
