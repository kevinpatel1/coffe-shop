import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DecreaseQuantity,
  DeleteCart,
  IncreaseQuantity,
} from "../../Store/actions";
import "./Cart.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Carts } = useSelector((state) => state._todoProduct);
  console.log("Carts: ", Carts);

  const subtotal = useCallback(() => {
    let total = Carts.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    console.log(total);
  }, [Carts]);

  return (
    <div>
      {Carts?.length === 0 ? (
        <div class="empty-cart-container-fluid  mt-50">
          <div class="row">
            <div class="col-md-12">
              <div class="card-empty">
                <div class="card-body-empty cart-empty">
                  <div class="col-sm-12 empty-cart-cls text-center">
                    {/* <img
                      src="https://i.imgur.com/dCdflKN.png"
                      width="130"
                      height="130"
                      class="img-fluid mb-4 mr-3"
                    /> */}
                    <h3>
                      <strong>Your Cart is Empty</strong>
                    </h3>
                    <h4>Add something to make me happy </h4>
                    <button
                      onClick={() => navigate("/menu/coffee")}
                      class="fancy"
                    >
                      <span class="top-key"></span>
                      <span class="text">Continue Shopping</span>
                      <span class="bottom-key-1"></span>
                      <span class="bottom-key-2"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                          <img
                            class="img-fluid"
                            src={`http://localhost:3006/uploads/${items.image}`}
                          />
                        </div>
                        <div class="col">
                          <div class="row text-muted">Coffee</div>
                          <div class="row">{items?.name}</div>
                        </div>
                        <div class="col">
                          <a onClick={() => dispatch(DecreaseQuantity(key))}>
                            -
                          </a>
                          <a class="border">{items?.quantity}</a>
                          <a onClick={() => dispatch(IncreaseQuantity(key))}>
                            +
                          </a>
                        </div>
                        <div class="col">
                          &euro; {items?.price * parseInt(items?.quantity)}{" "}
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
                <div
                  class="back-to-shop"
                  onClick={() => navigate("/menu/coffee")}
                >
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
                  <div class="col text-right">
                    &euro;{" "}
                    {Carts.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}
                  </div>
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
                  <div class="col text-right">
                    &euro;{" "}
                    {Carts.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    ) + 5}
                  </div>
                </div>
                <button class="btn">CHECKOUT</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
