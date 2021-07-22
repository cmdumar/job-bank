/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import {
  string, array, object, func, oneOfType,
} from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container, Heading, Tag,
} from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';
import { FaLanguage } from 'react-icons/fa';
import fetchProfile from '../redux/actions/profile';
import styles from '../styles/Profile.module.css';

const Profile = ({
  fetchProfile, profile, status, error,
}) => {
  const { username } = useParams();

  useEffect(() => {
    fetchProfile(username);
  }, [username]);

  if (status === 'rejected') {
    return (
      <h2>
        {error.message}
      </h2>
    );
  }

  if (status === 'resolved' && profile?.person) {
    const {
      person: {
        name, picture, professionalHeadline, location, summaryOfBio,
        flags: { remoter },
      }, strengths, languages, interests,
    } = profile;

    return (
      <section className={styles.container}>
        <article className={styles.grid}>
          <div className={styles.profile_picture}>
            <img
              src={picture}
              alt={name}
            />
          </div>
          <div>
            <h2 className={styles.profile_name}>{name}</h2>
            <p>{professionalHeadline}</p>
            <div className={`${styles.text_icon} ${styles.py_2}`}>
              <MdLocationOn />
              <p>
                {location.name}
                {' '}
                {remoter ? '(Can work remotely)' : ''}
              </p>
            </div>
            <div className={`${styles.text_icon} ${styles.py_2}`}>
              <FaLanguage />
              <p>
                Language(s)
                {languages?.map((lan) => ` - ${lan.language} (${lan.fluency})`)}
              </p>
            </div>
            <div className={`${styles.py_2} ${styles.mt_4}`}>
              <h2 className={styles.py_2}>Bio:</h2>
              <p>{summaryOfBio}</p>
            </div>
            <div className={`${styles.py_2} ${styles.mt_4}`}>
              <h2 className={styles.py_2}>Strengths:</h2>
              {strengths?.map((str) => (
                <p
                  key={str.id}
                  className={styles.tag}
                >
                  {str.name}
                </p>
              ))}
            </div>
            <div className={`${styles.py_2} ${styles.mt_4}`}>
              <h2 className={styles.py_2}>Interests:</h2>
              {interests?.map((int) => (
                <p
                  key={int.id}
                  className={`${styles.tag} ${styles.green}`}
                >
                  {int.name}
                </p>
              ))}
            </div>
          </div>
        </article>
      </section>
    );
  }

  return (
    <Container>
      <Heading as="h1" size="lg">Loading...</Heading>
    </Container>
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
