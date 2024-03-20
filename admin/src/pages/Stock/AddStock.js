import React, { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Modal, Label, Input, ModalBody, ModalHeader } from "reactstrap";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import Select from "react-select";

const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const AddStock = (props) => {
  const history = useHistory();
  const { addStockModal } = props;
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [product, setProduct] = useState("");
  const [productList, setProductList] = useState("");
  const [qty, setQty] = useState("");
  const [categoryError, setCategoryError] = useState(false);
  const [productError, setProductError] = useState(false);
  const [qtyError, setQtyError] = useState(false);

  const [loading, setloading] = useState(false);
  let color = "#e9511d";

  const getCategoryListApi = useCallback(
    () => {
      const token = localStorage.getItem("token");

      setloading(true);
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      fetch(`${process.env.REACT_APP_API_URL}category/list`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.err_msg === "Invalid Token") {
            localStorage.clear();
            history.push("/logout");
          }
          if (data.status) {
            let arr = [];
            data?.data?.rows?.map((er) => {
              arr?.push({ label: er?.categoryName, value: er?.id });
            });
            setCategoryList(arr);

            setloading(false);
          } else {
            setloading(false);
            toast.error(data?.message);
          }
          setloading(false);
        })
        .catch((error) => {
          setloading(false);
          setTimeout(() => {
            toast.error("There was an error, Please try again later.");
          }, 1000);
        });
      // eslint-disable-next-line
    },
    // eslint-disable-next-line
    [history]
  );

  const getProductListApi = useCallback(
    (categoryId) => {
      setloading(true);
      const token = localStorage.getItem("token");

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      fetch(
        `${process.env.REACT_APP_API_URL}product/listByCategory?categoryId=${categoryId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.err_msg === "Invalid Token") {
            localStorage.clear();
            history.push("/logout");
          }
          if (data.status) {
            let arr = [];
            data?.data?.rows?.map((er) => [
              arr?.push({ label: er?.productName, value: er?.id }),
            ]);
            setProductList(arr);
            setloading(false);
          } else {
            setloading(false);
            toast.error(data?.message);
          }
          setloading(false);
        })
        .catch((error) => {
          setloading(false);
          setTimeout(() => {
            toast.error("There was an error, Please try again later.");
          }, 1000);
        });
      // eslint-disable-next-line
    },
    // eslint-disable-next-line
    [history]
  );
  useEffect(() => {
    getCategoryListApi();
  }, [getCategoryListApi]);

  const submitBtnClk = async () => {
    if (category?.label === "") {
      setCategoryError(true);
      toast.error("Please Select a Category");
    } else if (product?.label === "") {
      setCategoryError(true);
      toast.error("Please Select a Product");
    } else if (qty === "") {
      setCategoryError(true);
      toast.error("Please Enter a Product Qty", {
        toastId: "depNameerror",
      });
    } else if (qty && qty?.length < 0) {
      setCategoryError(true);
      toast.error("Minimum 1 Characteristics is Required", {
        toastId: "incompleteNameError",
      });
    } else {
      setloading(true);

      let formData = {
        productId: product.value,
        qty: qty,
      };

      const token = localStorage.getItem("token");
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      };
      fetch(`${process.env.REACT_APP_API_URL}stock/store`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.err_msg === "Invalid Token") {
            localStorage.clear();

            history.push("/logout");
            // toast.error("Session Expired.", {
            //   toastId: "sessionerror",
            // });
          }

          if (data.status) {
            history.push("/stock");
            setloading(false);
            props.onModalSubmitBtnClk();
            toast.success("Record Added Successfully.");
          } else {
            setloading(false);
            toast.error(data?.message);
          }
        })
        .catch((error) => {
          console.log("error: ", error);
          setloading(false);
          toast.error("There was an error, Please try again later.");
          setTimeout(() => {
            props?.onModalSubmitBtnClk();
          }, 2000);
        });
    }
  };
  if (loading)
    return (
      <div className="loaderClass" style={{ textAlign: "center" }}>
        <ClipLoader color={color} loading={loading} css={override} size={100} />
      </div>
    );
  return (
    <>
      <Modal
        id="showModal"
        size="md"
        isOpen={addStockModal}
        toggle={() => props.onCloseModal()}
        centered
      >
        <ModalHeader
          className="p-3 bg-soft-success"
          toggle={() => props.onCloseModal()}
        >
          Add Stock
        </ModalHeader>
        <ModalBody className="p-3">
          <div className="row gy-3 mb-2">
            <div className="col-md-12">
              <div>
                <Label htmlFor="amount-field" className="form-label">
                  Product Category <span className="required_span">*</span>
                </Label>
                <div className="input-group">
                  <Select
                    isMulti={false}
                    onChange={(e) => {
                      setCategory(e);
                      setCategoryError(false);
                      getProductListApi(e.value);
                    }}
                    value={category}
                    options={categoryList}
                    name="choices-publish-status-input"
                    className={`w-100 ${
                      categoryError ? "border border-danger " : ""
                    }`}
                    classNamePrefix="select2-selection form-select"
                    placeholder={"Select Product Category"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row gy-3 mb-2">
            <div className="col-md-12">
              <div>
                <Label htmlFor="amount-field" className="form-label">
                  Product <span className="required_span">*</span>
                </Label>
                <div className="input-group">
                  <Select
                    isMulti={false}
                    onChange={(e) => {
                      setProduct(e);
                      setProductError(false);
                    }}
                    value={product}
                    options={productList}
                    name="choices-publish-status-input"
                    className={`w-100 ${
                      productError ? "border border-danger " : ""
                    }`}
                    classNamePrefix="select2-selection form-select"
                    placeholder={"Select Product"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row gy-3 mb-2">
            <div className="col-md-12">
              <div>
                <Label htmlFor="amount-field" className="form-label">
                  Product Qty <span className="required_span">*</span>
                </Label>
                <div className="input-group">
                  <Input
                    type="number"
                    className={`form-control ${
                      qtyError ? "border-danger" : ""
                    }`}
                    placeholder={"Enter a Product Price"}
                    aria-label=" ProductName"
                    aria-describedby="basic-addon1"
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);

                      if (e.target.value?.length >= 1) {
                        setQtyError(false);
                      } else {
                        setQtyError(true);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>

        <div className="p-3">
          <div className="hstack gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                props.onCloseModal(false);
              }}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-success"
              id="add-btn"
              onClick={() => {
                submitBtnClk();
              }}
              disabled={loading}
            >
              {loading ? <ClipLoader color="#e9511d" size={20} /> : "Add"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AddStock;
