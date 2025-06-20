import FoodCharts from './FoodCharts';
import Recipe from './Recipe';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FoodCharts />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </Router>
  );
};

export default App;
