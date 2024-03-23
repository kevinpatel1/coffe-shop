import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DecreaseQuantity,
  DeleteCart,
  IncreaseQuantity,
} from "../../Store/actions";
import "./Cart.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { allProductApi } from "../../libs/api";
import { useToasts } from "react-toast-notifications";
import { MyContext } from "../../hooks/MyContextProvider";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const { Carts } = useSelector((state) => state._todoProduct);
  const { token } = useContext(MyContext);

  const [products, setProducts] = useState([]);
  const [counter, setCounter] = useState(0);
  const [cartsDetails, setCartsDetails] = useState([]);

  const callAPI = useCallback(async () => {
    try {
      const apiCall = await allProductApi();
      console.log("apiCall: ", apiCall);
      if (apiCall.status === 200) {
        setProducts(apiCall?.data?.rows);
      } else {
        addToast(apiCall.err_msg, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } catch (error) {
      console.log(error);
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [addToast]);

  useEffect(() => {
    callAPI();
  }, [callAPI]);

  useEffect(() => {
    if (products && Carts) {
      console.log("Carts: ", Carts);
      let arr = [];

      Carts?.map((er) => {
        console.log("er: ", er);
        let checkProduct = products?.find((qw) => qw.id === er?.id);

        // checkProduct.quantity = er?.quantity;
        if (checkProduct) {
          arr?.push({ ...checkProduct, quantity: er?.quantity });
        }
      });
      setCartsDetails(arr);
    }
  }, [products, Carts, counter]);

  const handleCheckLogin = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };
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
                      {cartsDetails?.length} items
                    </div>
                  </div>
                </div>
                <div className="items-cart-div">
                  {cartsDetails?.map((items, key) => (
                    <div key={items?.id} class="row border-top border-bottom">
                      <div class="row main align-items-center">
                        <div class="col-2">
                          <img
                            class="img-fluid"
                            src={`http://localhost:3006/uploads/${items.images}`}
                          />
                        </div>
                        <div class="col">
                          <div class="row text-muted">Coffee</div>
                          <div class="row">{items?.productName}</div>
                        </div>
                        <div class="col">
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              dispatch(DecreaseQuantity(key));
                              setCounter(counter + 1);
                            }}
                          >
                            -
                          </a>
                          <a aria-readonly class="border">
                            {items?.quantity}
                          </a>
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              dispatch(IncreaseQuantity(key));
                              setCounter(counter + 1);
                            }}
                          >
                            +
                          </a>
                        </div>
                        <div class="col">
                          &#8377; {items?.price * parseInt(items?.quantity)}{" "}
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
                    ITEMS {cartsDetails?.length}
                  </div>
                  <div class="col text-right">
                    &#8377;{" "}
                    {cartsDetails.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}
                  </div>
                </div>
                <form>
                  <p>SHIPPING</p>
                  <select>
                    <option class="text-muted">
                      Standard-Delivery- &#8377;5.00
                    </option>
                  </select>
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
                    &#8377;{" "}
                    {cartsDetails.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    ) + 5}
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleCheckLogin();
                  }}
                  class="btn"
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
