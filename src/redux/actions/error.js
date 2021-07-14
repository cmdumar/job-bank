import types from './types';

const setError = (error) => ({
  type: types.SET_ERRORS,
  error,
});

export default setError;
