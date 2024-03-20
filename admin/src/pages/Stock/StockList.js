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
  const [query, setQuery] = useState({
    name: "",
  });

  let initialState = {};

  const getStockListApi = useCallback(
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
        `${process.env.REACT_APP_API_URL}stock/list?size=${limit}&page=${offset}`,
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

  useEffect(() => {
    getStockListApi(limit, offset, query);
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
