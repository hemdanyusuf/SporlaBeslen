import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ children, ...props }) => (
  <button className={styles.button} {...props}>{children}</button>
);

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
