import { useEffect } from 'react';
import {
  string, array, object, func, oneOfType,
} from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { MdLocationOn } from 'react-icons/md';
import { FaLanguage } from 'react-icons/fa';
import fetchProfile from '../redux/actions/profile';
import styles from '../styles/Profile.module.css';
import global from '../styles/Global.module.css';

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
      }, strengths, languages, interests, education, experiences,
    } = profile;

    return (
      <section className={styles.container}>
        <article className={styles.grid}>
          <figure className={styles.profile_picture}>
            <img
              src={picture}
              alt={name}
            />
          </figure>
          <section>
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
            <section className={`${styles.py_2} ${styles.mt_4}`}>
              <h2 className={styles.py_2}>Bio:</h2>
              <p>{summaryOfBio}</p>
              <p>
                {!summaryOfBio ? 'Bio not found.' : null}
              </p>
            </section>
            <section className={`${styles.py_2} ${styles.mt_4}`}>
              <h2 className={styles.py_2}>Strengths:</h2>
              {strengths?.map((str) => (
                <p
                  key={str.id}
                  className={styles.tag}
                >
                  {str.name}
                </p>
              ))}
            </section>
            <section className={`${styles.py_2} ${styles.mt_4}`}>
              <h2 className={styles.py_2}>Interests:</h2>
              {interests?.map((int) => (
                <p
                  key={int.id}
                  className={`${styles.tag} ${styles.green}`}
                >
                  {int.name}
                </p>
              ))}
              {interests.length === 0 ? 'No interests found.' : null}
            </section>
            <section className={`${styles.py_2} ${styles.mt_4}`}>
              <h2 className={styles.py_2}>Experiences:</h2>
              {experiences?.map((ex) => (
                <div key={ex.id} className={styles.edu_card}>
                  <h2 className={styles.title_md}>{ex.name}</h2>
                  <p>
                    {ex.fromYear}
                    {' '}
                    -
                    {' '}
                    {ex.toYear}
                  </p>
                  <p>
                    {ex.organizations[0]?.name}
                  </p>
                </div>
              ))}
              {experiences.length === 0 ? 'No experience found.' : null}
            </section>
            <section className={`${styles.py_2} ${styles.mt_4}`}>
              <h2 className={styles.py_2}>Education:</h2>
              {education?.map((edu) => (
                <div key={edu.id} className={styles.edu_card}>
                  <h2 className={styles.title_md}>{edu.name}</h2>
                  <p>
                    {edu.fromYear}
                    {' '}
                    -
                    {' '}
                    {edu.toYear}
                  </p>
                  <p>
                    {edu.organizations[0]?.name}
                  </p>
                </div>
              ))}
              {education.length === 0 ? 'No education found.' : null}
            </section>
          </section>
        </article>
      </section>
    );
  }

  return (
    <section className={global.center}>
      <h3 className={global.loading}>Loading...</h3>
    </section>
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
