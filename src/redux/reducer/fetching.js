import types from '../actions/types';

export default (state = false, action) => {
  if (action.type === types.SET_FETCHING) {
    return action.status;
  }
  return state;
};
