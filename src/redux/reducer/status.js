import types from '../actions/types';

export default (state = 'pending', action) => {
  if (action.type === types.SET_STATUS) {
    return action.status;
  }
  return state;
};
