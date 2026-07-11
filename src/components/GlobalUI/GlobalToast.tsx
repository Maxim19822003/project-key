import { getToastLabel, getToastLayout, rectToPercentStyle } from '@/game/ui';
import type { ToastType } from '@/game/ui';
import styles from './GlobalToast.module.css';

const toastLayout = getToastLayout();

type GlobalToastProps = {
  type: ToastType;
  message?: string;
  visible?: boolean;
};

export function GlobalToast({ type, message, visible = true }: GlobalToastProps) {
  if (!visible) {
    return null;
  }

  return (
    <div
      className={[styles.toast, styles[type]].filter(Boolean).join(' ')}
      style={rectToPercentStyle(toastLayout.region)}
      role="status"
      aria-live="polite"
    >
      {message ?? getToastLabel(type)}
    </div>
  );
}
