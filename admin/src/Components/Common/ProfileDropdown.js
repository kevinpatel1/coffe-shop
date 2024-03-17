import React, { useContext, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//import images
import avatar1 from "../../assets/images/Asset.png";
import { MyContext } from "../Hooks/MyContextProvider";

const ProfileDropdown = () => {
  const { language } = useContext(MyContext);
  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  let Instructor;

  let data = localStorage.getItem("authUser");
  if (data) {
    Instructor = JSON.parse(data);
  }
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center ">
            <img
              className="rounded-circle header-profile-user"
              src={
                Instructor?.profilePhoto
                  ? `${Instructor?.profilePhoto}`
                  : avatar1
              }
              alt="Header Avatar"
            />
            {/* <AccountCircleIcon className="account_circleicon" /> */}
            <span className="text-start mx-2">
              <span className="d-none d-xl-inline-block fw-medium user-name-text">
                {language === "english"
                  ? Instructor?.nameEng
                  : Instructor?.nameGuj}
              </span>
              <span
                className="d-none d-xl-block fs-13 text-muted user-name-sub-text"
                style={{ textTransform: "capitalize" }}
              >
                {language === "english"
                  ? Instructor?.role?.roleNameEng
                  : Instructor?.role?.roleNameGuj}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Welcome {Instructor?.clientName}!</h6>
          <div className="dropdown-divider"></div>
          <DropdownItem href="/profile">
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Profile</span>
          </DropdownItem>
          <DropdownItem href="/logout">
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;
