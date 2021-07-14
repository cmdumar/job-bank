import types from '../actions/types';

export default (state = null, action) => {
  if (action.type === types.SET_ERRORS) {
    return action.error;
  }
  return state;
};
