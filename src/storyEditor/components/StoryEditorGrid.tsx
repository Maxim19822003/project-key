import { STORY_EDITOR_GRID_STEP, STORY_EDITOR_MAJOR_GRID_STEP } from '@/storyEditor/coordinates';
import styles from './StoryEditorGrid.module.css';

type StoryEditorGridProps = {
  enabled: boolean;
};

export function StoryEditorGrid({ enabled }: StoryEditorGridProps) {
  if (!enabled) {
    return null;
  }

  const minor = Array.from(
    { length: 100 / STORY_EDITOR_GRID_STEP + 1 },
    (_, index) => index * STORY_EDITOR_GRID_STEP,
  );
  const major = Array.from(
    { length: 100 / STORY_EDITOR_MAJOR_GRID_STEP + 1 },
    (_, index) => index * STORY_EDITOR_MAJOR_GRID_STEP,
  );

  return (
    <div className={styles.grid} aria-hidden="true">
      {minor.map((value) => (
        <div
          key={`v-${value}`}
          className={[styles.lineV, major.includes(value) ? styles.major : ''].filter(Boolean).join(' ')}
          style={{ left: `${value}%` }}
        />
      ))}
      {minor.map((value) => (
        <div
          key={`h-${value}`}
          className={[styles.lineH, major.includes(value) ? styles.major : ''].filter(Boolean).join(' ')}
          style={{ top: `${value}%` }}
        />
      ))}
    </div>
  );
}
