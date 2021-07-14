import types from '../actions/types';

export default (state = {}, action) => {
  if (action.type === types.SET_JOBS) {
    console.log('Jobsssss');
    return action.payload;
  }
  return state;
};
