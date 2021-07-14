import {
  Box, Container, Image, Text,
} from '@chakra-ui/react';
import { object, bool, func } from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import fetchJobs from '../redux/actions/jobs';

const Jobs = ({ fetchJobs, jobs, fetching }) => {
  useEffect(() => {
    fetchJobs(1);
  }, []);

  let toRender;

  console.log('Jobs', jobs);
  console.log('fetching', fetching);

  if (fetching) {
    console.log('inside', fetching);
    toRender = <div>Loading</div>;
  }

  if (!fetching) {
    toRender = jobs.results && jobs.results.map((i) => (
      <Box key={i.id} maxW="full" borderWidth="1px" borderRadius="lg" p="4" m="8">
        <Box display="flex">
          <Image
            borderRadius="full"
            boxSize="50px"
            fit="cover"
            src={i.organizations[0].picture}
            alt="company logo"
          />
          <Box textAlign="left" pl="4">
            <Text fontSize="md" pb="2">{i.objective}</Text>
            <Text fontSize="sm">{i.organizations[0].name}</Text>
            <Text fontSize="sm" color="whiteAlpha.700">
              {`
                ${i.remote ? 'Remote' : ''}
                ${i.locations.length > 0 ? ` | ${i.locations[0]}` : ''}`}
            </Text>
            <Text fontSize="sm">
              Posted on
              {' '}
              {new Date(i.created).toLocaleString('en-us', { day: 'numeric', month: 'long' })}
            </Text>
            <Text fontSize="sm" color="green.500">
              Salary:
              {' '}
              {`USD ${i.compensation.data.minHourlyUSD.toFixed(2)} to
              USD ${i.compensation.data.maxHourlyUSD.toFixed(2)}`}
              {' '}
              hourly
            </Text>
          </Box>
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
