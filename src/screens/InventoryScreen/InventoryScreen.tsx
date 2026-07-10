import { BottomBar, TopBar } from '@/components';
import '@/styles/screen.css';
import styles from './InventoryScreen.module.css';

export function InventoryScreen() {
  return (
    <div className="screen">
      <TopBar title="Коллекция" />
      <div className="screen__body">
        <h2 className="screen__title">Находки</h2>
        <p className="screen__subtitle">Предметы, собранные в историях</p>
        <div className={`screen__placeholder ${styles.grid}`}>
          Сетка предметов
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
