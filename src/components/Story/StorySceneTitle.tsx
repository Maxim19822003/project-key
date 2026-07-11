import { rectToPercentStyle } from '@/game/layout/rectToStyle';
import type { LayoutRect } from '@/game/layout/types';
import type { StoryHeaderLayout } from '@/game/storyLayout/types';
import styles from './StorySceneTitle.module.css';

type StorySceneTitleProps = {
  region: LayoutRect;
  header: StoryHeaderLayout;
  title?: string;
  subtitle?: string;
};

export function StorySceneTitle({
  region,
  header,
  title,
  subtitle,
}: StorySceneTitleProps) {
  if (!header.title.visible && !header.subtitle.visible) {
    return null;
  }

  return (
    <div className={styles.titleArea} style={rectToPercentStyle(region)}>
      {header.title.visible && title && (
        <h2 className={styles.title}>{title}</h2>
      )}
      {header.subtitle.visible && subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
    </div>
  );
}
