import styles from './EditorGrid.module.css';
import { EDITOR_GRID_STEP, EDITOR_MAJOR_GRID_STEP } from '@/editor/types';

type EditorGridProps = {
  enabled: boolean;
};

export function EditorGrid({ enabled }: EditorGridProps) {
  if (!enabled) {
    return null;
  }

  const minorLines = Array.from(
    { length: 100 / EDITOR_GRID_STEP + 1 },
    (_, index) => index * EDITOR_GRID_STEP,
  );
  const majorLines = Array.from(
    { length: 100 / EDITOR_MAJOR_GRID_STEP + 1 },
    (_, index) => index * EDITOR_MAJOR_GRID_STEP,
  );

  return (
    <div className={styles.grid} aria-hidden="true">
      {minorLines.map((value) => (
        <div
          key={`v-${value}`}
          className={[
            styles.lineVertical,
            majorLines.includes(value) ? styles.lineMajor : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ left: `${value}%` }}
        />
      ))}
      {minorLines.map((value) => (
        <div
          key={`h-${value}`}
          className={[
            styles.lineHorizontal,
            majorLines.includes(value) ? styles.lineMajor : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ top: `${value}%` }}
        />
      ))}
    </div>
  );
}
