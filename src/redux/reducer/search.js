import types from '../actions/types';

export default (state = '', action) => {
  if (action.type === types.SET_SEARCH) {
    return action.input;
  }
  return state;
};
