import "./Loader.css";
import Loading from "../../assets/images/loading-img.png";
const Loader = () => {
  return (
    <div className="main-loader">
      <div class="loader">
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        {/* <div class="cup">
          <span></span>
        </div> */}
        <img
          style={{ background: "transparent" }}
          src={Loading}
          width="60px"
          height="60px"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Loader;
