import type { CSSProperties } from 'react';
import type { HotspotConfig } from '@/game/types';
import styles from './HotspotLayer.module.css';

type HotspotLayerProps = {
  hotspots: HotspotConfig[];
  disabled?: boolean;
  onHotspotClick: (hotspot: HotspotConfig) => void;
};

function getShapeClass(shape: HotspotConfig['shape']): string {
  if (shape === 'circle') {
    return styles.shapeCircle;
  }

  if (shape === 'ellipse') {
    return styles.shapeEllipse;
  }

  return styles.shapeRect;
}

function getHotspotStyle(hotspot: HotspotConfig): CSSProperties {
  const shape = hotspot.shape ?? 'rect';

  if (shape === 'circle' || shape === 'ellipse') {
    return {
      left: `${hotspot.x}%`,
      top: `${hotspot.y}%`,
      width: `${hotspot.width}%`,
      height: `${shape === 'ellipse' ? hotspot.height : hotspot.width}%`,
    };
  }

  return {
    left: `${hotspot.x}%`,
    top: `${hotspot.y}%`,
    width: `${hotspot.width}%`,
    height: `${hotspot.height}%`,
  };
}

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
            getShapeClass(hotspot.shape),
            hotspot.animation === 'sway' ? styles.sway : '',
            hotspot.action === 'locked' ? styles.locked : '',
            disabled ? styles.disabled : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={getHotspotStyle(hotspot)}
          aria-label={hotspot.label}
          disabled={disabled}
          onClick={() => onHotspotClick(hotspot)}
        />
      ))}
    </div>
  );
}
