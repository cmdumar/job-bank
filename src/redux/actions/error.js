import types from './types';

const setError = (error) => ({
  type: types.SET_ERRORS,
  payload: error,
});

export default setError;
