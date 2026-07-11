import { SectorLayer } from '@/components/WorldMap/SectorLayer';
import { WorldSectorLabels } from '@/components/WorldMap/WorldSectorLabels';
import { WorldUnlockReveal } from '@/components/WorldMap/WorldUnlockReveal';
import type { WorldHotspotView } from '@/game/world/types';
import styles from './WorldMapView.module.css';

type WorldMapViewProps = {
  imageSrc: string;
  imageAlt: string;
  sectors: WorldHotspotView[];
  sectorsEnabled?: boolean;
  debug?: boolean;
  revealSector?: WorldHotspotView | null;
  onRevealComplete?: () => void;
  onSectorClick: (sector: WorldHotspotView) => void;
};

/**
 * Карта мира: иллюстрация + невидимые области клика по данным UI_LAYOUT.md.
 *
 * Как заменить карту без изменения кода:
 * 1. Положите новое изображение в public/projects/key/assets/ (или другой путь).
 * 2. В docs/UI_LAYOUT.md обновите map.imageSrc и координаты секторов
 *    (shape, center, boundingBox, labelPosition, iconPosition).
 * 3. Пересоберите проект. React-компоненты и игровая логика менять не нужно.
 *
 * Проверка разметки: ?worldMapDebug=1 в URL или VITE_WORLD_MAP_DEBUG=true.
 */
export function WorldMapView({
  imageSrc,
  imageAlt,
  sectors,
  sectorsEnabled = true,
  debug = false,
  revealSector = null,
  onRevealComplete,
  onSectorClick,
}: WorldMapViewProps) {
  return (
    <div className={styles.worldMap}>
      <img className={styles.background} src={imageSrc} alt={imageAlt} />
      <div className={styles.overlay} aria-hidden="true" />
      <SectorLayer
        sectors={sectors}
        disabled={!sectorsEnabled}
        debug={debug}
        onSectorClick={onSectorClick}
      />
      {!debug && <WorldSectorLabels sectors={sectors} />}
      {!debug && revealSector && onRevealComplete && (
        <WorldUnlockReveal sector={revealSector} onComplete={onRevealComplete} />
      )}
    </div>
  );
}
