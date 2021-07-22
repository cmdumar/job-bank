import {
  string, array, object, func, oneOfType,
} from 'prop-types';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { MdLocationOn } from 'react-icons/md';
import {
  usePaginator,
} from 'chakra-paginator';
import { Link } from 'react-router-dom';
import fetchProfiles from '../redux/actions/profiles';
import Pagination from '../components/Pagination';
import styles from '../styles/Profiles.module.css';
import global from '../styles/index.module.css';
import setSearchInput from '../redux/actions/search';

const Profiles = ({
  profiles, status, error, fetchProfiles, search,
}) => {
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchInput(''));
  }, []);

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
      <section className={global.center}>
        <h2 className={global.loading}>{error.message}</h2>
      </section>
    );
  }

  if (status === 'resolved') {
    return (
      <section className={global.center}>
        <section className={styles.container}>
          {profiles?.results?.filter((profile) => {
            if (search === '') return profile;

            if (profile.name.toLowerCase().includes(search.toLowerCase())) {
              return profile;
            }

            return null;
          }).map(({
            subjectId, name, username, picture,
            professionalHeadline, openTo, locationName,
          }) => (
            <article key={subjectId} className={global.job_card}>
              <Link to={`/profiles/${username}`}>
                <section
                  className={styles.flexbox}
                >
                  <img
                    src={picture}
                    className={styles.profile_image}
                    alt="Profile"
                  />
                  <h3 className={global.job_title}>
                    {name}
                  </h3>
                  <p className={styles.headline}>{professionalHeadline}</p>
                  <div className={styles.location}>
                    <MdLocationOn />
                    <p className={styles.location_text}>{locationName}</p>
                  </div>
                  <div className={styles.pt_2}>
                    {openTo.map((job) => (
                      <p key={job} className={styles.tag}>
                        {job}
                      </p>
                    ))}
                  </div>
                </section>
              </Link>
            </article>
          ))}
        </section>
        <section className={global.pagination_container}>
          <Pagination
            className={global.pagination}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </section>
    );
  }

  return (
    <section className={global.center}>
      <h2 className={global.loading}>Loading...</h2>
    </section>
  );
};

Profiles.propTypes = {
  fetchProfiles: func.isRequired,
  profiles: oneOfType([array, object]).isRequired,
  status: string.isRequired,
  error: oneOfType([string, array, object]),
  search: string.isRequired,
};

Profiles.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  status: state.status,
  error: state.error,
  search: state.search,
});

export default connect(mapStateToProps, { fetchProfiles })(Profiles);
