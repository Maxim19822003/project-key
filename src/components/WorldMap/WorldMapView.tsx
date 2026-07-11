import { SectorLayer } from '@/components/WorldMap/SectorLayer';
import type { WorldHotspotView } from '@/game/world/types';
import styles from './WorldMapView.module.css';

type WorldMapViewProps = {
  imageSrc: string;
  imageAlt: string;
  sectors: WorldHotspotView[];
  sectorsEnabled?: boolean;
  onSectorClick: (sector: WorldHotspotView) => void;
};

export function WorldMapView({
  imageSrc,
  imageAlt,
  sectors,
  sectorsEnabled = true,
  onSectorClick,
}: WorldMapViewProps) {
  return (
    <div className={styles.worldMap}>
      <img className={styles.background} src={imageSrc} alt={imageAlt} />
      <div className={styles.overlay} aria-hidden="true" />
      <SectorLayer
        sectors={sectors}
        disabled={!sectorsEnabled}
        onSectorClick={onSectorClick}
      />
    </div>
  );
}
