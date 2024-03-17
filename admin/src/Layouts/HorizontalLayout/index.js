import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Collapse } from "reactstrap";
import { languageData } from "../../helpers/StaticLanguageData";

// Import Data
import navdata from "../VerticalLayouts/LayoutMenuData";
//i18n
import { withTranslation } from "react-i18next";
import { MyContext } from "../../Components/Hooks/MyContextProvider";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useBreakPoints from "../../hooks/useBreakPoints";

const HorizontalLayout = (props) => {
  const [isMoreMenu, setIsMoreMenu] = useState(false);
  const location = useLocation();
  const { isTablet } = useBreakPoints();
  const { language } = useContext(MyContext);
  const [sidebarMenu, setSidebarMenu] = useState({
    selectedMenu: "",
    SubmenuOpen: false,
  });
  const navData = navdata().props.children;
  let menuItems = [];
  let splitMenuItems = [];
  let menuSplitContainer = 11;
  navData.forEach(function (value, key) {
    if (value["isHeader"]) {
      menuSplitContainer++;
    }
    if (key >= menuSplitContainer) {
      let val = value;
      val.childItems = value.subItems;
      val.isChildItem = value.subItems ? true : false;
      delete val.subItems;
      splitMenuItems.push(val);
    } else {
      menuItems.push(value);
    }
  });
  // menuItems.push({ id: 'more', zxc: 'More', icon: 'ri-briefcase-2-line', link: "/#", stateVariables: isMoreMenu, subItems: splitMenuItems, click: function (e) { e.preventDefault(); setIsMoreMenu(!isMoreMenu); }, });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const pathName = process.env.PUBLIC_URL + props.location.pathname;
      const ul = document.getElementById("navbar-nav");
      const items = ul.getElementsByTagName("a");
      let itemsArray = [...items]; // converts NodeList to Array
      // removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        // activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname, props.layoutType]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute(
        "aria-expanded",
        "true"
      );
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement
          .closest(".collapse")
          .classList.add("show");
        var parentElementDiv =
          parentCollapseDiv.parentElement.closest(
            ".collapse"
          ).previousElementSibling;
        if (parentElementDiv) parentElementDiv.classList.add("active");
        var parentElementSibling =
          parentElementDiv.parentElement.parentElement.parentElement
            .previousElementSibling;
        if (parentElementSibling) {
          parentElementSibling.classList.add("active");
        }
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains("active"));

    actiItems.forEach((item) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  };

  const handleToggleMenu = (selectedMenu) => {
    if (selectedMenu === sidebarMenu.selectedMenu) {
      setSidebarMenu({
        selectedMenu: selectedMenu,
        SubmenuOpen: !sidebarMenu.SubmenuOpen,
      });
    } else {
      setSidebarMenu({ selectedMenu: selectedMenu, SubmenuOpen: true });
    }
  };

  return (
    <React.Fragment>
      {(menuItems || []).map((item, key) => {
        return (
          <React.Fragment key={key}>
            {/* Main Header */}
            {!item["isHeader"] ? (
              item.subItems?.length > 0 ? (
                <li
                  className="nav-item"
                  onClick={() => {
                    handleToggleMenu(item.labelEng);
                  }}
                >
                  <div
                  style={{cursor: "pointer"}}
                    // onClick={item.click}
                    className={`nav-link menu-link ${
                      location?.pathname === item?.link ||
                      item.subItems?.find(
                        (er) => er?.link === location?.pathname
                      )
                        ? "active"
                        : ""
                    }`}
                    // to={item.link ? item.link : "/#"}
                    data-bs-toggle="collapse"
                  >
                    <i className={item.icon}></i>{" "}
                    <span data-key="t-apps">
                      {props.t(
                        language === "english"
                          ? item.labelEng
                          : language === "gujarati"
                          ? item.labelGuj
                          : ""
                      )}
                    </span>
                  </div>
                  <Collapse
                    className={`menu-dropdown ${
                      isTablet
                        ? sidebarMenu.selectedMenu === item?.labelEng &&
                          sidebarMenu.SubmenuOpen === true
                          ? "show-sub"
                          : "hideSubmenu"
                        : ""
                    }`}
                    isOpen={item.stateVariables}
                    id="sidebarApps"
                  >
                    <ul className="nav nav-sm flex-column test">
                      {/* subItms  */}
                      {item.subItems?.length > 0 &&
                        (item.subItems || []).map((subItem, key) => (
                          <React.Fragment key={key}>
                            {subItem?.isMaster && <hr />}
                            {!subItem.isChildItem ? (
                              <li className="nav-item">
                                <Link
                                  to={subItem.link ? subItem.link : "/#"}
                                  className={`nav-link  ${
                                    location?.pathname === subItem?.link
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  {props.t(
                                    language === "english"
                                      ? subItem.labelEng
                                      : language === "gujarati"
                                      ? subItem.labelGuj
                                      : ""
                                  )}
                                </Link>
                              </li>
                            ) : (
                              <li className="nav-item">
                                <Link
                                  onClick={subItem.click}
                                  className="nav-link"
                                  to="/#"
                                  data-bs-toggle="collapse"
                                >
                                  {" "}
                                  {props.t(
                                    language === "english"
                                      ? subItem.labelEng
                                      : language === "gujarati"
                                      ? subItem.labelGuj
                                      : ""
                                  )}
                                </Link>
                                <Collapse
                                  className="menu-dropdown"
                                  isOpen={subItem.stateVariables}
                                >
                                  <ul className="nav nav-sm flex-column">
                                    {/* child subItms  */}
                                    {subItem.childItems &&
                                      (subItem.childItems || []).map(
                                        (subChildItem, key) => (
                                          <React.Fragment key={key}>
                                            {!subChildItem.isChildItem ? (
                                              <li className="nav-item">
                                                <Link
                                                  to={
                                                    subChildItem.link
                                                      ? subChildItem.link
                                                      : "/#"
                                                  }
                                                  className="nav-link"
                                                >
                                                  {props.t(
                                                    language === "english"
                                                      ? subChildItem.labelEng
                                                      : language === "gujarati"
                                                      ? subChildItem.labelGuj
                                                      : ""
                                                  )}
                                                </Link>
                                              </li>
                                            ) : (
                                              <li className="nav-item">
                                                <Link
                                                  onClick={subChildItem.click}
                                                  className="nav-link"
                                                  to="/#"
                                                  data-bs-toggle="collapse"
                                                >
                                                  {" "}
                                                  {props.t(
                                                    language === "english"
                                                      ? subChildItem.labelEng
                                                      : language === "gujarati"
                                                      ? subChildItem.labelGuj
                                                      : ""
                                                  )}
                                                </Link>
                                                <Collapse
                                                  className="menu-dropdown"
                                                  isOpen={
                                                    subChildItem.stateVariables
                                                  }
                                                  id="sidebarEcommerce"
                                                >
                                                  <ul className="nav nav-sm flex-column">
                                                    {/* child subItms  */}
                                                    {subChildItem.childItems &&
                                                      (
                                                        subChildItem.childItems ||
                                                        []
                                                      ).map(
                                                        (
                                                          subSubChildItem,
                                                          key
                                                        ) => (
                                                          <li
                                                            className="nav-item apex"
                                                            key={key}
                                                          >
                                                            <Link
                                                              to={
                                                                subSubChildItem.link
                                                                  ? subSubChildItem.link
                                                                  : "/#"
                                                              }
                                                              className="nav-link"
                                                            >
                                                              {props.t(
                                                                language ===
                                                                  "english"
                                                                  ? subSubChildItem.labelEng
                                                                  : language ===
                                                                    "gujarati"
                                                                  ? subSubChildItem.labelGuj
                                                                  : ""
                                                              )}
                                                            </Link>
                                                          </li>
                                                        )
                                                      )}
                                                  </ul>
                                                </Collapse>
                                              </li>
                                            )}
                                          </React.Fragment>
                                        )
                                      )}
                                  </ul>
                                </Collapse>
                              </li>
                            )}
                          </React.Fragment>
                        ))}
                    </ul>
                  </Collapse>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    className={`nav-link menu-link ${
                      location?.pathname === item?.link ||
                      (location?.pathname === "/addproposal" &&
                        item?.labelEng === "Proposal") ||
                      (location?.pathname === "/editproposal" &&
                        item?.labelEng === "Proposal") ||
                      (location?.pathname === "/addscript" &&
                        item?.labelEng === "Script") ||
                      (location?.pathname === "/viewscript" &&
                        item?.labelEng === "Script") ||
                      (location?.pathname === "/editscript" &&
                        item?.labelEng === "Script") ||
                      (location?.pathname === "/addagenda" &&
                        item?.labelEng === "Agenda ") ||
                      (location?.pathname === "/editagenda" &&
                        item?.labelEng === "Agenda ") ||
                      (location?.pathname === "/addmember" &&
                        item?.labelEng === "Member") ||
                      (location?.pathname === "/editmember" &&
                        item?.labelEng === "Member")
                        ? "active"
                        : ""
                    }`}
                    to={item.link ? item.link : "/#"}
                  >
                    <i className={item.icon}></i>{" "}
                    <span>
                      {props.t(
                        language === "english"
                          ? item.labelEng
                          : language === "gujarati"
                          ? item.labelGuj
                          : ""
                      )}
                    </span>
                  </Link>
                </li>
              )
            ) : (
              <li className="menu-title">
                <span data-key="t-menu">
                  {props.t(
                    language === "english"
                      ? item.labelEng
                      : language === "gujarati"
                      ? item.labelGuj
                      : ""
                  )}
                </span>
              </li>
            )}
          </React.Fragment>
        );
      })}
      {/* menu Items */}
    </React.Fragment>
  );
};

HorizontalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(HorizontalLayout));
