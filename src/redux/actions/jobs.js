import axios from 'axios';
import setError from './error';
import setFetching from './fetching';
import types from './types';

const fetchJobs = (page) => async (dispatch) => {
  try {
    console.log('action', page);
    dispatch(setFetching(true));
    const jobs = await axios.post(`https://search.torre.co/opportunities/_search/?offset=${page}&size=15`, {});
    if (jobs.status === 200) {
      dispatch({
        payload: jobs.data,
        type: types.SET_JOBS,
      });
      dispatch(setFetching(false));
    }
  } catch (error) {
    dispatch(setError(error));
    dispatch(setFetching(false));
  }
};

export default fetchJobs;
