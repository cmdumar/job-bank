import { useEffect } from 'react';
import {
  string, array, object, func, oneOfType,
} from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Text } from '@chakra-ui/react';
import fetchProfile from '../redux/actions/profile';

const Profile = ({
  fetchProfile, profile, status, error,
}) => {
  const { username } = useParams();

  useEffect(() => {
    fetchProfile(username);
  });

  if (status === 'rejected') {
    return (
      <Text>
        {error.message}
      </Text>
    );
  }

  if (status === 'resolved') {
    console.log('Profile', profile);
    return (
      <Text>
        This is
        {username}
      </Text>
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
  profiles: state.profile,
  status: state.status,
  error: state.error,
});

export default connect(mapStateToProps, { fetchProfile })(Profile);
