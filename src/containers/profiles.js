import { Container, Box, Text } from '@chakra-ui/react';
import {
  string, array, object, func, oneOfType,
} from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import fetchProfiles from '../redux/actions/profiles';

const Profiles = ({
  profiles, status, error, fetchProfiles,
}) => {
  useEffect(async () => {
    await fetchProfiles(0);
  }, []);

  if (status === 'rejected') {
    console.log('error', error);
  }

  if (status === 'resolved') {
    console.log('Profiles', profiles);

    return (
      <Container>
        <Box>
          <Text>Hello</Text>
        </Box>
      </Container>
    );
  }

  console.log('Loading');
  return (
    <Container>
      <Box>
        <Text>Loading...</Text>
      </Box>
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
