import React, { Component, Suspense } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import authRoutes from "../Routes/AuthRoutes";
import { useLocation } from "react-router-dom";

const MainView = (props) => {
  //   const location = useLocation();
  //   console.log("asddasdsadasd", props);
  return (
    <>
      {/* {location.pathname === "/" ? null : <Header />} */}
      <Switch>
        {authRoutes.map((route, i) => {
          return (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </Switch>
      {/* {location.pathname === "/" ? null : <Footer />} */}
    </>
  );
};

export default withRouter(MainView);
