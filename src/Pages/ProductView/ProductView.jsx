import { useState } from "react";
import "./ProductView.css";
// import { Rating } from "@material-ui/lab";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { AddCart } from "../../Store/actions";
import { useDispatch } from "react-redux";

const ProductView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProduct] = useState();

  const options = {
    size: "large",
    value: products?.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (products.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(AddCart({ ...products, quantity: quantity }));
    // dispatch(
    //   addItemsToCart({ product: location?.state?._id, quantity: quantity })
    // );
    // alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  //   const reviewSubmitHandler = () => {
  //     const myForm = {
  //       productId: location?.state?._id,
  //       rating: rating,
  //       comment: comment,
  //     };

  //     dispatch(ProductService.reviewProductSuccess(myForm));

  //     setOpen(false);
  //   };

  useEffect(() => {
    if (location?.state) {
      setProduct(location?.state);
    }
  }, []);
  return (
    <div>
      <div className="back-btn">
        <button onClick={() => navigate("/menu")}>
          <svg
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024"
          >
            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
          </svg>
          <span>Back</span>
        </button>
      </div>
      <div className="ProductDetails ">
        <div>
          {products && (
            <img
              className="CarouselImage img-fluid"
              key={products?.images?.length}
              src={products?.images}
              height={400}
              width={560}
              alt={"Slide"}
            />
          )}
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{products?.name}</h2>
            <p>Product # {products?.id}</p>
          </div>
          <div className="detailsBlock-2">
            {/* <Rating {...options} /> */}
            <span className="detailsBlock-2-span">
              {" "}
              ({products?.numOfReviews} Reviews)
            </span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`₹${products?.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly value={quantity} type="text" />
                <button onClick={increaseQuantity}>+</button>
              </div>{" "}
              <button
                disabled={products?.Stock < 1 ? true : false}
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>

            <p>
              Status:
              <b
                className={`${
                  products?.Stock < 1 ? "redColor" : "greenColor"
                } ml-2`}
              >
                {products?.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description : <p className="mt-2">{products?.description}</p>
          </div>

          <button onClick={submitReviewToggle} className="submitReview">
            Add Review
          </button>
        </div>
      </div>
      <h3 className="reviewsHeading">REVIEWS</h3>

      {/* <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />

                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog> */}

      {/* {products?.reviews && products?.reviews[0] ? (
              <div className="reviews">
                {products?.reviews &&
                  products?.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
              </div>
            ) : ( */}
      <p className="noReviews">No Reviews Yet</p>
      {/* )} */}
    </div>
  );
};

export default ProductView;
