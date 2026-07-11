import { getLoadingLayout, rectToPercentStyle } from '@/game/ui';
import styles from './GlobalLoading.module.css';

const loadingLayout = getLoadingLayout();

type GlobalLoadingProps = {
  hint?: string;
};

export function GlobalLoading({ hint = 'Загрузка...' }: GlobalLoadingProps) {
  const { sections } = loadingLayout;

  return (
    <div
      className={styles.loading}
      style={rectToPercentStyle(loadingLayout.region)}
      role="status"
      aria-live="polite"
    >
      <div className={styles.logoArea} style={rectToPercentStyle(sections.logo)}>
        <span className={styles.logo} aria-hidden="true">
          🔑
        </span>
      </div>
      <div
        className={styles.progressArea}
        style={rectToPercentStyle(sections.progressBar)}
      >
        <div className={styles.progressBar} aria-hidden="true" />
      </div>
      <div className={styles.hintArea} style={rectToPercentStyle(sections.hint)}>
        <span className={styles.hint}>{hint}</span>
      </div>
    </div>
  );
}
