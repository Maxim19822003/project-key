import { useState } from 'react';
import {
  formatCoordinate,
  getSectorShapeRenderData,
} from '@/game/world/sectorGeometry';
import { getSectorInteractiveStyle } from '@/game/world/sectorVisuals';
import type { WorldHotspotView } from '@/game/world/types';
import styles from './SectorLayer.module.css';

type SectorLayerProps = {
  sectors: WorldHotspotView[];
  disabled?: boolean;
  debug?: boolean;
  onSectorClick: (sector: WorldHotspotView) => void;
};

function getHitGroupClass(sector: WorldHotspotView, debug: boolean): string {
  if (debug) {
    return styles.hitGroup;
  }

  if (sector.status === 'locked') {
    return styles.hitGroupLocked;
  }

  if (sector.status === 'completed') {
    return styles.hitGroupCompleted;
  }

  return styles.hitGroupAvailable;
}

function renderHitShape(
  sector: WorldHotspotView,
  style: ReturnType<typeof getSectorInteractiveStyle>,
) {
  const shape = getSectorShapeRenderData(sector.shape, sector.center);

  const shapeProps = {
    className: styles.hitShape,
    fill: style.fill,
    stroke: style.stroke,
    strokeWidth: style.strokeWidth,
    opacity: style.opacity,
  };

  if (shape.kind === 'ellipse') {
    return (
      <ellipse
        {...shapeProps}
        cx={shape.cx}
        cy={shape.cy}
        rx={shape.rx}
        ry={shape.ry}
      />
    );
  }

  if (shape.kind === 'polygon') {
    return <polygon {...shapeProps} points={shape.points} />;
  }

  return <path {...shapeProps} d={shape.d} />;
}

export function SectorLayer({
  sectors,
  disabled = false,
  debug = false,
  onSectorClick,
}: SectorLayerProps) {
  const [activeSectorId, setActiveSectorId] = useState<string | null>(null);

  return (
    <div className={styles.layer}>
      <svg
        className={styles.hitSvg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden={!debug}
      >
        {sectors.map((sector) => {
          const isActive = activeSectorId === sector.id;
          const isLocked = sector.status === 'locked';
          const style = getSectorInteractiveStyle(
            sector.visualState,
            debug,
            !isLocked && isActive,
          );

          return (
            <g
              key={sector.id}
              className={disabled ? styles.groupDisabled : styles.group}
              onMouseEnter={() => setActiveSectorId(sector.id)}
              onMouseLeave={() =>
                setActiveSectorId((current) =>
                  current === sector.id ? null : current,
                )
              }
              onFocus={() => setActiveSectorId(sector.id)}
              onBlur={() =>
                setActiveSectorId((current) =>
                  current === sector.id ? null : current,
                )
              }
            >
              <g
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-label={sector.title}
                className={getHitGroupClass(sector, debug)}
                onClick={() => {
                  if (!disabled) {
                    onSectorClick(sector);
                  }
                }}
                onKeyDown={(event) => {
                  if (disabled) {
                    return;
                  }

                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSectorClick(sector);
                  }
                }}
              >
                {renderHitShape(sector, style)}
              </g>

              {debug && (
                <g className={styles.debugOverlay} pointerEvents="none">
                  <rect
                    className={styles.debugBounds}
                    x={sector.boundingBox.x}
                    y={sector.boundingBox.y}
                    width={sector.boundingBox.w}
                    height={sector.boundingBox.h}
                  />
                  <circle
                    className={styles.debugCenter}
                    cx={sector.center.x}
                    cy={sector.center.y}
                    r={0.8}
                  />
                  <text
                    className={styles.debugLabel}
                    x={sector.labelPosition.x}
                    y={sector.labelPosition.y}
                    textAnchor="middle"
                  >
                    {sector.title}
                  </text>
                  <text
                    className={styles.debugCoords}
                    x={sector.center.x}
                    y={sector.center.y + 2.5}
                    textAnchor="middle"
                  >
                    {formatCoordinate(sector.center)}
                  </text>
                  <text
                    className={styles.debugShapeType}
                    x={sector.boundingBox.x}
                    y={sector.boundingBox.y - 1}
                  >
                    {sector.shape.type}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {!debug && (
        <div className={styles.lockOverlay} aria-hidden="true">
          {sectors.map((sector) => {
            if (sector.status !== 'locked' || activeSectorId !== sector.id) {
              return null;
            }

            return (
              <span
                key={sector.id}
                className={styles.lockIcon}
                style={{
                  left: `${sector.iconPosition.x}%`,
                  top: `${sector.iconPosition.y}%`,
                }}
              >
                🔒
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
