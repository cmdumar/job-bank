import axios from 'axios';
import setError from './error';
import setFetching from './fetching';
import types from './types';

const setJobs = (jobs) => ({
  payload: jobs,
  type: types.SET_JOBS,
});

const fetchJobs = (page) => async (dispatch) => {
  try {
    dispatch(setFetching(true));
    const jobs = await axios.post(`https://search.torre.co/opportunities/_search/?offset=${page}&size=15`, {});
    if (jobs.status === 200) {
      dispatch(setJobs(jobs.data));
      dispatch(setFetching(false));
    }
  } catch (error) {
    dispatch(setError(error));
    dispatch(setFetching(false));
  }
};

export default fetchJobs;
