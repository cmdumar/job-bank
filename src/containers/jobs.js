import {
  Box, Container, Image, Text,
} from '@chakra-ui/react';
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
      <Box key={i.id} display="flex" alignItems="flex-start" m="8">
        <Image
          borderRadius="full"
          boxSize="50px"
          fit="cover"
          src={i.organizations[0].picture}
          alt="company logo"
        />
        <Box textAlign="left" pl="4">
          <Text fontSize="md">{i.objective}</Text>
          <Text fontSize="sm">{i.organizations[0].name}</Text>
          <Text fontSize="sm" color="whiteAlpha.700">
            {`
              ${i.remote ? 'Remote' : ''}
              ${i.locations.length > 0 ? ` | ${i.locations[0]}` : ''}`}
          </Text>
        </Box>
      </Box>
    ));
  }

  return (
    <Container>
      <Box>
        {toRender}
      </Box>
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
