import type { SceneObject } from '@/game/sceneLayout/types';
import {
  OBJECT_TYPE_COLORS,
  OBJECT_TYPE_STROKES,
} from '@/storyEditor/coordinates';
import styles from './SceneObjectView.module.css';

type SceneObjectViewProps = {
  object: SceneObject;
  selected: boolean;
  onSelect: (id: string) => void;
};

export function SceneObjectView({ object, selected, onSelect }: SceneObjectViewProps) {
  if (!object.visible) {
    return null;
  }

  const isEllipse = object.shape.type === 'ellipse';

  return (
    <button
      type="button"
      className={[
        styles.object,
        selected ? styles.selected : '',
        object.locked ? styles.locked : '',
        isEllipse ? styles.ellipse : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        left: `${object.x}%`,
        top: `${object.y}%`,
        width: `${object.width}%`,
        height: `${object.height}%`,
        transform: `rotate(${object.rotation}deg) scale(${object.scale})`,
        background: OBJECT_TYPE_COLORS[object.type],
        borderColor: OBJECT_TYPE_STROKES[object.type],
        cursor: object.locked ? 'not-allowed' : object.cursor,
        zIndex: 20 + object.zIndex,
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        if (!object.locked) {
          onSelect(object.id);
        }
      }}
    >
      <span className={styles.label}>
        {object.label} · {object.type}
      </span>
    </button>
  );
}
