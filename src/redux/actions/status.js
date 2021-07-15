import types from './types';

const setStatus = (status) => ({
  type: types.SET_STATUS,
  status,
});

export default setStatus;
