import axios from 'axios';
import setError from './error';
import setStatus from './status';
import types from './types';

const fetchProfile = (username) => async (dispatch) => {
  try {
    dispatch(setStatus('pending'));
    const profile = await axios.get(`https://boiling-mesa-43883.herokuapp.com/${username}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    if (profile.status === 200) {
      dispatch({
        payload: profile.data,
        type: types.SET_PROFILE,
      });
      dispatch(setStatus('resolved'));
    }
  } catch (error) {
    dispatch(setError(error));
    dispatch(setStatus('rejected'));
  }
};

export default fetchProfile;
