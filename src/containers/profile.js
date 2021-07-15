import { useEffect } from 'react';
import {
  string, array, object, func, oneOfType,
} from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container, Box, Image, Text,
} from '@chakra-ui/react';
import fetchProfile from '../redux/actions/profile';

const Profile = ({
  fetchProfile, profile, status, error,
}) => {
  const { username } = useParams();

  useEffect(() => {
    fetchProfile(username);
  }, [username]);

  console.log('error', error);
  console.log('profile', profile);
  console.log('status', status);

  if (status === 'rejected') {
    return (
      <Text>
        {error.message}
      </Text>
    );
  }

  if (status === 'resolved') {
    console.log('Profile', profile);
    const {
      person: {
        name, picture, professionalHeadline, location,
      },
    } = profile;

    return (
      <Container>
        <Box display="flex" flexFlow="column">
          <Image
            src={picture}
            boxSize="150px"
            borderRadius="full"
            alt={name}
          />
          <Text>{name}</Text>
          <Text>{professionalHeadline}</Text>
          <Text>{location.name}</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Text>Loading...</Text>
  );
};

Profile.propTypes = {
  fetchProfile: func.isRequired,
  profile: oneOfType([array, object]).isRequired,
  status: string.isRequired,
  error: oneOfType([string, array, object]),
};

Profile.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  status: state.status,
  error: state.error,
});

export default connect(mapStateToProps, { fetchProfile })(Profile);
