import types from './types';

const setSearchInput = (input) => ({
  type: types.SET_SEARCH,
  input,
});

export default setSearchInput;
