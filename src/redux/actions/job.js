import axios from 'axios';
import setError from './error';
import setFetching from './fetching';
import types from './types';

const fetchJob = (id) => async (dispatch) => {
  try {
    dispatch(setFetching('pending'));
    const job = await axios.get(`https://torre.co/api/opportunities/${id}`);
    if (job.status === 200) {
      dispatch({
        payload: job.data,
        type: types.SET_JOB,
      });
      dispatch(setFetching('resolved'));
    }
  } catch (error) {
    dispatch(setError(error));
    dispatch(setFetching('rejected'));
  }
};

export default fetchJob;
