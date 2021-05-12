import React from "react";
import Form from "../Form";
import FormTwo from "../FormTwo";
import FormThree from "../FormThree";

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
    path: "/FormThree",
    component: FormThree,
    exact: true,
    name: "formthree",
  },
];

export default AppRoutes;
