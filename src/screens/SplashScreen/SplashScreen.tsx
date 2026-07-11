import { useNavigate } from 'react-router-dom';
import styles from './SplashScreen.module.css';

export function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className={styles.splash}>
      <div className={styles.content}>
        <h1 className={styles.logo}>Ключ</h1>
        <p className={styles.tagline}>Каждая игрушка — новая история</p>
        <button
          type="button"
          className={styles.startButton}
          onClick={() => navigate('/world')}
        >
          Начать приключение
        </button>
      </div>
    </div>
  );
}
