import { Box, Container } from '@chakra-ui/react';
import { object, bool, func } from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import fetchJobs from '../redux/actions/jobs';

const Jobs = ({ fetchJobs, jobs, fetching }) => {
  useEffect(async () => {
    fetchJobs(1);
  }, []);

  let toRender;

  console.log('Jobs', jobs);
  console.log('fetching', fetching);

  if (fetching) {
    console.log(fetching);
    toRender = <div>Loading</div>;
  }

  if (!fetching) {
    toRender = jobs.results && jobs.results.map((i) => (
      <Box key={i.id}>
        <p>{i.objective}</p>
      </Box>
    ));
  }

  return (
    <Container>
      {toRender}
    </Container>
  );
};

Jobs.propTypes = {
  fetchJobs: func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  jobs: object.isRequired,
  fetching: bool.isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  fetching: state.fetching,
});

export default connect(mapStateToProps, { fetchJobs })(Jobs);
