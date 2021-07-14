import types from '../actions/fetching';

export default (state = false, action) => {
  if (action.type === types.SET_FETCHING) {
    return action.payload;
  }
  return state;
};
