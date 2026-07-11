import { HotspotLayer } from '@/components/HotspotLayer';
import type { HotspotConfig } from '@/game/types';
import styles from './InteractiveScene.module.css';

type ImageFit = 'cover' | 'contain';
export type SceneEffect = 'none' | 'box-open' | 'power-on';

type InteractiveSceneProps = {
  imageSrc?: string;
  alt: string;
  hotspots: HotspotConfig[];
  hotspotsEnabled?: boolean;
  dimmed?: boolean;
  sceneEffect?: SceneEffect;
  imageFit?: ImageFit;
  onHotspotClick: (hotspot: HotspotConfig) => void;
};

export function InteractiveScene({
  imageSrc,
  alt,
  hotspots,
  hotspotsEnabled = true,
  dimmed = false,
  sceneEffect = 'none',
  imageFit = 'cover',
  onHotspotClick,
}: InteractiveSceneProps) {
  const isContained = imageFit === 'contain';
  const effectClass =
    sceneEffect === 'box-open'
      ? styles.effectBoxOpen
      : sceneEffect === 'power-on'
        ? styles.effectPowerOn
        : '';

  return (
    <div
      className={`${styles.scene}${isContained ? ` ${styles.sceneContain}` : ''}${effectClass ? ` ${effectClass}` : ''}`}
    >
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
