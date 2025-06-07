import { useState } from 'react';
import styles from './MealLogger.module.css';

const MealLogger = () => {
  const [meal, setMeal] = useState('');
  const [meals, setMeals] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (meal.trim()) {
      setMeals([...meals, meal.trim()]);
      setMeal('');
    }
  };

  return (
    <div className={styles.logger}>
      <h3>Meal Log</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          value={meal}
          onChange={(e) => setMeal(e.target.value)}
          placeholder="Enter meal"
        />
        <button type="submit">Add</button>
      </form>
      <ul className={styles.list}>
        {meals.map((m, index) => (
          <li key={index}>{m}</li>
        ))}
      </ul>
    </div>
  );
};

export default MealLogger;
