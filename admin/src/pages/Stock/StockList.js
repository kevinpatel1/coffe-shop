import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { Card, CardHeader, Col, Row, CardBody, Form, Input } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import { Link, useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { toast } from "react-toastify";
import { MetaTags } from "react-meta-tags";
import AddStock from "./AddStock";
import { Tooltip } from "@material-ui/core";
import moment from "moment";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const StockList = () => {
  const history = useHistory();

  const [stockDetails, setStockDetails] = useState([]);
  const [loading, setloading] = useState(false);
  let color = "#e9511d";
  const [addStockModal, setAddStockModal] = useState(false);
  const [limit, setLimit] = useState(10); // default slimit
  const [offset, setOffset] = useState(0); // default offset
  const [totalCount, setTotalCount] = useState(0);
  const [productOptions, setProductOptions] = useState([]);
  const [query, setQuery] = useState({
    productId: "",
    fromDate: "",
    toDate: "",
  });

  let initialState = {};

  const getStockListApi = useCallback(
    (limit, offset, query) => {
      const token = localStorage.getItem("token");
      let fromDate = query?.fromDate
        ? moment(query?.fromDate, "DD-MM-YYYY").format("YYYY-MM-DD")
        : "";
      let toDate = query?.toDate
        ? moment(query?.toDate, "DD-MM-YYYY").format("YYYY-MM-DD")
        : "";

      setloading(true);
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      fetch(
        `${
          process.env.REACT_APP_API_URL
        }stock/list?size=${limit}&page=${offset}&productId=${
          query?.productId?.value || ""
        }&fromDate=${fromDate || ""}&toDate=${toDate || ""}`,
        requestOptions
      )
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
            setStockDetails(data?.data?.rows);
            setTotalCount(data?.data?.count);
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
    () => {
      const token = localStorage.getItem("token");

      setloading(true);
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      fetch(`${process.env.REACT_APP_API_URL}product/list`, requestOptions)
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
            let arr = [];
            data?.data?.rows?.map((er) => {
              arr?.push({ label: er?.productName, value: er?.id });
            });
            setProductOptions(arr);
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
    getStockListApi(limit, offset, query);
    getProductListApi();
    // eslint-disable-next-line
  }, [getStockListApi]);

  const toggleStock = useCallback(() => {
    setAddStockModal(!addStockModal);
  }, [addStockModal]);

  const stockColumn = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "product.productName",
        filterable: false,
      },
      {
        Header: "Date",
        Cell: (cellProps) => {
          return (
            <span>
              {cellProps?.row?.original?.stockDate
                ? moment(cellProps?.row?.original?.stockDate).format(
                    "DD-MM-YYYY"
                  )
                : ""}
            </span>
          );
        },
      },
      {
        Header: "Opening Balance",
        accessor: "openingBalance",
        filterable: false,
      },
      {
        Header: "Qty",
        accessor: "qty",
        filterable: false,
      },
      {
        Header: "Closing Balance",
        accessor: "closingBalance",
        filterable: false,
      },
      {
        Header: "Transaction Type",
        Cell: (cellProps) => {
          return (
            <span
              className={`${
                cellProps?.row?.original?.transactionType === "Inward"
                  ? "badge badge-soft-success"
                  : cellProps?.row?.original?.transactionType === "Outward"
                  ? "badge badge-soft-quotation"
                  : ""
              } p-2`}
              style={{ textTransform: "uppercase" }}
            >
              {cellProps?.row?.original?.transactionType}
            </span>
          );
        },
      }, // eslint-disable-next-line
    ],
    // eslint-disable-next-line
    []
  );

  const handleApplyFiter = useCallback(
    (limit, offset, query) => {
      const token = localStorage.getItem("token");
      let fromDate = query?.fromDate
        ? moment(query?.fromDate, "DD-MM-YYYY").format("YYYY-MM-DD")
        : "";
      let toDate = query?.toDate
        ? moment(query?.toDate, "DD-MM-YYYY").format("YYYY-MM-DD")
        : "";

      setloading(true);
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      fetch(
        `${
          process.env.REACT_APP_API_URL
        }stock/filter?size=${limit}&page=${offset}&productId=${
          query?.productId?.value || ""
        }&fromDate=${fromDate || ""}&toDate=${toDate || ""}`,
        requestOptions
      )
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
            setStockDetails(data?.data?.rows);
            setTotalCount(data?.data?.count);
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

  if (loading)
    return (
      <div className="loaderClass" style={{ textAlign: "center" }}>
        <ClipLoader color={color} loading={loading} css={override} size={100} />
      </div>
    );

  return (
    <>
      <MetaTags>
        <title>Coffee Gable | Stock</title>
      </MetaTags>
      <BreadCrumb title={"Stock List"} pageTitle={"Product Management"} />
      <Row className="file-manager-content-fix">
        <Col lg={12}>
          <Card className="file-manager-content w-100 p-3 pt-0">
            <CardHeader className="card-header  border-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-0 fs-15 ">Stock List </h5>
                </div>

                <div className="flex-shrink-0">
                  <Tooltip title={"Add Stock"} placement="left" arrow>
                    <button
                      type="button"
                      className="btn btn-success add-btn"
                      id="create-btn"
                      onClick={toggleStock}
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add{" "}
                    </button>
                  </Tooltip>
                </div>
              </div>
            </CardHeader>
            <div className="bg-soft-light border border-dashed border-start-0 border-end-0">
              <Form>
                <Row className="g-3">
                  <Col md={2}>
                    <div className="input-group">
                      <Flatpickr
                        className={`form-control`}
                        options={{
                          dateFormat: "d-m-Y",
                        }}
                        placeholder={"From Date"}
                        value={query?.fromDate}
                        onChange={(date, dateStr) => {
                          setQuery({ ...query, fromDate: dateStr });
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="input-group">
                      <Flatpickr
                        className={`form-control`}
                        options={{
                          dateFormat: "d-m-Y",
                          minDate: query?.fromDate,
                        }}
                        placeholder={"To Date"}
                        disabled={!query?.fromDate}
                        value={query?.toDate}
                        onChange={(date, dateStr) => {
                          setQuery({
                            ...query,
                            toDate: dateStr,
                          });
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="input-group">
                      <Select
                        isMulti={false}
                        onChange={(e) => {
                          setQuery({ ...query, productId: e });
                        }}
                        value={query?.productId}
                        options={productOptions}
                        name="choices-publish-status-input"
                        className={`w-100`}
                        classNamePrefix="select2-selection form-select"
                        placeholder={"Select Product "}
                      />
                    </div>
                  </Col>

                  <Col md={4}>
                    <button
                      type="button"
                      className="btn-success btn"
                      id="create-btn"
                      onClick={() => {
                        setLimit(10);
                        setOffset(0);
                        handleApplyFiter(10, 0, query);
                      }}
                    >
                      <i className="ri-equalizer-fill me-1 align-bottom"></i>
                      Filter
                    </button>

                    <button
                      type="button"
                      className="btn-danger btn mx-2"
                      id="create-btn"
                      onClick={() => {
                        setQuery({
                          fromDate: "",
                          toDate: "",
                          productId: "",
                        });
                        getStockListApi(10, 0);
                        setLimit(10);
                        setOffset(0);
                      }}
                    >
                      <i className="ri-chat-delete-line me-1 align-bottom"></i>
                      Clear Filter{" "}
                    </button>
                  </Col>
                </Row>
              </Form>
            </div>
            <div className="mt-5 ">
              {stockDetails && stockDetails?.length > 0 ? (
                <>
                  <TableContainer
                    columns={stockColumn}
                    data={stockDetails}
                    isGlobalFilter={false}
                    isAddUserList={false}
                    customPageSize={10}
                    apiCallFunction={getStockListApi}
                    rowDetails={stockDetails}
                    query={query}
                    totalCount={totalCount}
                    limit={limit}
                    offset={offset}
                    setLimit={setLimit}
                    initialState={initialState}
                    setOffset={setOffset}
                    divClass="table-card mb-1 table-responsive"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light text-muted"
                  />
                </>
              ) : (
                "No Record Found"
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {addStockModal && (
        <AddStock
          addStockModal={addStockModal}
          onCloseModal={() => setAddStockModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            getStockListApi(limit, offset);
            setAddStockModal(false);
          }}
        />
      )}
    </>
  );
};
export default StockList;
