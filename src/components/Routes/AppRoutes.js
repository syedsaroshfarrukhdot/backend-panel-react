import React from "react";
import Form from "../Form";
import FormTwo from "../FormTwo";
import FormPhoneNumbers from "../FormPhoneNumbers";
import Form2PhoneNumbers from "../Form2PhoneNumber";
import McMakler from "../Pages/McMakler";

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
];

export default AppRoutes;
