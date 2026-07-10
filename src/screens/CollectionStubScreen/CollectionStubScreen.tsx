import { useSearchParams, useNavigate } from 'react-router-dom';
import { TopBar } from '@/components';
import '@/styles/screen.css';
import styles from './CollectionStubScreen.module.css';

export function CollectionStubScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const itemName = searchParams.get('item') ?? 'Находка';

  return (
    <div className="screen">
      <TopBar title="Коллекция" />
      <div className={`screen__body ${styles.body}`}>
        <div className={styles.card}>
          <p className={styles.notice}>Коллекция появится в следующей версии.</p>
          <div className={styles.item}>
            <span className={styles.itemLabel}>Найденный предмет</span>
            <span className={styles.itemName}>{itemName}</span>
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={() => navigate('/world')}
          >
            Вернуться в мир
          </button>
        </div>
      </div>
    </div>
  );
}
