import PropTypes from 'prop-types';
import styles from './InventoryItem.module.css';

const InventoryItem = ({ name }) => (
  <li className={styles.item}>{name}</li>
);

InventoryItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default InventoryItem;
