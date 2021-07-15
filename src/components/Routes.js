import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Jobs from '../containers/Jobs';
import Job from '../containers/Job';
import Profiles from '../containers/Profiles';
import Profile from '../containers/Profile';

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
      <Profile />
    </Route>
  </Switch>
);

export default Routes;
