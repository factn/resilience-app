import React from "react";
import { Switch, useLocation } from "react-router-dom";

import { Page } from "../../layout";
import ErrorPage from "./foodbox/ErrorPage";
import FoodboxFlow from "./foodbox/FoodboxFlow";
import SuccessPage from "./foodbox/SuccessPage";
import Start from "./Start";

import { routes, AppRoute } from "../../routing";
import { H1 } from "../../component";

const titles = {
  [routes.request.foodbox]: "Food Box",
};

function RequestPage() {
  const location = useLocation();
  const title = titles[location.pathname];
  return (
    <Page appbar={<H1>{title}</H1>}>
      <Switch>
        <AppRoute exact path={routes.request.start} component={Start} />
        <AppRoute exact path={routes.request.foodbox} component={FoodboxFlow} />
        <AppRoute path={routes.request.success} component={SuccessPage} />
        <AppRoute path={routes.request.error} component={ErrorPage} />
      </Switch>
    </Page>
  );
}

export default RequestPage;
