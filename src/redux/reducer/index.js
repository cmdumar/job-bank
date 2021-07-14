import { combineReducers } from 'redux';
import jobs from './jobs';
import job from './job';
import fetching from './fetching';
import error from './error';

export default combineReducers({
  fetching,
  jobs,
  job,
  error,
});
