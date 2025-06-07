import PropTypes from 'prop-types';
import InventoryItem from './InventoryItem';
import styles from './InventoryList.module.css';

const InventoryList = ({ items }) => (
  <ul className={styles.list}>
    {items.map((item) => (
      <InventoryItem key={item} name={item} />
    ))}
  </ul>
);

InventoryList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InventoryList;
