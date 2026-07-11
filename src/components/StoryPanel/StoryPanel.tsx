import { TypewriterText } from '@/components/TypewriterText';
import styles from './StoryPanel.module.css';

type StoryPanelProps = {
  text: string;
  onTextComplete?: () => void;
  actionLabel?: string;
  onAction?: () => void;
};

export function StoryPanel({
  text,
  onTextComplete,
  actionLabel,
  onAction,
}: StoryPanelProps) {
  return (
    <div className={styles.panel}>
      <TypewriterText text={text} onComplete={onTextComplete} />
      {actionLabel && onAction && (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
