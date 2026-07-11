import type { CSSProperties } from 'react';
import type { WorldHotspotView } from '@/game/world/types';
import styles from './SectorLayer.module.css';

type SectorLayerProps = {
  sectors: WorldHotspotView[];
  disabled?: boolean;
  onSectorClick: (sector: WorldHotspotView) => void;
};

function toPercent(value: number): string {
  return `${value * 100}%`;
}

function getPolygonBounds(points: Array<{ x: number; y: number }>) {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return {
    minX,
    minY,
    width: maxX - minX,
    height: maxY - minY,
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
  };
}

function getPolygonClipPath(points: Array<{ x: number; y: number }>): string {
  const bounds = getPolygonBounds(points);

  return `polygon(${points
    .map((point) => {
      const x = ((point.x - bounds.minX) / bounds.width) * 100;
      const y = ((point.y - bounds.minY) / bounds.height) * 100;
      return `${x}% ${y}%`;
    })
    .join(', ')})`;
}

function getSectorStyle(sector: WorldHotspotView): CSSProperties {
  const { coordinates, shape } = sector;

  if (shape === 'polygon' && coordinates.points?.length) {
    const bounds = getPolygonBounds(coordinates.points);

    return {
      left: toPercent(bounds.cx),
      top: toPercent(bounds.cy),
      width: toPercent(bounds.width),
      height: toPercent(bounds.height),
      clipPath: getPolygonClipPath(coordinates.points),
    };
  }

  const rx = coordinates.rx;
  const ry = shape === 'ellipse' ? (coordinates.ry ?? coordinates.rx) : rx;

  return {
    left: toPercent(coordinates.cx),
    top: toPercent(coordinates.cy),
    width: toPercent(rx * 2),
    height: toPercent(ry * 2),
  };
}

function getShapeClass(shape: WorldHotspotView['shape']): string {
  if (shape === 'ellipse') {
    return styles.shapeEllipse;
  }

  if (shape === 'polygon') {
    return styles.shapePolygon;
  }

  return styles.shapeCircle;
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
            getShapeClass(sector.shape),
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
