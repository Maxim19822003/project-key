import { BottomBar, TopBar } from '@/components';
import '@/styles/screen.css';
import styles from './WorldScreen.module.css';

export function WorldScreen() {
  return (
    <div className="screen">
      <TopBar title="Нео-Сити" />
      <div className="screen__body">
        <h2 className="screen__title">Мир</h2>
        <p className="screen__subtitle">Карта мира появится здесь</p>
        <div className={`screen__placeholder ${styles.map}`}>
          Карта мира
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
