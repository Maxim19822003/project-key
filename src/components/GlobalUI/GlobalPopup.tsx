import type { ReactNode } from 'react';
import { getPopupLayout, rectToPercentStyle } from '@/game/ui';
import styles from './GlobalPopup.module.css';

const popupLayout = getPopupLayout();

type GlobalPopupProps = {
  title: string;
  children: ReactNode;
  buttons?: ReactNode;
  onClose: () => void;
  visible?: boolean;
};

export function GlobalPopup({
  title,
  children,
  buttons,
  onClose,
  visible = true,
}: GlobalPopupProps) {
  if (!visible) {
    return null;
  }

  const { region, sections } = popupLayout;

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <div
        className={styles.popup}
        style={rectToPercentStyle(region)}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          style={rectToPercentStyle(sections.close)}
          aria-label="Закрыть"
          onClick={onClose}
        >
          ✕
        </button>
        <div className={styles.titleArea} style={rectToPercentStyle(sections.title)}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div
          className={styles.contentArea}
          style={rectToPercentStyle(sections.content)}
        >
          {children}
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
