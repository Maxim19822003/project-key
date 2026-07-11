import type { ReactNode } from 'react';
import { getDialogLayout, rectToPercentStyle } from '@/game/ui';
import styles from './GlobalDialog.module.css';

const dialogLayout = getDialogLayout();

type GlobalDialogProps = {
  portrait?: string;
  name?: string;
  text?: string;
  buttons?: ReactNode;
  visible?: boolean;
};

export function GlobalDialog({
  portrait = '👤',
  name = '',
  text = '',
  buttons,
  visible = true,
}: GlobalDialogProps) {
  if (!visible) {
    return null;
  }

  const { region, sections } = dialogLayout;

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.dialog} style={rectToPercentStyle(region)}>
        <div
          className={styles.portraitArea}
          style={rectToPercentStyle(sections.portrait)}
        >
          <span className={styles.portrait} aria-hidden="true">
            {portrait}
          </span>
        </div>
        <div className={styles.nameArea} style={rectToPercentStyle(sections.name)}>
          <h2 className={styles.name}>{name}</h2>
        </div>
        <div className={styles.textArea} style={rectToPercentStyle(sections.text)}>
          <p className={styles.text}>{text}</p>
        </div>
        {buttons && (
          <div
            className={styles.buttonsArea}
            style={rectToPercentStyle(sections.buttons)}
          >
            {buttons}
          </div>
        )}
      </div>
    </div>
  );
}
