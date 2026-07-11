import type { CSSProperties } from 'react';
import type { HotspotAnimation, HotspotConfig } from '@/game/types';
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

function normalizeAnimations(
  animation?: HotspotAnimation | HotspotAnimation[],
): HotspotAnimation[] {
  if (!animation) {
    return [];
  }

  return Array.isArray(animation) ? animation : [animation];
}

function getAnimationClasses(hotspot: HotspotConfig): string[] {
  const classes: string[] = [];

  if (hotspot.primary) {
    classes.push(styles.primary);
  }

  const animations = normalizeAnimations(hotspot.animation);
  const hasSway = animations.includes('sway');
  const hasFloat = animations.includes('float');

  if (hasSway && hasFloat) {
    classes.push(styles.swayFloat);
  } else {
    if (hasSway) {
      classes.push(styles.sway);
    }

    if (hasFloat) {
      classes.push(styles.float);
    }
  }

  if (animations.includes('pulse')) {
    classes.push(styles.pulse);
  }

  if (animations.includes('glow')) {
    classes.push(styles.glow);
  }

  if (animations.includes('blink')) {
    classes.push(styles.blink);
  }

  if (animations.includes('fade')) {
    classes.push(styles.fade);
  }

  return classes;
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
            ...getAnimationClasses(hotspot),
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
