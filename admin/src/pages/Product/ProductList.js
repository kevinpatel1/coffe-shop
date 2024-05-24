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
import DeleteModal from "../../Components/Common/DeleteModal";
import { MetaTags } from "react-meta-tags";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import EditIcon from "../../assets/icon/Edit.svg";
import DeleteIcon from "../../assets/icon/Delete.svg";
import { Tooltip } from "@material-ui/core";
const override = css`
  display: block;
  margin: 0 auto;
  color: black;
  height: 100%;
`;

const ProductList = () => {
  const history = useHistory();

  const [productDetails, setProductDetails] = useState([]);
  const [loading, setloading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  let color = "#e9511d";
  const [addProductModal, setAddProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [singleProductDetails, setSingleProductDetails] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [limit, setLimit] = useState(10); // default slimit
  const [offset, setOffset] = useState(0); // default offset
  const [totalCount, setTotalCount] = useState(0);
  const [query, setQuery] = useState({
    name: "",
  });

  let initialState = {};

  const getProductListApi = useCallback(
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
        `${process.env.REACT_APP_API_URL}product/list?size=${limit}&page=${offset}`,
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
            setProductDetails(data?.data?.rows);
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
    getProductListApi(limit, offset, query);
    // eslint-disable-next-line
  }, [getProductListApi]);

  const toggleProduct = useCallback(() => {
    setAddProductModal(!addProductModal);
  }, [addProductModal]);

  const productColumn = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "productName",
        filterable: false,
      },
      {
        Header: "Product Category",
        accessor: "category.categoryName",
        filterable: false,
      },
      {
        Header: "Product Price",
        accessor: "price",
        filterable: false,
      },
      {
        Header: "Product Stock",
        accessor: "stock",
        filterable: false,
      },

      {
        id: "Action",
        Header: () => (
          <span
            className="d-flex justify-content-center"
            style={{ textAlign: "center" }}
          >
            Action
          </span>
        ),
        Cell: (cellProps) => {
          return (
            <div className="d-flex justify-content-center align-items-center gap-2">
              <div className="hstack gap-2">
                <Tooltip title={"Edit"} placement="left" arrow>
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setEditProductModal(true);
                      setSingleProductDetails(cellProps?.row?.original);
                    }}
                    src={EditIcon}
                    height={23}
                    width={24}
                    alt="Edit"
                  />
                </Tooltip>

                <Tooltip title={"Delete"} placement="right" arrow>
                  <img
                    onClick={() => {
                      setDeleteModal(true);
                      setSelectedId(cellProps.row.original?.id);
                    }}
                    style={{ cursor: "pointer" }}
                    src={DeleteIcon}
                    height={23}
                    width={24}
                    alt="Delete"
                  />
                </Tooltip>
              </div>
            </div>
          );
        },
      },
      // eslint-disable-next-line
    ],
    // eslint-disable-next-line
    []
  );

  const onDeleteButtonClick = () => {
    const token = localStorage.getItem("token");

    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    fetch(
      `${process.env.REACT_APP_API_URL}product/delete/${selectedId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.err_msg === "Invalid Token") {
          localStorage.clear();
          history.push("/logout");
          // toast.error("Session Expired.");
        }
        if (data.status) {
          setDeleteModal(false);
          toast.success("Record Deleted Successfully.");
          getProductListApi(limit, offset, query);
        } else {
          setDeleteModal(false);
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
        <title>Coffee Gable | Product</title>
      </MetaTags>
      <BreadCrumb title={"Product List"} pageTitle={"Product Management"} />
      <Row className="file-manager-content-fix">
        <Col lg={12}>
          <Card className="file-manager-content w-100 p-3 pt-0">
            <CardHeader className="card-header  border-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <h5 className="card-title mb-0 fs-15 ">Product List </h5>
                </div>

                <div className="flex-shrink-0">
                  <Tooltip title={"Add Product"} placement="left" arrow>
                    <button
                      type="button"
                      className="btn btn-success add-btn"
                      id="create-btn"
                      onClick={toggleProduct}
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add{" "}
                    </button>
                  </Tooltip>
                </div>
              </div>
            </CardHeader>

            <div className="mt-5 ">
              {productDetails && productDetails?.length > 0 ? (
                <>
                  <TableContainer
                    columns={productColumn}
                    data={productDetails}
                    isGlobalFilter={false}
                    isAddUserList={false}
                    customPageSize={10}
                    apiCallFunction={getProductListApi}
                    rowDetails={productDetails}
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

      {addProductModal && (
        <AddProduct
          addProductModal={addProductModal}
          onCloseModal={() => setAddProductModal(false)}
          onModalSubmitBtnClk={() => {
            setloading(true);
            getProductListApi(limit, offset);
            setAddProductModal(false);
          }}
        />
      )}
      {editProductModal && (
        <EditProduct
          editProductModal={editProductModal}
          onCloseModal={() => {
            setEditProductModal(false);
            setSingleProductDetails({});
          }}
          onModalSubmitBtnClk={() => {
            setloading(true);
            getProductListApi(limit, offset);
            setEditProductModal(false);
            setSingleProductDetails({});
          }}
          row={singleProductDetails}
        />
      )}

      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => {
          onDeleteButtonClick(true);
        }}
        onCloseClick={() => setDeleteModal(false)}
      />
    </>
  );
};
export default ProductList;
