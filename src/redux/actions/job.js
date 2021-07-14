import axios from 'axios';
import setError from './error';
import setFetching from './fetching';
import types from './types';

const fetchJob = (id) => async (dispatch) => {
  try {
    dispatch(setFetching(true));
    const job = await axios.post(`https://torre.co/api/opportunities/${id}`, {});
    if (job.status === 200) {
      dispatch({
        payload: job.data,
        type: types.SET_JOB,
      });
      dispatch(setFetching(false));
    }
  } catch (error) {
    dispatch(setError(error));
    dispatch(setFetching(false));
  }
};

export default fetchJob;
