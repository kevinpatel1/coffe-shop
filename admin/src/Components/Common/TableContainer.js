import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input } from "reactstrap";
import { DefaultColumnFilter } from "./filters";

import { Pagination } from "antd";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Col sm={4}>
      <div className="search-box me-2 mb-2 d-inline-block">
        <div className="position-relative">
          <label htmlFor="search-bar-0" className="search-label">
            <span id="search-bar-0-label" className="sr-only">
              Search this table
            </span>
            <input
              onChange={(e) => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
              id="search-bar-0"
              type="text"
              className="form-control"
              placeholder={`${count} records...`}
              value={value || ""}
            />
          </label>
          <i className="bx bx-search-alt search-icon"></i>
        </div>
      </div>
    </Col>
  );
}

const TableContainer = ({
  columns,
  data,
  isGlobalSearch,
  isGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  tableClass,
  theadClass,
  thClass,
  divClass,
  apiCallFunction,
  rowDetails,
  totalCount,
  limit,
  offset,
  setOffset,
  initialState,
  query,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageOptions,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: initialState,
      pageSize: customPageSize,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  useEffect(() => {
    if (customPageSize) {
      setPageSize(customPageSize);
    }
    // eslint-disable-next-line
  }, [customPageSize]);
  const [currentPageNo, setCurrentPageNo] = React.useState(1);

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " " : "") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const currentPage = Math.ceil((offset + 1) / limit);

  const totalPages = Math.ceil(totalCount / limit);

  function handleNext() {
    // Increment the offset by the limit to get the next set of records
    setOffset(offset + limit);
    apiCallFunction(limit, offset + limit, query);
  }

  function handlePrevious() {
    // Decrement the offset by the limit to get the previous set of records
    setOffset(Math.max(offset - limit, 0)); // ensure offset is non-negative
    apiCallFunction(limit, Math.max(offset - limit, 0), query);
  }
  function handleDirectClick(pageNo) {
    // Decrement the offset by the limit to get the previous set of records
    setOffset((parseInt(limit) * pageNo, 0)); // ensure (parseInt(limit) * pageNo) is non-negative
    apiCallFunction(limit, (parseInt(limit) * pageNo, 0), query);
  }
  const elementsArray = Array.from({ length: totalPages }, (_, index) => (
    <>
      <li>
        <p
          onClick={() => {
            handleDirectClick(index);
          }}
        >
          {index + 1}
        </p>
      </li>
    </>
  ));

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPageNo(page);
    // Do something with the page and pageSize
    setOffset(page * pageSize - pageSize); // ensure (parseInt(limit) * pageNo) is non-negative
    apiCallFunction(limit, page * pageSize - pageSize, query);
    // You can perform additional actions here based on the page or pageSize
  };

  return (
    <Fragment>
      {isGlobalSearch ||
        isGlobalFilter ||
        isAddOptions ||
        isAddUserList ||
        (isAddCustList && (
          <Row className="mb-2">
            {isGlobalSearch && (
              <Col md={1}>
                <select
                  className="form-select"
                  value={pageSize}
                  onChange={onChangeInSelect}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </Col>
            )}
            {isGlobalFilter && (
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            )}
            {isAddOptions && (
              <Col sm="7">
                <div className="text-sm-end">
                  <Button
                    type="button"
                    color="success"
                    className="btn-rounded  mb-2 me-2"
                    onClick={handleOrderClicks}
                  >
                    <i className="mdi mdi-plus me-1" />
                    Add New Order
                  </Button>
                </div>
              </Col>
            )}
            {isAddUserList && (
              <Col sm="7">
                <div className="text-sm-end">
                  <Button
                    type="button"
                    color="primary"
                    className="btn mb-2 me-2"
                    onClick={handleUserClick}
                  >
                    <i className="mdi mdi-plus-circle-outline me-1" />
                    Create New User
                  </Button>
                </div>
              </Col>
            )}
            {isAddCustList && (
              <Col sm="7">
                <div className="text-sm-end">
                  <Button
                    type="button"
                    color="success"
                    className="btn-rounded mb-2 me-2"
                    onClick={handleCustomerClick}
                  >
                    <i className="mdi mdi-plus me-1" />
                    New Customers
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        ))}
      <div className={divClass}>
        <Table hover {...getTableProps()} className={tableClass}>
          <thead className={theadClass}>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    className={`${thClass} custom-header-table text-start`}
                    {...column.getSortByToggleProps()}
                  >
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>
      {apiCallFunction && (
        // <div className=" d-flex justify-content-md-between justify-content-between align-items-center pe-2">
        // <div>
        //   Total {"    "}
        //   <strong>{totalCount}</strong>
        //   {"    "} items
        // </div>

        //   <div>
        //     <Row>
        //       <Col className="col-md-auto d-md-block">
        //         {/* Page{" "}
        //       <strong>
        //         {currentPage || 0} - {totalPages || 0}
        //       </strong> */}
        //         <ul id="pagination">
        //           <li>
        //             <p
        //               className=""
        //               onClick={handlePrevious}
        //               disabled={offset === 0}
        //             >
        //               «
        //             </p>
        //           </li>
        //           {elementsArray}

        //           <li>
        //             <p
        //               onClick={handleNext}
        //               disabled={rowDetails?.length + offset === totalCount}
        //             >
        //               »
        //             </p>
        //           </li>
        //         </ul>
        //       </Col>
        //     </Row>
        //   </div>
        // </div>
        <div className="d-flex justify-content-between w-100 ">
          <div className="d-flex w-100">
            Total <strong className="mx-1">{totalCount}</strong> items
          </div>
          <div className="d-flex justify-content-end w-100">
            <Pagination
              total={totalCount}
              // showTotal={(total) => `Total ${total} items`}
              showSizeChanger={false}
              defaultPageSize={limit}
              defaultCurrent={currentPage}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
