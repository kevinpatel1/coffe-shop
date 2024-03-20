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
// import AddCustomer from "./AddCustomer";
import { Tooltip } from "@material-ui/core";
import moment from "moment";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const CustomerList = () => {
  const history = useHistory();

  const [customerDetails, setCustomerDetails] = useState([]);
  const [loading, setloading] = useState(false);
  let color = "#e9511d";
  const [addCustomerModal, setAddCustomerModal] = useState(false);
  const [limit, setLimit] = useState(10); // default slimit
  const [offset, setOffset] = useState(0); // default offset
  const [totalCount, setTotalCount] = useState(0);
  const [query, setQuery] = useState({
    name: "",
  });

  let initialState = {};

  const getCustomerListApi = useCallback(
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
        `${process.env.REACT_APP_API_URL}user/list?size=${limit}&page=${offset}`,
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
            setCustomerDetails(data?.data?.rows);
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
    getCustomerListApi(limit, offset, query);
    // eslint-disable-next-line
  }, [getCustomerListApi]);

  const toggleCustomer = useCallback(() => {
    setAddCustomerModal(!addCustomerModal);
  }, [addCustomerModal]);

  const customerColumn = useMemo(
    () => [
      {
        Header: "Username",
        accessor: "userName",
        filterable: false,
      },
      {
        Header: "Name",
        Cell: (cellProps) => {
          return (
            <span>
              {cellProps?.row?.original?.firstName +
                " " +
                cellProps?.row?.original?.lastName}
            </span>
          );
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Role",
        accessor: "role",
        filterable: false,
      },

      {
        Header: "Status",
        Cell: (cellProps) => {
          return (
            <span
              className={`${
                cellProps?.row?.original?.isActive
                  ? " badge badge-soft-success"
                  : "badge badge-soft-danger"
              }`}
            >
              {cellProps?.row?.original?.isActive ? "Active" : "InActive"}
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
        <title>Coffee Gable | Customer</title>
      </MetaTags>
      <BreadCrumb title={"Customer List"} pageTitle={"Product Management"} />
      <Row className="file-manager-content-fix">
        <Col lg={12}>
          <Card className="file-manager-content w-100 p-3 pt-0">
            <CardHeader className="card-header  border-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-0 fs-15 ">Customer List </h5>
                </div>
              </div>
            </CardHeader>

            <div className="mt-5 ">
              {customerDetails && customerDetails?.length > 0 ? (
                <>
                  <TableContainer
                    columns={customerColumn}
                    data={customerDetails}
                    isGlobalFilter={false}
                    isAddUserList={false}
                    customPageSize={10}
                    apiCallFunction={getCustomerListApi}
                    rowDetails={customerDetails}
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
export default CustomerList;
