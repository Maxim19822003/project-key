import type { EditorRegion } from '@/editor/types';
import styles from './EditorLayerList.module.css';

type EditorLayerListProps = {
  regions: EditorRegion[];
};

export function EditorLayerList({ regions }: EditorLayerListProps) {
  const sorted = [...regions]
    .filter((region) => region.type !== 'safeZone')
    .sort((left, right) => right.layer - left.layer);

  return (
    <div className={styles.list}>
      <div className={styles.title}>Слои</div>
      {sorted.map((region) => (
        <div key={region.id} className={styles.item}>
          <span className={styles.layer}>L{region.layer}</span>
          <span className={styles.name}>{region.label}</span>
          <span className={styles.type}>{region.type}</span>
        </div>
      ))}
    </div>
  );
}
