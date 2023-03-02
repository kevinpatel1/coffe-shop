import LandingLogo3 from "../../assets/images/landing-slider-image-3.png";
import LandingLogo5 from "../../assets/images/landing-slider-image-5.png";
import landingSeparator from "../../assets/images/landing-separator-1.png";
import Robusta from "../../assets/images/products/Robusta.jpg";
import Espresso from "../../assets/images/products/Espresso.jpg";
import Mocha from "../../assets/images/products/Mocha.jpg";
import Menu from "../../assets/images/products/menu.jpg";
import coffeeMachine from "../../assets/images/products/coffee-machine.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home_div">
      <div className="container p-0 m-0 " style={{ maxWidth: "100%" }}>
        <div className="row justify-content-center align-items-center ">
          <div className="col custom-home-div p-0 m-0 ">
            <img
              className=" LandingLogo3 img-fluid"
              src={LandingLogo3}
              alt="LandingLogo3"
              height="221"
              width="255"
            />
          </div>
          <div className="col custom-home-div p-0 m-0">
            <div className="heading_div">
              <h1>Good Day Begins With Coffee </h1>
              <img className=" " src={landingSeparator} alt="LandingLogo3" />
              {/* <h2></h2> */}

              <button
                onClick={() => navigate("/menu/coffee")}
                class="learn-more mt-5"
              >
                <span class="circle" aria-hidden="true">
                  <span class="icon arrow"></span>
                </span>
                <span class="button-text">Shop Now</span>
              </button>
            </div>
          </div>
          <div className="col custom-home-div p-0 m-0">
            <img
              className=" LandingLogo5"
              src={LandingLogo5}
              alt="LandingLogo5"
              height="360"
              width="370"
            />
          </div>
        </div>
      </div>

      <div class="row " style={{ margin: 80, marginTop: 120 }}>
        <div class="col animate-ex" style={{ padding: 20 }}>
          <div class="card custom_card" style={{ width: "18rem" }}>
            <h2>Robusto</h2>
            <img class="card-img-top" src={Robusta} alt="Robusta" />
            <div class="card-body">
              <p class="card-text">
                Despite its flavour being considered less refined, Robusta is
                widely used in espresso blends.It is hardier, more resistant to
                disease and produces better yields.
              </p>
            </div>
          </div>
        </div>
        <div class="col" style={{ padding: 20 }}>
          {" "}
          <div class="card custom_card" style={{ width: "18rem" }}>
            <h2>Mocha</h2>

            <img class="card-img-top" src={Mocha} height={150} alt="Mocha" />
            <div class="card-body">
              <p class="card-text">
                Mocha is often interpreted differently across the world, the
                basis is that a shot of espresso is combined with a chocolate
                powder or syrup, followed by milk or cream.
              </p>
            </div>
          </div>
        </div>
        <div class="col" style={{ padding: 20 }}>
          <div class="card custom_card" style={{ width: "18rem" }}>
            <h2>Espresso</h2>

            <img
              class="card-img-top"
              src={Espresso}
              height={150}
              alt="Espresso"
            />
            <div class="card-body">
              <p class="card-text">
                Espresso is a shot of concentrated coffee, made by forcing very
                hot water at a high pressure through finely-ground coffee beans.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="row " style={{ margin: 80, marginTop: 120 }}>
        <div class="col custom_coffee_machine">
          <h1>Coffe Machine</h1>

          <h2 style={{ marginTop: 80, fontSize: 40 }}>
            Coffee Makes Everything Possible.
          </h2>
          <h4>
            {" "}
            One of the simplest methods to make great coffee is using one of our
            manual coffee makers.
          </h4>
        </div>
        <div class="col-md-auto img-cen">
          <img
            src={coffeeMachine}
            height={400}
            width={400}
            alt="coffeeMachine"
          />{" "}
        </div>
      </div>

      {/* <div class="row " style={{ margin: 80, marginTop: 120 }}>
        <div class="col img-cen ">
          <img src={Menu} class="img-fluid" alt="coffeeMachine" />{" "}
        </div>
        <div
          class="col-md-auto custom_menu_machine"
          style={{ marginTop: 80, textAlign: "center" }}
        >
          <h1>Explore Our</h1>
          <h1>Menu</h1>

          <button onClick={() => navigate("/menu/coffee")} class="cta mt-5 ">
            <span class="hover-underline-animation"> View More </span>
            <svg
              viewBox="0 0 46 16"
              height="10"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
              id="arrow-horizontal"
            >
              <path
                transform="translate(30)"
                d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                data-name="Path 10"
                id="Path_10"
              ></path>
            </svg>
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
