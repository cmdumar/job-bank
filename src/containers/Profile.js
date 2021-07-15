import { useEffect } from 'react';
import {
  string, array, object, func, oneOfType,
} from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container, Box, Image, Text, Grid, Heading, Tag,
} from '@chakra-ui/react';
import fetchProfile from '../redux/actions/profile';

const Profile = ({
  fetchProfile, profile, status, error,
}) => {
  const { username } = useParams();

  useEffect(() => {
    fetchProfile(username);
  }, [username]);

  if (status === 'rejected') {
    return (
      <Text>
        {error.message}
      </Text>
    );
  }

  if (status === 'resolved' && profile?.person) {
    const {
      person: {
        name, picture, professionalHeadline, location, summaryOfBio,
      }, strengths, languages,
    } = profile;

    return (
      <Container maxW="container.lg">
        <Grid gridTemplateColumns="300px 1fr">
          <Box>
            <Image
              src={picture}
              boxSize="250px"
              alt={name}
            />
          </Box>
          <Box>
            <Heading as="h2" size="lg" fontWeight="500" pb="4">{name}</Heading>
            <Text pt="1">{professionalHeadline}</Text>
            <Text pt="1">{location.name}</Text>
            <Text>
              Languages
              {languages?.map((lan) => ` - ${lan.language.name} (${lan.fluency})`)}
            </Text>
            <Box py="2">
              <Text>{summaryOfBio}</Text>
            </Box>
            <Box py="2">
              {strengths?.map((str) => (
                <Tag
                  colorScheme="telegram"
                  key={str.id}
                  mr="1"
                  mb="1"
                >
                  {str.name}
                </Tag>
              ))}
            </Box>
          </Box>
        </Grid>
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
