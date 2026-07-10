import styles from './Loading.module.css';

type LoadingProps = {
  label?: string;
};

export function Loading({ label = 'Загрузка' }: LoadingProps) {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <div className={styles.indicator} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
