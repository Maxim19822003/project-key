import type { EditorRegion } from '@/editor/types';
import { EDITOR_TYPE_STROKES } from '@/editor/types';
import styles from './EditorRegionBox.module.css';

type EditorRegionBoxProps = {
  region: EditorRegion;
  selected: boolean;
  showCenter: boolean;
  interactive: boolean;
  onSelect: (region: EditorRegion) => void;
};

export function EditorRegionBox({
  region,
  selected,
  showCenter,
  interactive,
  onSelect,
}: EditorRegionBoxProps) {
  const isSafeZone = region.type === 'safeZone';

  return (
    <div
      className={[
        styles.box,
        selected ? styles.selected : '',
        isSafeZone ? styles.safeZone : '',
        interactive ? styles.interactive : styles.passive,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        left: `${region.rect.x}%`,
        top: `${region.rect.y}%`,
        width: `${region.rect.w}%`,
        height: `${region.rect.h}%`,
        background: isSafeZone ? region.debugColor : `${region.debugColor}`,
        borderColor: EDITOR_TYPE_STROKES[region.type],
        zIndex: 10 + region.layer,
      }}
      onPointerDown={(event) => {
        if (!interactive || isSafeZone) {
          return;
        }

        event.stopPropagation();
        onSelect(region);
      }}
    >
      <span className={styles.label}>
        {region.label} · L{region.layer}
      </span>
      {showCenter && (
        <span
          className={styles.center}
          style={{
            left: '50%',
            top: '50%',
          }}
        />
      )}
    </div>
  );
}
