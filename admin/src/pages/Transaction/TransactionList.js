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
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import moment from "moment";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const TransactionList = () => {
  const history = useHistory();

  const [transactionDetails, setTransactionDetails] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [loading, setloading] = useState(false);
  let color = "#e9511d";
  const [addTransactionModal, setAddTransactionModal] = useState(false);
  const [limit, setLimit] = useState(10); // default slimit
  const [offset, setOffset] = useState(0); // default offset
  const [totalCount, setTotalCount] = useState(0);
  const [query, setQuery] = useState({
    userId: "",
    fromDate: "",
    toDate: "",
  });

  let initialState = {};

  const getTransactionListApi = useCallback(
    (limit, offset, query) => {
      const token = localStorage.getItem("token");

      setloading(true);
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      fetch(
        `${process.env.REACT_APP_API_URL}transaction/list?size=${limit}&page=${offset}`,
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
            setTransactionDetails(data?.data?.rows);
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

  const getCustomerListApi = useCallback(
    (limit, offset, query) => {
      const token = localStorage.getItem("token");

      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      };
      fetch(`${process.env.REACT_APP_API_URL}user/list`, requestOptions)
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

            // eslint-disable-next-line
            data?.data?.rows?.map((er) => {
              arr?.push({
                label: `${er?.firstName} ${er?.lastName}`,
                value: er?.id,
              });
            });
            setCustomerDetails(arr);
          } else {
            toast.error(data?.message);
          }
        })
        .catch((error) => {
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
    getTransactionListApi(limit, offset, query);
    getCustomerListApi();
    // eslint-disable-next-line
  }, [getTransactionListApi]);

  const toggleTransaction = useCallback(() => {
    setAddTransactionModal(!addTransactionModal);
  }, [addTransactionModal]);

  const transactionColumn = useMemo(
    () => [
      {
        Header: "SR No",
        Cell: (cellProps) => {
          return <span>{cellProps?.row?.index + 1}</span>;
        },
      },
      {
        Header: "Date",
        Cell: (cellProps) => {
          return (
            <span>
              {cellProps?.row?.original?.createdAt
                ? moment(cellProps?.row?.original?.createdAt).format(
                    "DD-MM-YYYY"
                  )
                : ""}
            </span>
          );
        },
      },
      {
        Header: "Customer Name",
        Cell: (cellProps) => {
          return (
            <span>
              {cellProps?.row?.original?.user?.firstName +
                " " +
                cellProps?.row?.original?.user?.lastName}
            </span>
          );
        },
      },
      {
        Header: "Order No",
        accessor: "orderId",
        filterable: false,
      },
      {
        Header: "Payment Id",
        accessor: "paymentId",
        filterable: false,
      },

      {
        Header: "Amount",
        Cell: (cellProps) => {
          return (
            <span className={` badge badge-soft-success`}>
              {cellProps?.row?.original?.price}
            </span>
          );
        },
      }, // eslint-disable-next-line
    ],
    // eslint-disable-next-line
    []
  );

  const handleChangeFilter = (name, value) => {
    console.log("name: ", name);

    let queryObj = { ...query };
    queryObj[name] = value;
    setQuery(queryObj);
  };

  const handleApplyFiter = (limit, offset) => {
    setloading(true);
    let fromDate = query?.fromDate
      ? moment(query?.fromDate, "DD-MM-YYYY").format("YYYY-MM-DD")
      : "";
    let toDate = query?.toDate
      ? moment(query?.toDate, "DD-MM-YYYY").format("YYYY-MM-DD")
      : "";

    const token = localStorage.getItem("token");

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
      }transaction/list?size=${limit}&page=${offset}&fromDate=${
        fromDate || ""
      }&toDate=${toDate || ""}`,
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
          setTransactionDetails(data?.data?.rows);
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
  };

  if (loading)
    return (
      <div className="loaderClass" style={{ textAlign: "center" }}>
        <ClipLoader color={color} loading={loading} css={override} size={100} />
      </div>
    );

  return (
    <>
      <MetaTags>
        <title>Coffee Gable | Transaction</title>
      </MetaTags>
      <BreadCrumb title={"Transaction List"} pageTitle={"Product Management"} />
      <Row className="file-manager-content-fix">
        <Col lg={12}>
          <Card className="file-manager-content w-100 p-3 pt-0">
            <CardHeader className="card-header  border-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-0 fs-15 ">Transaction List </h5>
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
                          handleChangeFilter("fromDate", dateStr);
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
                          handleChangeFilter("toDate", dateStr);
                        }}
                      />
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="input-group">
                      <Select
                        isMulti={false}
                        onChange={(e) => {
                          handleChangeFilter("userId", e);
                        }}
                        value={query?.userId}
                        options={customerDetails}
                        name="choices-publish-status-input"
                        className={`w-100`}
                        classNamePrefix="select2-selection form-select"
                        placeholder={"Select Customer"}
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
                        handleApplyFiter(10, 0);
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
                        });
                        getTransactionListApi(10, 0);
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
              {transactionDetails && transactionDetails?.length > 0 ? (
                <>
                  <TableContainer
                    columns={transactionColumn}
                    data={transactionDetails}
                    isGlobalFilter={false}
                    isAddUserList={false}
                    customPageSize={10}
                    apiCallFunction={getTransactionListApi}
                    rowDetails={transactionDetails}
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
    </>
  );
};
export default TransactionList;
