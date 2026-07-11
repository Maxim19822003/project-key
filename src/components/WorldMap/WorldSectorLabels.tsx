import type { WorldHotspotView } from '@/game/world/types';
import styles from './WorldSectorLabels.module.css';

type WorldSectorLabelsProps = {
  sectors: WorldHotspotView[];
};

function getStatusClass(status: WorldHotspotView['status']): string {
  if (status === 'completed') {
    return styles.labelCompleted;
  }

  if (status === 'open') {
    return styles.labelAvailable;
  }

  return styles.labelLocked;
}

function getStatusIcon(status: WorldHotspotView['status']): string | null {
  if (status === 'completed') {
    return '✓';
  }

  if (status === 'locked') {
    return '🔒';
  }

  return null;
}

export function WorldSectorLabels({ sectors }: WorldSectorLabelsProps) {
  return (
    <div className={styles.layer} aria-hidden="true">
      {sectors.map((sector) => {
        const icon = getStatusIcon(sector.status);

        return (
          <div
            key={sector.id}
            className={[styles.label, getStatusClass(sector.status)]
              .filter(Boolean)
              .join(' ')}
            style={{
              left: `${sector.labelPosition.x}%`,
              top: `${sector.labelPosition.y}%`,
            }}
          >
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.title}>{sector.title}</span>
          </div>
        );
      })}
    </div>
  );
}
