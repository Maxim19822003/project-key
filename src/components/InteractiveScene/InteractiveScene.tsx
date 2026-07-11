import { HotspotLayer } from '@/components/HotspotLayer';
import type { HotspotConfig } from '@/game/types';
import styles from './InteractiveScene.module.css';

type InteractiveSceneProps = {
  imageSrc?: string;
  alt: string;
  hotspots: HotspotConfig[];
  hotspotsEnabled?: boolean;
  dimmed?: boolean;
  onHotspotClick: (hotspot: HotspotConfig) => void;
};

export function InteractiveScene({
  imageSrc,
  alt,
  hotspots,
  hotspotsEnabled = true,
  dimmed = false,
  onHotspotClick,
}: InteractiveSceneProps) {
  return (
    <div className={styles.scene}>
      {imageSrc ? (
        <img className={styles.image} src={imageSrc} alt={alt} />
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
