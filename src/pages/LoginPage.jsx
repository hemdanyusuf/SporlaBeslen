import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import styles from './LoginPage.module.css';

const LoginPage = () => (
  <Card>
    <div className={styles.login}>
      <h2>Login Page</h2>
      <form className={styles.form}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <Button type="submit">Login</Button>
      </form>
    </div>
  </Card>
);

export default LoginPage;
