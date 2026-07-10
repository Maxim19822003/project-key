import type { ReactNode } from 'react';
import styles from './Dialog.module.css';

type DialogProps = {
  children: ReactNode;
  visible?: boolean;
};

export function Dialog({ children, visible = true }: DialogProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.panel}>{children}</div>
    </div>
  );
}
