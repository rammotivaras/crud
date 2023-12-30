import PropTypes from 'prop-types';
import styles from './loader.module.css';

const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <div className={styles['loader-overlay']}>
        <div className={styles.loader}></div>
      </div>
    )
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
};

export default Loader;
