import { rectToPercentStyle } from '@/game/layout/rectToStyle';
import type { LayoutRect } from '@/game/layout/types';
import type { StoryActionItem } from '@/game/storyLayout/actions';
import type { StoryActionsLayout } from '@/game/storyLayout/types';
import styles from './StoryActions.module.css';

type StoryActionsProps = {
  region: LayoutRect;
  actionsLayout: StoryActionsLayout;
  actions: StoryActionItem[];
  onAction: (action: StoryActionItem) => void;
};

export function StoryActions({
  region,
  actionsLayout,
  actions,
  onAction,
}: StoryActionsProps) {
  if (actions.length === 0) {
    return null;
  }

  const isSingle = actions.length === 1;

  return (
    <div
      className={styles.actionsArea}
      style={{
        ...rectToPercentStyle(region),
        gap: `${actionsLayout.gap}%`,
        padding: `${actionsLayout.textPadding}%`,
      }}
    >
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          className={[styles.actionButton, isSingle ? styles.single : '']
            .filter(Boolean)
            .join(' ')}
          style={{
            minHeight: `${actionsLayout.buttonHeight}%`,
            borderRadius: `${actionsLayout.radius}%`,
            paddingLeft: `${actionsLayout.textPadding + actionsLayout.iconOffset}%`,
            paddingRight: `${actionsLayout.textPadding}%`,
          }}
          onClick={() => onAction(action)}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}
