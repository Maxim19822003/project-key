import { HotspotLayer } from '@/components/HotspotLayer';
import type { HotspotConfig } from '@/game/types';
import styles from './InteractiveScene.module.css';

type ImageFit = 'cover' | 'contain';

type InteractiveSceneProps = {
  imageSrc?: string;
  alt: string;
  hotspots: HotspotConfig[];
  hotspotsEnabled?: boolean;
  dimmed?: boolean;
  imageFit?: ImageFit;
  onHotspotClick: (hotspot: HotspotConfig) => void;
};

export function InteractiveScene({
  imageSrc,
  alt,
  hotspots,
  hotspotsEnabled = true,
  dimmed = false,
  imageFit = 'cover',
  onHotspotClick,
}: InteractiveSceneProps) {
  const isContained = imageFit === 'contain';

  return (
    <div className={`${styles.scene}${isContained ? ` ${styles.sceneContain}` : ''}`}>
      {imageSrc ? (
        <img
          className={`${styles.image}${isContained ? ` ${styles.imageContain}` : ''}`}
          src={imageSrc}
          alt={alt}
        />
      ) : (
        <div className={styles.placeholder}>{alt}</div>
      )}
      <div className={`${styles.overlay}${dimmed ? ` ${styles.dimmed}` : ''}`} />
      <HotspotLayer
        hotspots={hotspots}
        disabled={!hotspotsEnabled}
        onHotspotClick={onHotspotClick}
      />
    </div>
  );
}
