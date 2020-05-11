import React from "react";
import { Route, Switch } from "react-router-dom";

import { Page } from "../../layout";
import ErrorPage from "./foodbox/ErrorPage";
import FoodboxFlow from "./foodbox/FoodboxFlow";
import SuccessPage from "./foodbox/SuccessPage";
import Start from "./Start";
import { routes } from "../../routing";

function RequestPage() {
  return (
    <Page>
      <Switch>
        <Route exact path={routes.request.start} component={Start} />
        <Route exact path={routes.request.foodbox} component={FoodboxFlow} />
        <Route path={routes.request.success} component={SuccessPage} />
        <Route path={routes.request.error} component={ErrorPage} />
      </Switch>
    </Page>
  );
}

export default RequestPage;
