import styles from './SceneImage.module.css';

type SceneImageProps = {
  src?: string;
  alt?: string;
  dimmed?: boolean;
};

export function SceneImage({ src, alt = 'Scene', dimmed = false }: SceneImageProps) {
  if (src) {
    return (
      <div className={styles.container} role="img" aria-label={alt}>
        <img className={styles.image} src={src} alt={alt} />
        <div className={`${styles.overlay}${dimmed ? ` ${styles.overlayDimmed}` : ''}`} />
      </div>
    );
  }

  return (
    <div className={styles.container} role="img" aria-label={alt}>
      <div className={styles.placeholder}>
        <span className={styles.label}>Сцена</span>
      </div>
    </div>
  );
}
