import { useState } from 'react';
import RecommendationForm from '../features/DietRecommendation/RecommendationForm';
import RecommendationList from '../features/DietRecommendation/RecommendationList';
import InventoryList from '../features/FoodInventory/InventoryList';
import MealLogger from '../features/MealLogging/MealLogger';
import Button from '../components/ui/Button';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [inventory, setInventory] = useState([]);

  const handleRecommendationSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.food.value;
    if (value) {
      setRecommendations([...recommendations, value]);
      e.target.reset();
    }
  };

  const handleInventoryAdd = (e) => {
    e.preventDefault();
    const value = e.target.elements.item.value;
    if (value) {
      setInventory([...inventory, value]);
      e.target.reset();
    }
  };

  return (
    <div className={styles.home}>
      <h2>Home Page</h2>
      <RecommendationForm onSubmit={handleRecommendationSubmit} />
      <RecommendationList items={recommendations} />

      <form onSubmit={handleInventoryAdd} className={styles.inventoryForm}>
        <input name="item" type="text" placeholder="Add inventory item" />
        <Button type="submit">Add</Button>
      </form>
      <InventoryList items={inventory} />

      <MealLogger />
    </div>
  );
};

export default HomePage;
