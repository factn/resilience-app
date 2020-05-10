import React from "react";
import { Switch } from "react-router-dom";

import { Page } from "../../layout";
import ErrorPage from "./foodbox/ErrorPage";
import FoodboxFlow from "./foodbox/FoodboxFlow";
import SuccessPage from "./foodbox/SuccessPage";
import Start from "./Start";
import { routes, AppRoute } from "../../routing";

function RequestPage() {
  return (
    <Page>
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
