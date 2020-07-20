import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  SignIn as SignInView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <Redirect to="/sign-in" />
    </Switch>
  );
};

export default Routes;
