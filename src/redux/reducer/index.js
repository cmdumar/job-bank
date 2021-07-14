import { combineReducers } from 'redux';
import jobs from './jobs';
import fetching from './fetching';

export default combineReducers({
  jobs,
  fetching,
});
