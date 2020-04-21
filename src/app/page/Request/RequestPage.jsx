import React from "react";
import { Route, Switch } from "react-router-dom";

import { Page } from "../../layout";
import ErrorPage from "./foodbox/ErrorPage";
import FoodboxFlow from "./foodbox/FoodboxFlow";
import SuccessPage from "./foodbox/SuccessPage";
import Start from "./Start";

function RequestPage() {
  return (
    <Page>
      <Switch>
        <Route exact path="/request" component={Start} />
        <Route exact path="/request/foodbox" component={FoodboxFlow} />
        <Route path="/request/foodbox/success" component={SuccessPage} />
        <Route path="/request/foodbox/error" component={ErrorPage} />
      </Switch>
    </Page>
  );
}

export default RequestPage;
