import {
  object, func, oneOfType, string, array,
} from 'prop-types';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  usePaginator,
} from 'chakra-paginator';
import { Link } from 'react-router-dom';
import styles from '../styles/Jobs.module.css';
import global from '../styles/Global.module.css';
import fetchJobs from '../redux/actions/jobs';
import Pagination from '../components/Pagination';
import setSearchInput from '../redux/actions/search';
import numberWithCommas from '../helpers/numberWithCommas';

const Jobs = ({
  fetchJobs, jobs, status, error, search,
}) => {
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchInput(''));
  }, []);

  useEffect(async () => {
    if (currentPage === 1) {
      await fetchJobs(0);
    }
  }, [currentPage]);

  useEffect(async () => {
    if (currentPage === 1) return;
    await fetchJobs((currentPage - 1) * 50);
  }, [currentPage]);

  const totalPages = Math.round((jobs.total + 50 - 1) / 50);

  if (status === 'rejected') {
    return (
      <section className={global.center}>
        <p>{error.message}</p>
      </section>
    );
  }

  if (status === 'resolved') {
    return (
      <section className={global.center}>
        <section className={styles.container}>
          {
      jobs.results?.filter((job) => {
        if (search === '') return job;

        if (job.objective.toLowerCase().includes(search.toLowerCase())) {
          return job;
        }

        return null;
      }).map((i) => (
        <article key={i.id} className={global.job_card}>
          <Link to={`/jobs/${i.id}`}>
            <div className={styles.flexbox}>
              <img
                className={styles.logo}
                src={i.organizations[0].picture}
                alt="company logo"
              />
              <div className={styles.pl_4}>
                <h3 className={global.job_title}>{i.objective}</h3>
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
        <section className={global.py_20}>
          <h1 className={global.total_text}>
            Total
            {' '}
            {jobs.total && numberWithCommas(jobs.total)}
            {' '}
            jobs found
          </h1>
        </section>
        <section className={global.pagination_container}>
          <Pagination
            className={global.pagination}
            currentPage={currentPage}
            totalPages={totalPages}
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

Jobs.propTypes = {
  fetchJobs: func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  jobs: object.isRequired,
  status: string.isRequired,
  error: oneOfType([string, object, array]),
  search: string.isRequired,
};

Jobs.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs,
  status: state.status,
  error: state.error,
  search: state.search,
});

export default connect(mapStateToProps, { fetchJobs })(Jobs);
