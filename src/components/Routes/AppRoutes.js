import React from "react";
import Form from "../Form";
import FormTwo from "../FormTwo";
import FormPhoneNumbers from "../FormPhoneNumbers";
import Form2PhoneNumbers from "../Form2PhoneNumber";
import McMakler from "../Pages/McMakler";
import Gewerbe from "../Pages/immobilierichtigverkaufenModel/Gewerbe";
import Grundstuck from "../Pages/immobilierichtigverkaufenModel/Grundstuck";
import Haus from "../Pages/immobilierichtigverkaufenModel/Haus";
import HausMehrfamilienhausg from "../Pages/immobilierichtigverkaufenModel/HausMehrfamilienhausg";
import Wohnung from "../Pages/immobilierichtigverkaufenModel/Wohnung";

const AppRoutes = [
  {
    path: "/form1",
    component: Form,
    exact: true,
    name: "form1",
  },
  {
    path: "/formTwo",
    component: FormTwo,
    exact: true,
    name: "formTwo",
  },
  {
    path: "/mcmakler",
    component: McMakler,
    exact: true,
    name: "mcmakler",
  },
  {
    path: "/phonenumberform",
    component: FormPhoneNumbers,
    exact: true,
    name: "formPhoneNumber",
  },
  {
    path: "/phonenumberform2",
    component: Form2PhoneNumbers,
    exact: true,
    name: "formPhoneNumber",
  },
  {
    path: "/gewerbe",
    component: Gewerbe,
    exact: true,
    name: "gewerbe",
  },
  {
    path: "/grundstuck",
    component: Grundstuck,
    exact: true,
    name: "grundstuck",
  },
  {
    path: "/haus",
    component: Haus,
    exact: true,
    name: "haus",
  },
  {
    path: "/haus-mehrfamilienhausg",
    component: HausMehrfamilienhausg,
    exact: true,
    name: "hausmehrfamilienhausg",
  },
  {
    path: "/wohnung",
    component: Wohnung,
    exact: true,
    name: "wohnung",
  },
];

export default AppRoutes;
