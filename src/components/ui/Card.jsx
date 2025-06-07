import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ children }) => <div className={styles.card}>{children}</div>;

Card.propTypes = {
  children: PropTypes.node,
};

export default Card;
