import { BottomBar, TopBar } from '@/components';
import '@/styles/screen.css';
import styles from './SettingsScreen.module.css';

export function SettingsScreen() {
  return (
    <div className="screen">
      <TopBar title="Настройки" />
      <div className="screen__body">
        <h2 className="screen__title">Настройки</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <span className={styles.label}>Звук</span>
            <span className={styles.value}>Вкл</span>
          </li>
          <li className={styles.item}>
            <span className={styles.label}>Музыка</span>
            <span className={styles.value}>Вкл</span>
          </li>
          <li className={styles.item}>
            <span className={styles.label}>Версия</span>
            <span className={styles.value}>0.1.0</span>
          </li>
        </ul>
      </div>
      <BottomBar />
    </div>
  );
}
