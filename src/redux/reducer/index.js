import { combineReducers } from 'redux';
import jobs from './jobs';
import job from './job';
import status from './status';
import error from './error';
import profiles from './profiles';

export default combineReducers({
  status,
  jobs,
  job,
  error,
  profiles,
});
