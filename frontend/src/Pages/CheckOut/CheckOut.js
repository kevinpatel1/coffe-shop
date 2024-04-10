import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DecreaseQuantity,
  DeleteCart,
  IncreaseQuantity,
} from "../../Store/actions";
import "./CheckOut.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  allProductApi,
  paymentOrderApi,
  paymentVerifyApi,
} from "../../libs/api";
import { useToasts } from "react-toast-notifications";
import { MyContext } from "../../hooks/MyContextProvider";
import Logo from "../../assets/images/landing-logo-img.jpeg";

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails, token } = useContext(MyContext);

  console.log("userDetails: ", userDetails);
  const { Carts } = useSelector((state) => state._todoProduct);
  const [products, setProducts] = useState([]);
  const [cartsDetails, setCartsDetails] = useState([]);
  const [taxValue, setTaxValue] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const { addToast } = useToasts();
  const [inputData, setInputData] = useState({
    email: userDetails?.email,
    phoneNo: "",
    fullName: userDetails?.firstName + " " + userDetails.lastName,
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

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
  }, [products, Carts]);
  useEffect(() => {
    if (cartsDetails) {
      let totalAmount = cartsDetails.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      let gstValue = parseFloat(totalAmount * 0.236).toFixed(2);

      setTaxValue(gstValue);
      setTotalAmount(totalAmount);
      setFinalAmount(parseFloat(totalAmount + +gstValue).toFixed(2));
    }
  }, [cartsDetails]);
  const handleChange = (name, value) => {
    setInputData({ ...inputData, [name]: value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    let totalAmount = cartsDetails.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    try {
      const apiCall = await paymentOrderApi({ amount: finalAmount }, token);
      console.log("apiCall: ", apiCall);
      if (apiCall.status === 200) {
        console.log("apiCall: ", apiCall);
        handleOpenRazorpay(apiCall?.response);
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
  };

  const handleOpenRazorpay = (data) => {
    const option = {
      key: "rzp_test_sGTW0EL02VcLfQ",

      data: data.amount,
      currency: data.currency,
      name: "Coffee Gable",
      description: "",
      image: Logo,
      order_id: data.id,
      prefill: {
        name: userDetails?.firstName + userDetails?.lastName,
        email: userDetails?.email,
        contact: inputData?.phoneNo,
      },
      handler: async function (response) {
        console.log("response: ", response);

        try {
          const apiCall = await paymentVerifyApi(
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: cartsDetails,
              userDetails: inputData,
              totalPrice: totalAmount,
              finalAmount: finalAmount,
              taxValue: taxValue,
            },
            token
          );
          console.log("apiCall: ", apiCall);
          if (apiCall.status === 200) {
            console.log("apiCall: ", apiCall);
            navigate("/");
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
      },
    };

    const rzp = new window.Razorpay(option);
    rzp.open();
  };
  return (
    <div>
      <div className="pb-5 pt-3">
        <div
          class="col-md-12  checkOutPage mt-0 pt-0"
          style={{ overflow: "auto" }}
        >
          <header className="">
            <h3>Checkout</h3>
          </header>

          <main>
            <section class="checkout-form">
              <form action="#!" method="get">
                <h6>Contact information</h6>
                <div class="form-control-check">
                  <label for="checkout-email">E-mail</label>
                  <div>
                    <span class="fa fa-envelope"></span>
                    <input
                      style={{ marginBottom: 0 }}
                      type="email"
                      id="checkout-email"
                      name="email"
                      value={inputData?.email}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                      placeholder="Enter your email..."
                    />
                  </div>
                </div>
                <div class="form-control-check">
                  <label for="checkout-phone">Phone</label>
                  <div>
                    <span class="fa fa-phone"></span>
                    <input
                      style={{ marginBottom: 0 }}
                      type="tel"
                      name="phoneNo"
                      value={inputData?.phoneNo}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                      id="checkout-phone"
                      placeholder="Enter you phone..."
                    />
                  </div>
                </div>
                <br />
                <h6>Shipping address</h6>
                <div class="form-control-check">
                  <label for="checkout-name">Full name</label>
                  <div>
                    <span class="fa fa-user-circle"></span>
                    <input
                      style={{ marginBottom: 0 }}
                      type="text"
                      id="checkout-name"
                      name="fullName"
                      value={inputData?.fullName}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                      placeholder="Enter you name..."
                    />
                  </div>
                </div>
                <div class="form-control-check">
                  <label for="checkout-address">Address</label>
                  <div>
                    <span class="fa fa-home"></span>
                    <input
                      style={{ marginBottom: 0 }}
                      type="text"
                      name="address"
                      value={inputData?.address}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                      id="checkout-address"
                      placeholder="Your address..."
                    />
                  </div>
                </div>
                <div class="form-control-check">
                  <label for="checkout-city">City</label>
                  <div>
                    <span class="fa fa-building"></span>
                    <input
                      style={{ marginBottom: 0 }}
                      type="text"
                      name="city"
                      value={inputData?.city}
                      onChange={(e) => {
                        handleChange(e.target.name, e.target.value);
                      }}
                      id="checkout-city"
                      placeholder="Your city..."
                    />
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-control-check">
                    <label for="checkout-country">State</label>
                    <div>
                      <span class="fa fa-globe"></span>
                      <input
                        style={{ marginBottom: 0 }}
                        type="text"
                        name="state"
                        value={inputData?.state}
                        onChange={(e) => {
                          handleChange(e.target.name, e.target.value);
                        }}
                        id="checkout-city"
                        placeholder="Your city..."
                      />
                    </div>
                  </div>
                  <div class="form-control-check">
                    <label for="checkout-postal">Postal code</label>
                    <div>
                      <span class="fa fa-archive"></span>
                      <input
                        style={{ marginBottom: 0 }}
                        type="number"
                        name="postalCode"
                        value={inputData?.postalCode}
                        onChange={(e) => {
                          handleChange(e.target.name, e.target.value);
                        }}
                        id="checkout-postal"
                        placeholder="Your postal code..."
                      />
                    </div>
                  </div>
                </div>

                <div class="form-control-check-btn">
                  <button
                    onClick={(e) => {
                      handlePayment(e);
                    }}
                  >
                    Continue
                  </button>
                </div>
              </form>
            </section>

            <section class="checkout-details">
              <div class="checkout-details-inner">
                <div class="checkout-lists">
                  {cartsDetails?.map((item, i) => (
                    <div key={i} class="card" style={{ flexDirection: "row" }}>
                      <div class="card-image">
                        <img
                          src={`http://localhost:3006/uploads/${item?.images}`}
                          alt={item?.images}
                        />
                      </div>
                      <div class="card-details">
                        <div class="card-name">Name - {item?.productName}</div>
                        <div class="card-wheel mt-0 p-0">
                          Price - &#8377; {item?.price}
                        </div>
                        <div class="card-wheel mt-0 p-0">
                          Quantity - {item?.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <h6>Sub Total</h6>
                  <p style={{ fontSize: 20 }}> &#8377; {totalAmount}</p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <h6>Tax Deductions</h6>
                  <p style={{ fontSize: 20 }}> &#8377; {taxValue}</p>
                </div>
                <div class="checkout-total">
                  <h6>Grand Total</h6>
                  <p style={{ fontSize: 20 }}> &#8377; {finalAmount}</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
