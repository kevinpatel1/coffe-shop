import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  CardHeader,
  Collapse,
} from "reactstrap";

import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";

import MetaTags from "react-meta-tags";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import avatar3 from "../../assets/images/Asset.png";
import product1 from "../../assets/images/Asset-5.png";
import InvoiceFormat from "./InvoiceFormat";

const productDetails = [
  {
    id: 1,
    img: product1,
    name: "Sweatshirt for Men (Pink)",
    color: "Pink",
    size: "M",
    price: "$119.99",
    quantity: "02",
    amount: "$239.98",
  },
  {
    id: 2,
    img: product1,
    name: "Noise NoiseFit Endure Smart Watch",
    color: "Black",
    size: "32.5mm",
    price: "$94.99",
    quantity: "01",
    amount: "$94.99",
  },
  {
    id: 3,
    img: product1,
    name: "350 ml Glass Grocery Container",
    color: "White",
    size: "350 ml",
    price: "$24.99",
    quantity: "01",
    amount: "$24.99",
  },
];
const ViewOrder = () => {
  const location = useLocation();
  const [counter, setCounter] = useState(0);
  const [productDetails, setProductDetails] = useState(
    location?.state?.productDetails?.length > 3
      ? JSON?.parse(location?.state?.productDetails)
      : ""
  );
  console.log("location: ", location?.state);

  return (
    <>
      <MetaTags>
        <title>Coffee Gable | Order Details</title>
      </MetaTags>
      <BreadCrumb title={"View Order"} pageTitle={"Order Details"} />
      <Row className="file-manager-content-fix">
        <Col xl={9}>
          <Card>
            <CardHeader
              className=""
              style={{ background: "rgba(10, 179, 156, 0.18)" }}
            >
              <div className="d-flex align-items-center">
                <h5 className="card-title flex-grow-1 mb-0">Order </h5>
                <div className="flex-shrink-0">
                  <div
                    onClick={() => setCounter(1)}
                    className="btn btn-success btn-sm"
                  >
                    <i className="ri-download-2-fill align-middle me-1"></i>{" "}
                    Invoice
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="table-responsive table-card">
                <table className="table table-nowrap align-middle table-borderless mb-0">
                  <thead className="table-light text-muted">
                    <tr>
                      <th scope="col">Product Details</th>
                      <th scope="col">Item Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col" className="text-end">
                        Total Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productDetails.map((product, key) => (
                      <EcommerceOrderProduct product={product} key={key} />
                    ))}
                    <tr className="border-top border-top-dashed">
                      <td colSpan="1"></td>
                      <td colSpan="3" className="fw-medium p-0">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr style={{}}>
                              <td className="">Sub Total :</td>
                              <td className="text-end">
                                {" "}
                                &#8377; {location?.state?.totalPrice}
                              </td>
                            </tr>

                            <tr>
                              <td>Tax Reduction :</td>
                              <td className="text-end">
                                {" "}
                                &#8377; {location?.state?.taxAmount}
                              </td>
                            </tr>
                            <tr className="border-top border-top-dashed">
                              <th scope="row">Grand Total :</th>
                              <th className="text-end">
                                {" "}
                                &#8377; {location?.state?.finalAmount}
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3}>
          <Card>
            <CardHeader>
              <div className="d-flex">
                <h5 className="card-title flex-grow-1 mb-0">
                  Customer Details
                </h5>
              </div>
            </CardHeader>
            <CardBody>
              <ul className="list-unstyled mb-0 vstack gap-3">
                <li>
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <img src={avatar3} alt="" className="avatar-sm rounded" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6
                        className="fs-15 mb-1 "
                        style={{ textTransform: "capitalize" }}
                      >
                        {location?.state?.user?.firstName}{" "}
                        {location?.state?.user?.lastName}
                      </h6>
                      <p className="text-muted mb-0">Customer</p>
                    </div>
                  </div>
                </li>
                <li>
                  <i className="ri-mail-line me-2 align-middle text-muted fs-16"></i>
                  {location?.state?.user?.email}
                </li>
                <li>
                  <i className="ri-phone-line me-2 align-middle text-muted fs-16"></i>
                  +(91) {location?.state?.user?.phoneNo}
                </li>
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h5 className="card-title mb-0">
                <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                Billing Address
              </h5>
            </CardHeader>
            <CardBody>
              <ul className="list-unstyled vstack gap-2 fs-14 mb-0">
                <li
                  className="fw-semibold fs-15 "
                  style={{ textTransform: "uppercase" }}
                >
                  {" "}
                  {location?.state?.user?.firstName}{" "}
                  {location?.state?.user?.lastName}
                </li>
                <li> +(91) {location?.state?.user?.phoneNo}</li>
                <li style={{ textTransform: "uppercase" }}>
                  {location?.state?.user?.address}
                </li>
                <li style={{ textTransform: "uppercase" }}>
                  {location?.state?.user?.city} -{" "}
                  {location?.state?.user?.postalCode}
                </li>
                <li style={{ textTransform: "uppercase" }}>
                  {location?.state?.user?.state}
                </li>
              </ul>
            </CardBody>
          </Card>
          {/* 
          <Card>
            <CardHeader>
              <h5 className="card-title mb-0">
                <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                Shipping Address
              </h5>
            </CardHeader>
            <CardBody>
              <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                <li className="fw-semibold fs-15">Joseph Parker</li>
                <li>+(256) 245451 451</li>
                <li>2186 Joyce Street Rocky Mount</li>
                <li>California - 24567</li>
                <li>United States</li>
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h5 className="card-title mb-0">
                <i className="ri-secure-payment-line align-bottom me-1 text-muted"></i>{" "}
                Payment Details
              </h5>
            </CardHeader>
            <CardBody>
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0">
                  <p className="text-muted mb-0">Transactions:</p>
                </div>
                <div className="flex-grow-1 ms-2">
                  <h6 className="mb-0">#VLZ124561278124</h6>
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0">
                  <p className="text-muted mb-0">Payment Method:</p>
                </div>
                <div className="flex-grow-1 ms-2">
                  <h6 className="mb-0">Debit Card</h6>
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0">
                  <p className="text-muted mb-0">Card Holder Name:</p>
                </div>
                <div className="flex-grow-1 ms-2">
                  <h6 className="mb-0">Joseph Parker</h6>
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0">
                  <p className="text-muted mb-0">Card Number:</p>
                </div>
                <div className="flex-grow-1 ms-2">
                  <h6 className="mb-0">xxxx xxxx xxxx 2456</h6>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <p className="text-muted mb-0">Total Amount:</p>
                </div>
                <div className="flex-grow-1 ms-2">
                  <h6 className="mb-0">$415.96</h6>
                </div>
              </div>
            </CardBody>
          </Card> */}
        </Col>
      </Row>
      {counter === 1 && (
        <InvoiceFormat data={location?.state} setCounter={setCounter} />
      )}
    </>
  );
};

const EcommerceOrderProduct = (props) => {
  return (
    <React.Fragment>
      <tr>
        <td>
          <div className="d-flex">
            <div className="flex-shrink-0 avatar-md bg-light rounded p-1">
              <img
                src={`http://localhost:3006/uploads/${props.product.images}`}
                alt=""
                className="img-fluid d-block"
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <h5 className="fs-16">
                <a
                  href="/apps-ecommerce-product-details"
                  className="link-primary"
                >
                  {props.product.productName}
                </a>
              </h5>
              <p className="text-muted mb-0">
                Descriptions:{" "}
                <span className="fw-medium">{props.product.description}</span>
              </p>
            </div>
          </div>
        </td>
        <td style={{ verticalAlign: "middle", textAlign: "center" }}>
          {props.product.price}
        </td>
        <td style={{ verticalAlign: "middle", textAlign: "center" }}>
          {props.product.quantity}
        </td>

        <td
          style={{ verticalAlign: "middle", textAlign: "center" }}
          className="fw-medium text-end"
        >
          {parseInt(props.product.price) * parseInt(props.product.quantity)}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default ViewOrder;
