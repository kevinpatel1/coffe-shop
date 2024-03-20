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

const EditProduct = (props) => {
  const history = useHistory();
  const { row, editProductModal } = props;
  const [productName, setProductName] = useState(row?.productName);
  const [productDescription, setProductDescription] = useState(
    row?.productDescription
  );
  const [productPrice, setProductPrice] = useState(row?.price);
  const [image, setImage] = useState(row?.images);
  const [stock, setStock] = useState(row?.stock);
  const [category, setCategory] = useState({
    label: row?.category?.categoryName,
    value: row?.category?.id,
  });
  const [categoryList, setCategoryList] = useState([]);
  const [productNameError, setProductNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [productDescriptionError, setProductDescriptionError] = useState(false);
  const [productPriceError, setProductPriceError] = useState(false);
  const [productImageError, setProductImageError] = useState(false);
  const [productStockError, setProductStockError] = useState(false);

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

  useEffect(() => {
    getCategoryListApi();
  }, [getCategoryListApi]);

  const submitBtnClk = async () => {
    if (category?.label === "") {
      setCategoryError(true);
      toast.error("Please Select a Category");
    } else if (productName === "") {
      setProductNameError(true);
      toast.error("Please Enter Product Name");
    } else if (productName && productName?.length < 3) {
      setProductNameError(true);
      toast.error("Minimum 3 Characteristics is Required", {});
    } else if (productDescription === "") {
      setProductDescriptionError(true);
      toast.error("Please Enter Product Description");
    } else if (productDescription && productDescription?.length < 3) {
      setProductDescriptionError(true);
      toast.error("Minimum 3 Characteristics is Required", {});
    } else if (productPrice === "") {
      setProductPriceError(true);
      toast.error("Please Enter Product Price");
    } else if (productPrice && productPrice?.length < 0) {
      setProductPriceError(true);
      toast.error("Minimum 1 Characteristics is Required", {});
    } else if (stock === "") {
      setProductStockError(true);
      toast.error("Please Enter Product Stock");
    } else if (stock && stock?.length < 0) {
      setProductStockError(true);
      toast.error("Minimum 1 Characteristics is Required", {});
    } else if (image === "") {
      setProductStockError(true);
      toast.error("Please Select Product Image");
    } else {
      setloading(true);

      let formData = new FormData();

      formData.append("categoryId", category.value);
      formData.append("productName", productName);
      formData.append("productDescription", productDescription);
      formData.append("price", productPrice);
      formData.append("stock", stock);
      formData.append("image", image);

      const token = localStorage.getItem("token");
      const requestOptions = {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      fetch(
        `${process.env.REACT_APP_API_URL}product/update/${row?.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.err_msg === "Invalid Token") {
            localStorage.clear();

            history.push("/logout");
            // toast.error("Session Expired.", {
            // });
          }

          if (data.status) {
            history.push("/product");
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
        isOpen={editProductModal}
        toggle={() => props.onCloseModal()}
        centered
      >
        <ModalHeader
          className="p-3 bg-soft-success"
          toggle={() => props.onCloseModal()}
        >
          Edit Product
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
                    }}
                    isDisabled
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
                  Product Name <span className="required_span">*</span>
                </Label>
                <div className="input-group">
                  <Input
                    type="text"
                    className={`form-control ${
                      productNameError ? "border-danger" : ""
                    }`}
                    placeholder={"Enter a Product Name"}
                    aria-label=" ProductName"
                    aria-describedby="basic-addon1"
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);

                      if (e.target.value?.length >= 3) {
                        setProductNameError(false);
                      } else {
                        setProductNameError(true);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row gy-3 mb-2">
            <div className="col-md-12">
              <div>
                <Label htmlFor="amount-field" className="form-label">
                  Product Description <span className="required_span">*</span>
                </Label>
                <div className="input-group">
                  <Input
                    type="textarea"
                    className={`form-control ${
                      productDescriptionError ? "border-danger" : ""
                    }`}
                    placeholder={"Enter a Product Description"}
                    aria-label=" ProductName"
                    aria-describedby="basic-addon1"
                    value={productDescription}
                    onChange={(e) => {
                      setProductDescription(e.target.value);

                      if (e.target.value?.length >= 3) {
                        setProductDescriptionError(false);
                      } else {
                        setProductDescriptionError(true);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row gy-3 mb-2">
            <div className="col-md-6">
              <div>
                <Label htmlFor="amount-field" className="form-label">
                  Product Price <span className="required_span">*</span>
                </Label>
                <div className="input-group">
                  <Input
                    type="number"
                    className={`form-control ${
                      productPriceError ? "border-danger" : ""
                    }`}
                    placeholder={"Enter a Product Price"}
                    aria-label=" ProductName"
                    aria-describedby="basic-addon1"
                    value={productPrice}
                    onChange={(e) => {
                      setProductPrice(e.target.value);

                      if (e.target.value?.length >= 1) {
                        setProductPriceError(false);
                      } else {
                        setProductPriceError(true);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <Label htmlFor="amount-field" className="form-label">
                  Product Stock <span className="required_span">*</span>
                </Label>
                <div className="input-group">
                  <Input
                    type="number"
                    className={`form-control ${
                      productStockError ? "border-danger" : ""
                    }`}
                    placeholder={"Enter a Product Stock"}
                    aria-label=" ProductName"
                    aria-describedby="basic-addon1"
                    value={stock}
                    onChange={(e) => {
                      setStock(e.target.value);

                      if (e.target.value?.length >= 1) {
                        setProductStockError(false);
                      } else {
                        setProductStockError(true);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row gy-3 mt-2">
            <div className="col-md-6">
              <div>
                <Label htmlFor="amount-field" className="form-label">
                  Product Image
                </Label>
                <div className="input-group">
                  <div>
                    <Input
                      type="file"
                      accept="image/png, image/jpg, image/jpeg,"
                      name="image"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        setProductImageError(false);
                      }}
                    />
                  </div>
                  <div>
                    {image &&
                      (typeof image === "object" ? (
                        <img
                          src={URL?.createObjectURL(image)}
                          className="img-thumbnail "
                          height={100}
                          width={200}
                          alt="user-profile"
                        />
                      ) : (
                        <img
                          src={`${process.env.REACT_APP_Photo_URL}${image}`}
                          className="img-thumbnail "
                          height={100}
                          width={200}
                          alt="user-profile"
                        />
                      ))}
                  </div>
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
              {loading ? <ClipLoader color="#e9511d" size={20} /> : "Update"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default EditProduct;
