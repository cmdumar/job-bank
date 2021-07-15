import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Jobs from '../containers/jobs';
import Job from '../containers/job';
import Profiles from '../containers/profiles';

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Jobs />
    </Route>
    <Route path="/jobs/:id">
      <Job />
    </Route>
    <Route exact path="/profiles">
      <Profiles />
    </Route>
    <Route path="/profiles/:username">
      <div>THis is profile page</div>
    </Route>
  </Switch>
);

export default Routes;
