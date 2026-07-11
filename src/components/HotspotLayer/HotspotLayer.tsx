import type { HotspotConfig } from '@/game/types';
import styles from './HotspotLayer.module.css';

type HotspotLayerProps = {
  hotspots: HotspotConfig[];
  disabled?: boolean;
  onHotspotClick: (hotspot: HotspotConfig) => void;
};

export function HotspotLayer({
  hotspots,
  disabled = false,
  onHotspotClick,
}: HotspotLayerProps) {
  return (
    <div className={styles.layer}>
      {hotspots.map((hotspot) => (
        <button
          key={hotspot.id}
          type="button"
          className={[
            styles.hotspot,
            hotspot.animation ? styles[hotspot.animation] : '',
            hotspot.action === 'locked' ? styles.locked : '',
            disabled ? styles.disabled : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`,
            width: `${hotspot.width}%`,
            height: `${hotspot.height}%`,
          }}
          aria-label={hotspot.label}
          disabled={disabled}
          onClick={() => onHotspotClick(hotspot)}
        />
      ))}
    </div>
  );
}
