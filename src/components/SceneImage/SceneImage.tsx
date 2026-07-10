import styles from './SceneImage.module.css';

type SceneImageProps = {
  src?: string;
  alt?: string;
};

export function SceneImage({ src, alt = 'Scene' }: SceneImageProps) {
  if (src) {
    return (
      <div className={styles.container}>
        <img className={styles.image} src={src} alt={alt} />
      </div>
    );
  }

  return (
    <div className={styles.container} role="img" aria-label={alt}>
      <div className={styles.placeholder}>
        <span className={styles.label}>Scene</span>
      </div>
    </div>
  );
}
