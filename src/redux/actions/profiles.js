import axios from 'axios';
import setError from './error';
import setStatus from './status';
import types from './types';

const fetchProfiles = (offset) => async (dispatch) => {
  try {
    dispatch(setStatus('pending'));
    const jobs = await axios.post(`https://search.torre.co/people/_search/?offset=${offset}&size=15`, {});
    if (jobs.status === 200) {
      dispatch({
        payload: jobs.data,
        type: types.SET_JOBS,
      });
      dispatch(setStatus('resolved'));
    }
  } catch (error) {
    dispatch(setError(error));
    dispatch(setStatus('rejected'));
  }
};

export default fetchProfiles;
