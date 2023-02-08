import { Link } from "react-router-dom";
import "./ProductCard.css";
const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <p>{product.name}</p>
          <img src={product.images} alt={product.name} />
        </div>
        <div class="flip-card-back">
          <p>{product.name}</p>

          <div className="flip-card-back-price-div">
            <p>Price : </p> &nbsp;&nbsp;&nbsp;
            <p>{`₹${product.price}`}</p>
          </div>
          <div className="flip-card-back-btn-div">
            <Link
              to={{
                pathname: "/product",
              }}
              state={product}
            >
              {" "}
              <button className="quick-view-btn">
                <div class="default-btn">
                  <svg
                    class="css-i6dzq1"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    fill="none"
                    stroke-width="2"
                    stroke="#FFF"
                    height="20"
                    width="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle r="3" cy="12" cx="12"></circle>
                  </svg>
                  <span>Quick View</span>
                </div>
                <div class="hover-btn">
                  <svg
                    class="css-i6dzq1"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    fill="none"
                    stroke-width="2"
                    stroke="#ffd300"
                    height="20"
                    width="20"
                    viewBox="0 0 24 24"
                  >
                    <circle r="1" cy="21" cx="9"></circle>
                    <circle r="1" cy="21" cx="20"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <span>Shop Now</span>
                </div>
              </button>
            </Link>

            <button class="add-to-cart-btn"> Add To Cart </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
