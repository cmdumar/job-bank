import types from '../actions/types';

export default (state = {}, action) => {
  if (action.type === types.SET_PROFILE) {
    return action.payload;
  }
  return state;
};
