import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DecreaseQuantity,
  DeleteCart,
  emptyCart,
  IncreaseQuantity,
} from "../../Store/actions";
import "./Cart.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Carts } = useSelector((state) => state._todoProduct);

  useEffect(() => {
    if (Carts) {
      let sum = 0;
      Carts?.map((er) => {
        sum += er?.price;
      });
    }
  }, []);
  return (
    <div className="pb-5 pt-3">
      <div class="card">
        <div class="row">
          <div class="col-md-8 cart">
            <div class="title">
              <div class="row">
                <div class="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <div class="col align-self-center text-right text-muted">
                  {Carts?.length} items
                </div>
              </div>
            </div>
            <div className="items-cart-div">
              {Carts?.map((items, key) => (
                <div key={items?.id} class="row border-top border-bottom">
                  <div class="row main align-items-center">
                    <div class="col-2">
                      <img class="img-fluid" src={items?.image} />
                    </div>
                    <div class="col">
                      <div class="row text-muted">Coffee</div>
                      <div class="row">{items?.name}</div>
                    </div>
                    <div class="col">
                      <a onClick={() => dispatch(DecreaseQuantity(key))}>-</a>
                      <a class="border">{items?.quantity}</a>
                      <a onClick={() => dispatch(IncreaseQuantity(key))}>+</a>
                    </div>
                    <div class="col">
                      &euro; {items?.price}{" "}
                      <span
                        class="close"
                        onClick={() => dispatch(DeleteCart(items))}
                      >
                        &#10005;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div class="back-to-shop" onClick={() => navigate("/menu")}>
              <AiOutlineArrowLeft style={{ width: 30 }} />
              <span class="text-muted">Back to shop</span>
            </div>
          </div>
          <div class="col-md-4 summary">
            <div>
              <h5>
                <b>Summary</b>
              </h5>
            </div>
            <hr />
            <div class="row">
              <div class="col" style={{ paddingLeft: 0 }}>
                ITEMS {Carts?.length}
              </div>
              <div class="col text-right">&euro; 1000.00</div>
            </div>
            <form>
              <p>SHIPPING</p>
              <select>
                <option class="text-muted">
                  Standard-Delivery- &euro;5.00
                </option>
              </select>
              <p>GIVE CODE</p>
              <input id="code" placeholder="Enter your code" />
            </form>
            <div
              class="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div class="col">TOTAL PRICE</div>
              <div class="col text-right">&euro; 1005.00</div>
            </div>
            <button class="btn">CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
