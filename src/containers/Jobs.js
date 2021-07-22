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

  useEffect(async () => {
    if (currentPage === 1) fetchJobs(0);
  }, [currentPage]);

  useEffect(async () => {
    if (currentPage === 1) return;
    await fetchJobs((currentPage - 1) * 15);
  }, [currentPage]);

  const totalPages = Math.round((jobs.total + 15 - 1) / 15);

  if (status === 'rejected') {
    return (
      <section className={styles.center}>
        <p>{error.message}</p>
      </section>
    );
  }

  if (status === 'resolved') {
    return (
      <section className={styles.center}>
        <section className={styles.container}>
          {
      jobs?.results?.map((i) => (
        <article key={i.id} className={styles.job_card}>
          <Link to={`/jobs/${i.id}`}>
            <div className={styles.flexbox}>
              <img
                className={styles.logo}
                src={i.organizations[0].picture}
                alt="company logo"
              />
              <div className={styles.pl_4}>
                <h3 className={styles.job_title}>{i.objective}</h3>
                <p className={styles.company_name}>
                  <span>at </span>
                  {i.organizations[0].name}
                </p>
                <p className={styles.location}>
                  {`
                  ${i.remote ? 'Remote' : ''}
                  ${i.locations.length > 0 ? ` | ${i.locations[0]}` : ''}`}
                </p>
                <p className={styles.date}>
                  Posted on
                  {' '}
                  {new Date(i.created).toLocaleString('en-us', { day: 'numeric', month: 'long' })}
                </p>
                <p className={styles.salary}>
                  Salary:
                  {' '}
                  {`USD ${i.compensation?.data?.minHourlyUSD?.toFixed(2)} to
                USD ${i.compensation?.data?.maxHourlyUSD?.toFixed(2)}`}
                  {' '}
                  hourly
                </p>
                <div>
                  {i.skills.slice().map((skill) => (
                    <p key={skill.name} className={styles.tag}>
                      {skill.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))
      }
        </section>
        <section className={styles.pagination_container}>
          <Pagination
            className={styles.pagination}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </section>
    );
  }

  return (
    <section className={styles.center}>
      <h2 className={styles.loading}>Loading...</h2>
    </section>
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
