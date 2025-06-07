import PropTypes from 'prop-types';
import styles from './RecommendationForm.module.css';

const RecommendationForm = ({ onSubmit }) => (
  <form className={styles.form} onSubmit={onSubmit}>
    <input name="food" type="text" placeholder="Enter food" />
    <button type="submit">Recommend</button>
  </form>
);

RecommendationForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default RecommendationForm;
