import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";

const BreadCrumb = ({ title, pageTitle, backIcon, url }) => {
  const history = useHistory();

  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <div className="d-flex">
              {backIcon ? (
                <i
                  className={`fs-24 align-middle ${backIcon} mb-sm-0`}
                  style={{
                    cursor: "pointer",
                    color: "#405189",
                    paddingRight: "9px",
                  }}
                  onClick={() => history.push(`${url}`)}
                ></i>
              ) : null}
              {/* <i className={`fs-24 align-middle ${backIcon} mb-sm-0`} style={{ cursor: 'pointer', color: '#405189', paddingRight: '9px' }} onClick={() => history.push(`${url}`)}></i> */}

              <h4 className="mb-sm-0 pt-2">{title}</h4>
            </div>
            {pageTitle && (
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <Link to="#">{pageTitle}</Link>
                  </li>
                  <li className="breadcrumb-item active">{title}</li>
                </ol>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default BreadCrumb;
