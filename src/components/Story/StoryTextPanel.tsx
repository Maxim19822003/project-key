import { TypewriterText } from '@/components/TypewriterText';
import { rectToPercentStyle } from '@/game/layout/rectToStyle';
import type { LayoutRect } from '@/game/layout/types';
import type { StoryTextLayout } from '@/game/storyLayout/types';
import styles from './StoryTextPanel.module.css';

type StoryTextPanelProps = {
  region: LayoutRect;
  textLayout: StoryTextLayout;
  text: string;
  onTextComplete?: () => void;
};

export function StoryTextPanel({
  region,
  textLayout,
  text,
  onTextComplete,
}: StoryTextPanelProps) {
  return (
    <div
      className={styles.textArea}
      style={{
        ...rectToPercentStyle(region),
        padding: `${textLayout.padding}%`,
        lineHeight: textLayout.lineHeight,
        ['--story-max-lines' as string]: String(textLayout.maxLines),
      }}
    >
      <div
        className={styles.typewriterArea}
        style={rectToPercentStyle(textLayout.typewriterArea)}
      >
        <TypewriterText text={text} onComplete={onTextComplete} />
      </div>
    </div>
  );
}
