import { combineReducers } from 'redux';
import jobs from './jobs';
import fetching from './fetching';
import error from './error';

export default combineReducers({
  jobs,
  fetching,
  error,
});
