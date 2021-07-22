/* eslint-disable no-unused-vars */
import {
  Box, Container, Image, Tag, Text, useColorModeValue, Heading,
} from '@chakra-ui/react';
import {
  object, func, oneOfType, string, array,
} from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  usePaginator,
} from 'chakra-paginator';
import { Link } from 'react-router-dom';
import styles from '../styles/Jobs.module.css';
import fetchJobs from '../redux/actions/jobs';
import Pagination from '../components/Pagination';

const Jobs = ({
  fetchJobs, jobs, status, error,
}) => {
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 },
  });

  const jobTitleColor = useColorModeValue('blue.800', 'blue.300');

  useEffect(async () => {
    if (currentPage === 1) fetchJobs(0);
  }, [currentPage]);

  useEffect(async () => {
    if (currentPage === 1) return;
    await fetchJobs((currentPage - 1) * 15);
  }, [currentPage]);

  const totalPages = Math.round((jobs.total + 15 - 1) / 15);

  let toRender;

  if (status === 'pending') {
    toRender = (
      <Heading as="h1" size="lg">Loading...</Heading>
    );
  }

  if (status === 'rejected') {
    toRender = <Text>{error.message}</Text>;
  }

  if (status === 'resolved') {
    toRender = (
      <>
        <div className={styles.container}>
          {
      jobs?.results?.map((i) => (
        <Box key={i.id} maxW="full" borderWidth="1px" borderRadius="sm" p="4" m="8">
          <Link to={`/jobs/${i.id}`}>
            <Box display="flex">
              <Image
                borderRadius="full"
                boxSize="50px"
                fit="cover"
                src={i.organizations[0].picture}
                alt="company logo"
              />
              <Box textAlign="left" pl="4">
                <Text fontSize="lg" pb="1" color={jobTitleColor} fontWeight="500">{i.objective}</Text>
                <Text fontSize="sm" pb="1">
                  <Text display="inline" color="gray.500" as="span">at </Text>
                  {i.organizations[0].name}
                </Text>
                <Text fontSize="sm" pb="1">
                  {`
                  ${i.remote ? 'Remote' : ''}
                  ${i.locations.length > 0 ? ` | ${i.locations[0]}` : ''}`}
                </Text>
                <Text fontSize="sm" pb="1">
                  Posted on
                  {' '}
                  {new Date(i.created).toLocaleString('en-us', { day: 'numeric', month: 'long' })}
                </Text>
                <Text fontSize="sm" color="green.400" pb="1">
                  Salary:
                  {' '}
                  {`USD ${i.compensation?.data?.minHourlyUSD?.toFixed(2)} to
                USD ${i.compensation?.data?.maxHourlyUSD?.toFixed(2)}`}
                  {' '}
                  hourly
                </Text>
                <Box>
                  {i.skills.slice().map((skill) => (
                    <Tag key={skill.name} my="1" mr="1" colorScheme="messenger">
                      {skill.name}
                    </Tag>
                  ))}
                </Box>
              </Box>
            </Box>
          </Link>
        </Box>
      ))
      }
        </div>
        <Box>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </Box>
      </>
    );
  }

  return (
    <div>
      {toRender}
    </div>
  );
};

Jobs.propTypes = {
  fetchJobs: func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  jobs: object.isRequired,
  status: string.isRequired,
  error: oneOfType([string, object, array]),
};

Jobs.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  status: state.status,
  error: state.error,
});

export default connect(mapStateToProps, { fetchJobs })(Jobs);
