import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Jobs from '../containers/jobs';
import Profiles from '../containers/profiles';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Jobs />
    </Route>
    <Route path="/profiles">
      <Profiles />
    </Route>
  </Switch>
);

export default Routes;
