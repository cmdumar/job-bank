import types from './types';

const setFetching = (status) => ({
  type: types.SET_FETCHING,
  payload: status,
});

export default setFetching;
