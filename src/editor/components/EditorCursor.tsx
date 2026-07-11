import type { EditorHoverCoords } from '@/editor/types';
import styles from './EditorCursor.module.css';

type EditorCursorProps = {
  coords: EditorHoverCoords | null;
};

export function EditorCursor({ coords }: EditorCursorProps) {
  if (!coords) {
    return null;
  }

  return (
    <div className={styles.cursor} style={{ left: `${coords.x}%`, top: `${coords.y}%` }}>
      <span className={styles.badge}>
        X {coords.x.toFixed(1)} · Y {coords.y.toFixed(1)}
      </span>
      <span className={styles.area}>{coords.areaLabel}</span>
    </div>
  );
}
