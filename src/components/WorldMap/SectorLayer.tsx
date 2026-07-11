import type { CSSProperties } from 'react';
import type { WorldHotspotView } from '@/game/world/types';
import styles from './SectorLayer.module.css';

type SectorLayerProps = {
  sectors: WorldHotspotView[];
  disabled?: boolean;
  onSectorClick: (sector: WorldHotspotView) => void;
};

function toPercent(value: number): string {
  return `${value}%`;
}

function getSectorStyle(sector: WorldHotspotView): CSSProperties {
  return {
    left: toPercent(sector.center.x),
    top: toPercent(sector.center.y),
    width: toPercent(sector.radius * 2),
    height: toPercent(sector.radius * 2),
  };
}

function getStatusClass(status: WorldHotspotView['status']): string {
  if (status === 'open') {
    return styles.statusOpen;
  }

  if (status === 'completed') {
    return styles.statusCompleted;
  }

  return styles.statusLocked;
}

export function SectorLayer({
  sectors,
  disabled = false,
  onSectorClick,
}: SectorLayerProps) {
  return (
    <div className={styles.layer}>
      {sectors.map((sector) => (
        <button
          key={sector.id}
          type="button"
          className={[
            styles.sector,
            styles.shapeCircle,
            getStatusClass(sector.status),
            sector.animation === 'pulse' ? styles.pulse : '',
            disabled ? styles.disabled : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={getSectorStyle(sector)}
          aria-label={sector.title}
          disabled={disabled}
          onClick={() => onSectorClick(sector)}
        >
          {sector.status === 'locked' && (
            <span className={styles.lockIcon} aria-hidden="true">
              🔒
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
