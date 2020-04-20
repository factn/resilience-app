import React from "react";
import { Switch, Route } from "react-router-dom";

import { Page } from "../../layout";
import Start from "./Start";
import FoodboxFlow from "./foodbox/FoodboxFlow";
import SuccessPage from "./foodbox/SuccessPage";
import ErrorPage from "./foodbox/ErrorPage";

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
