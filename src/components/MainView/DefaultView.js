import React, { Component, Suspense } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import userService from "../../services/userService";
import appRoutes from "../Routes/AppRoutes";
import Header from "../Header";
import { Redirect } from "react-router-dom";

const MainView = (props) => {
  //   const location = useLocation();
  //   console.log("asddasdsadasd", props);
  return (
    <>
      {/* {location.pathname === "/" ? null : <Header />} */}

      {userService.isLoggedIn() ? (
        <>
          <Switch>
            {appRoutes.map((route, i) => {
              return (
                <>
                  <Header />
                  <Route
                    key={route.path}
                    exact={route.exact}
                    path={route.path}
                    component={route.component}
                  />
                </>
              );
            })}
          </Switch>
        </>
      ) : (
        <Redirect to="/signin" />
      )}
      {/* {location.pathname === "/" ? null : <Footer />} */}
    </>
  );
};

export default withRouter(MainView);
