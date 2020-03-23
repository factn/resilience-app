import React from 'react';
import routes from './routes';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import NotFound from '../page/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ key, path, component, requiresAuth, exact }) =>
          requiresAuth ? (
            <PrivateRoute
              key={key}
              path={path}
              component={component}
              exact={exact}
            />
          ) : (
            <Route key={key} path={path} component={component} exact={exact} />
          )
        )}
        {/* catch all route, must be last! */}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
