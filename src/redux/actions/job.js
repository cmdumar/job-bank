import axios from 'axios';
import setError from './error';
import setStatus from './status';
import types from './types';

const fetchJob = (id) => async (dispatch) => {
  try {
    dispatch(setStatus('pending'));
    const job = await axios.get(`https://boiling-mesa-43883.herokuapp.com/opportunity/${id}`, { headers: { 'Access-Control-Allow-Origin': '*' } });
    if (job.status === 200) {
      dispatch({
        payload: job.data,
        type: types.SET_JOB,
      });
      dispatch(setStatus('resolved'));
    }
  } catch (error) {
    dispatch(setError(error));
    dispatch(setStatus('rejected'));
  }
};

export default fetchJob;
