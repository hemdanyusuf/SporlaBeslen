import { useState } from 'react';
import RecommendationForm from '../features/DietRecommendation/RecommendationForm';
import RecommendationList from '../features/DietRecommendation/RecommendationList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [items, setItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.food.value;
    if (value) {
      setItems([...items, value]);
      e.target.reset();
    }
  };

  return (
    <div className={styles.home}>
      <h2>Home Page</h2>
      <RecommendationForm onSubmit={handleSubmit} />
      <RecommendationList items={items} />
    </div>
  );
};

export default HomePage;
