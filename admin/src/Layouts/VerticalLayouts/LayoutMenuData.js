import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const menuList = [
  {
    moduleId: 1,
    labelEng: "Dashboard",
    labelGuj: "ડેશબોર્ડ",
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
    labelEng: "Councillor",
    labelGuj: "કાઉન્સિલર",
    icon: "zcxc",
    tabKey: "councillor",
    link: "",
    position: 1,
    subItems: [
      {
        moduleId: 2,
        subModuleId: 19,
        labelEng: "Member Profile",
        labelGuj: "સભ્યની પ્રોફાઇલ",
        isMaster: false,
        icon: null,
        tabKey: "councillor",
        position: 0,
        link: "/member",
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
        subModuleId: 20,
        labelEng: "Members Disciplinary Detail",
        labelGuj: "સભ્યની શાખાકીય બાબતો",
        isMaster: false,
        icon: null,
        tabKey: "councillor",
        position: 1,
        link: "/memberdisciplinary",
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
        subModuleId: 1,
        labelEng: "Committee",
        labelGuj: "સમિતિ",
        isMaster: true,
        icon: null,
        tabKey: "councillor",
        position: 2,
        link: "/committee",
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
        subModuleId: 2,
        labelEng: "Designation",
        labelGuj: "જ​વાબદારી",
        isMaster: false,
        icon: null,
        tabKey: "councillor",
        position: 3,
        link: "/designation",
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
        subModuleId: 3,
        labelEng: "Ward",
        labelGuj: "વોર્ડ",
        isMaster: false,
        icon: null,
        tabKey: "councillor",
        position: 4,
        link: "/ward",
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
        subModuleId: 4,
        labelEng: "Political Party",
        labelGuj: "રાજકીય પક્ષ",
        isMaster: false,
        icon: null,
        tabKey: "councillor",
        position: 5,
        link: "/politicalparty",
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
        subModuleId: 15,
        labelEng: "Incumbency Detail",
        labelGuj: "સત્તાની વિગતો",
        isMaster: false,
        icon: null,
        tabKey: "councillor",
        position: 6,
        link: "/incumbencyDetails",
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
        subModuleId: 16,
        labelEng: "Department",
        labelGuj: "વિભાગો",
        isMaster: false,
        icon: null,
        tabKey: "councillor",
        position: 7,
        link: "/departments",
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
        subModuleId: 36,
        labelEng: "Year",
        labelGuj: "વર્ષ",
        isMaster: false,
        icon: null,
        tabKey: "councillor",
        position: 32,
        link: "/year",
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
        subModuleId: 37,
        labelEng: "Education Qualification",
        labelGuj: "શૈક્ષણિક લાયકાત",
        isMaster: false,
        icon: null,
        tabKey: "councillor",
        position: 33,
        link: "/educationqualification",
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
    moduleId: 3,
    labelEng: "Administrative Work",
    labelGuj: "વહીવટી કાર્ય",
    icon: null,
    tabKey: "administrative",
    link: null,
    position: 2,
    subItems: [
      {
        moduleId: 3,
        subModuleId: 21,
        labelEng: "Proposal",
        labelGuj: "દરખાસ્ત",
        isMaster: false,
        icon: null,
        tabKey: "administrative",
        position: 8,
        link: "/proposal",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 3,
        subModuleId: 22,
        labelEng: "Script",
        labelGuj: "સંક્ષિપ્ત વર્ણન",
        isMaster: false,
        icon: null,
        tabKey: "administrative",
        position: 9,
        link: "/script",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 3,
        subModuleId: 23,
        labelEng: "Agenda",
        labelGuj: "એજન્ડા",
        isMaster: false,
        icon: null,
        tabKey: "administrative",
        position: 10,
        link: "/agenda",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 3,
        subModuleId: 24,
        labelEng: "Pending Agenda Approval",
        labelGuj: "બાકી એજન્ડાની મંજૂરી",
        isMaster: false,
        icon: null,
        tabKey: "administrative",
        position: 11,
        link: "/pendingagendaapproval",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 3,
        subModuleId: 25,
        labelEng: "Resolution",
        labelGuj: "ઠરાવ",
        isMaster: false,
        icon: null,
        tabKey: "administrative",
        position: 12,
        link: "/resolution",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 3,
        subModuleId: 27,
        labelEng: "Proceeding",
        labelGuj: "અમુક વર્તન",
        isMaster: false,
        icon: null,
        tabKey: "administrative",
        position: 13,
        link: "/proceeding",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 3,
        subModuleId: 7,
        labelEng: "Proposal Type",
        labelGuj: "પ્રસ્તાવનો પ્રકાર",
        isMaster: true,
        icon: null,
        tabKey: "administrative",
        position: 14,
        link: "/proposaltype",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 3,
        subModuleId: 8,
        labelEng: "Proposal For",
        labelGuj: "દરખાસ્ત સંદર્ભે",
        isMaster: false,
        icon: null,
        tabKey: "administrative",
        position: 15,
        link: "/proposalfor",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 3,
        subModuleId: 9,
        labelEng: "Status",
        labelGuj: "સ્ટેટ્સ",
        isMaster: false,
        icon: null,
        tabKey: "administrative",
        position: 16,
        link: "/status",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 3,
        subModuleId: 10,
        labelEng: "Agenda Status",
        labelGuj: "એજન્ડા સ્ટેટ્સ",
        isMaster: false,
        icon: null,
        tabKey: "administrative",
        position: 17,
        link: "/agendaStatus",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 3,
        subModuleId: 38,
        labelEng: "Correction Proposal",
        labelGuj: "સુધારણા દરખાસ્ત",
        isMaster: false,
        icon: null,
        tabKey: "administrative",
        position: 34,
        link: "/correctionProposal",
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
    moduleId: 4,
    labelEng: "Letter",
    labelGuj: "પત્ર",
    icon: null,
    tabKey: "letter",
    link: null,
    position: 3,
    subItems: [
      {
        moduleId: 4,
        subModuleId: 26,
        labelEng: "Issue Letter",
        labelGuj: "પત્ર નોંધણી",
        isMaster: false,
        icon: null,
        tabKey: "letter",
        position: 18,
        link: "/issueletter",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 4,
        subModuleId: 17,
        labelEng: "Letter For",
        labelGuj: "પત્ર સંદર્ભે",
        isMaster: true,
        icon: null,
        tabKey: "letter",
        position: 19,
        link: "/letterfor",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 4,
        subModuleId: 12,
        labelEng: "Letter Type",
        labelGuj: "પત્રનાં પ્રકારો",
        isMaster: false,
        icon: null,
        tabKey: "letter",
        position: 20,
        link: "/lettertypelist",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 4,
        subModuleId: 18,
        labelEng: "Letter Field",
        labelGuj: "પત્રની ફિલ્ડ",
        isMaster: false,
        icon: null,
        tabKey: "letter",
        position: 21,
        link: "/lettertokenlist",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 4,
        subModuleId: 14,
        labelEng: "Letter Content",
        labelGuj: "પત્રની વિગતો",
        isMaster: false,
        icon: null,
        tabKey: "letter",
        position: 22,
        link: "/lettercontent",
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
    moduleId: 5,
    labelEng: "Salary ",
    labelGuj: "માનદ વેતન",
    icon: null,
    tabKey: "salary",
    link: null,
    position: 4,
    subItems: [
      {
        moduleId: 5,
        subModuleId: 31,
        labelEng: "Issue Salary",
        labelGuj: "ઇશ્યૂ માનદ વેતન",
        isMaster: false,
        icon: null,
        tabKey: "salary",
        position: 27,
        link: "/issuesalary",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 5,
        subModuleId: 30,
        labelEng: "Salary Detail",
        labelGuj: "માનદ વેતનની વિગતો",
        isMaster: false,
        icon: null,
        tabKey: "salary",
        position: 28,
        link: "/salarydetail",
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
    moduleId: 6,
    labelEng: "Stationery Work",
    labelGuj: "સ્ટેશનરી કામ",
    icon: null,
    tabKey: "stationery",
    link: null,
    position: 5,
    subItems: [
      {
        moduleId: 6,
        subModuleId: 29,
        labelEng: "Stationery Work",
        labelGuj: "સ્ટેશનરી કામ",
        isMaster: false,
        icon: null,
        tabKey: "stationery",
        position: 25,
        link: "/stationery",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 6,
        subModuleId: 28,
        labelEng: "Stationery Material",
        labelGuj: "સ્ટેશનરી સામગ્રી",
        isMaster: true,
        icon: null,
        tabKey: "stationery",
        position: 26,
        link: "/stationerymaterial",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 6,
        subModuleId: 33,
        labelEng: "Vendor Detail",
        labelGuj: "વિક્રેતા વિગતો",
        isMaster: false,
        icon: null,
        tabKey: "stationery",
        position: 30,
        link: "/vendordetail",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 6,
        subModuleId: 34,
        labelEng: "Paper Detail",
        labelGuj: "પેપરની  વિગતો",
        isMaster: false,
        icon: null,
        tabKey: "stationery",
        position: 31,
        link: "/paperdetail",
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
    moduleId: 7,
    labelEng: "User Management",
    labelGuj: "વપરાશકર્તા વ્યવસ્થાપન",
    icon: "asd",
    tabKey: "employee",
    link: null,
    position: 6,
    subItems: [
      {
        moduleId: 7,
        subModuleId: 5,
        labelEng: "User",
        labelGuj: "વપરાશકર્તા",
        isMaster: false,
        icon: null,
        tabKey: "employee",
        position: 23,
        link: "/employee",
        permission: {
          access: true,
          create: true,
          list: true,
          edit: true,
          delete: true,
        },
      },
      {
        moduleId: 7,
        subModuleId: 6,
        labelEng: "Role",
        labelGuj: "ભૂમિકા",
        isMaster: false,
        icon: null,
        tabKey: "employee",
        position: 24,
        link: "/role",
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
    moduleId: 8,
    labelEng: "Report",
    labelGuj: "રિપોર્ટ",
    icon: "asd",
    tabKey: "report",
    link: "/report",
    position: 7,
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
