import {
  Container, Box, Text, Image, Tag, Heading,
} from '@chakra-ui/react';
import {
  string, array, object, func, oneOfType,
} from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MdLocationOn } from 'react-icons/md';
import {
  usePaginator,
} from 'chakra-paginator';
import { Link } from 'react-router-dom';
import fetchProfiles from '../redux/actions/profiles';
import Pagination from '../components/Pagination';

const Profiles = ({
  profiles, status, error, fetchProfiles,
}) => {
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 },
  });

  useEffect(async () => {
    if (currentPage === 1) fetchProfiles(0);
  }, [currentPage]);

  useEffect(async () => {
    if (currentPage === 1) return;
    await fetchProfiles((currentPage - 1) * 15);
  }, [currentPage]);

  const totalPages = Math.round((profiles.total + 15 - 1) / 15);

  if (status === 'rejected') {
    return (
      <Container>
        <Text>{error.message}</Text>
      </Container>
    );
  }

  if (status === 'resolved') {
    return (
      <Container>
        <Box>
          {profiles?.results?.map(({
            subjectId, name, username, picture,
            professionalHeadline, openTo, locationName,
          }) => (
            <Box key={subjectId} maxW="full" borderWidth="1px" borderRadius="sm" p="4" m="8">
              <Link to={`/profiles/${username}`}>
                <Box
                  display="flex"
                  justifyContent="center"
                  flexFlow="column"
                  alignItems="center"
                  textAlign="center"
                >
                  <Image
                    src={picture}
                    boxSize="150px"
                    borderRadius="full"
                  />
                  <Text fontSize="lg" fontWeight="600" pt="4">
                    {name}
                  </Text>
                  <Text fontSize="md" pt="2">{professionalHeadline}</Text>
                  <Box display="flex" alignItems="center" pt="2">
                    <MdLocationOn />
                    <Text pl="1" fontSize="xs">{locationName}</Text>
                  </Box>
                  <Box pt="2">
                    {openTo.map((job) => (
                      <Tag key={job} colorScheme="green" my="1" mr="1">
                        {job}
                      </Tag>
                    ))}
                  </Box>
                </Box>
              </Link>
            </Box>
          ))}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Heading as="h1" size="lg">Loading...</Heading>
    </Container>
  );
};

Profiles.propTypes = {
  fetchProfiles: func.isRequired,
  profiles: oneOfType([array, object]).isRequired,
  status: string.isRequired,
  error: oneOfType([string, array, object]),
};

Profiles.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  status: state.status,
  error: state.error,
});

export default connect(mapStateToProps, { fetchProfiles })(Profiles);
