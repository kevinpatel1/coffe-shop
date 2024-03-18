import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const menuList = [
  {
    moduleId: 1,
    label: "Dashboard",
    icon: "asd",
    tabKey: "dashboard",
    link: "/",
    position: 0,
    subItems: [],
    permission: {
      access: true,
      create: true,
      list: true,
      edit: true,
      delete: true,
    },
  },
  {
    moduleId: 2,
    label: "Product Management",
    icon: "zcxc",
    tabKey: "product",
    link: "",
    position: 1,
    subItems: [
      {
        moduleId: 2,
        subModuleId: 19,
        label: "Category",
        isMaster: false,
        icon: null,
        tabKey: "product",
        position: 0,
        link: "/category",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 2,
        subModuleId: 19,
        label: "Product",
        isMaster: false,
        icon: null,
        tabKey: "product",
        position: 0,
        link: "/product",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 2,
        subModuleId: 19,
        label: "Stock",
        isMaster: false,
        icon: null,
        tabKey: "product",
        position: 0,
        link: "/stock",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
    ],
    permission: {
      access: true,
      create: true,
      list: true,
      edit: true,
      delete: true,
    },
  },
  {
    moduleId: 1,
    label: "Customer Management",
    icon: "asd",
    tabKey: "customer",
    link: "/customer",
    position: 0,
    subItems: [],
    permission: {
      access: true,
      create: true,
      list: true,
      edit: true,
      delete: true,
    },
  },
  {
    moduleId: 1,
    label: "Transcations",
    icon: "asd",
    tabKey: "transcations",
    link: "/transcations",
    position: 0,
    subItems: [],
    permission: {
      access: true,
      create: true,
      list: true,
      edit: true,
      delete: true,
    },
  },
];
const Navdata = () => {
  const history = useHistory();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAppointment, setisAppointment] = useState(false);
  const [isDiagnosis, setisDiagnosis] = useState(false);
  const [isPharmacy, setisPharmacy] = useState(false);
  const [isPathologist, setisPathologist] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const [isCustomer, setisCustomer] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "Master") {
      setIsMaster(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "Appointment") {
      setisAppointment(false);
    }
    if (iscurrentState !== "Pharmacy") {
      setisPharmacy(false);
    }
    if (iscurrentState !== "Pathologist") {
      setisPathologist(false);
    }
    if (iscurrentState !== "Diagnosis") {
      setisDiagnosis(false);
    }
    if (iscurrentState !== "Customer") {
      setisCustomer(false);
    }
  }, [history, iscurrentState, isDashboard, isPages, isBaseUi]);

  let localStorageData;

  let data = localStorage.getItem("authUser");
  if (data) {
    localStorageData = JSON.parse(data);
  }

  console.log("menuList: ", menuList);
  return <React.Fragment>{menuList}</React.Fragment>;
};
export default Navdata;
