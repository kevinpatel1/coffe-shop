import React, { useContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/VerticalLayouts";
import AppLogout from "../pages/Authentication/AppLogout";
//routes
import { protectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected, AccessRoute } from "./AuthProtected";
import { MyContext } from "../Components/Hooks/MyContextProvider";

const Index = () => {
  const [authProtectedRoutes, setAuthProtectedRoutes] = useState([]);

  const availablePublicRoutesPaths = publicRoutes.map((r) => r.path);
  const availableAuthRoutesPath = protectedRoutes.map((r) => r.path);

  return (
    <React.Fragment>
      <Switch>
        <Route path={availablePublicRoutesPaths}>
          <NonAuthLayout>
            <Switch>
              {publicRoutes.map((route, idx) => (
                <Route
                  path={route.path}
                  component={route.component}
                  key={idx}
                  exact={true}
                />
              ))}
            </Switch>
          </NonAuthLayout>
        </Route>

        <Route path={availableAuthRoutesPath}>
          <AppLogout>
            <AuthProtected>
              <VerticalLayout>
                <Switch>
                  {protectedRoutes.map((route, idx) => (
                    <AccessRoute
                      path={route.path}
                      component={route.component}
                      key={idx}
                      exact={true}
                    />
                  ))}
                </Switch>
              </VerticalLayout>
            </AuthProtected>
          </AppLogout>
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default Index;
