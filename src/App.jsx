import FoodCharts from './FoodCharts';
import Recipe from './Recipe';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.module.css';

const App = () => {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Link to="/">Anasayfa</Link>
        <Link to="/home">Uygulama</Link>
        <Link to="/charts">Charts</Link>
        <Link to="/recipe">Recipe</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/charts" element={<FoodCharts />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
