import PropTypes from 'prop-types';
import styles from './RecommendationList.module.css';

const RecommendationList = ({ items }) => (
  <ul className={styles.list}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

RecommendationList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RecommendationList;
