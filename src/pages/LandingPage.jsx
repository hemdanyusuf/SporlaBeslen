import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.landing}>
      <div className={styles.hero}>
        <h1>Sporla Beslen</h1>
        <p>Sağlıklı yaşama bugün başlayın</p>
        <Button onClick={() => navigate('/login')}>Hemen Katıl</Button>
      </div>
    </div>
  );
};

export default LandingPage;
