import type { SceneObject } from '@/game/sceneLayout/types';
import styles from './ObjectsPanel.module.css';

type ObjectsPanelProps = {
  objects: SceneObject[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onToggleVisible: (id: string) => void;
  onToggleLocked: (id: string) => void;
  onDelete: (id: string) => void;
  onMoveLayer: (id: string, direction: 'up' | 'down') => void;
};

export function ObjectsPanel({
  objects,
  selectedId,
  onSelect,
  onToggleVisible,
  onToggleLocked,
  onDelete,
  onMoveLayer,
}: ObjectsPanelProps) {
  const sorted = [...objects].sort((left, right) => right.zIndex - left.zIndex);

  return (
    <aside className={styles.panel}>
      <h2 className={styles.title}>Objects</h2>
      {sorted.map((object) => (
        <div
          key={object.id}
          className={[
            styles.item,
            selectedId === object.id ? styles.itemSelected : '',
            !object.visible ? styles.itemHidden : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <button
            type="button"
            className={styles.nameButton}
            onClick={() => onSelect(object.id)}
          >
            <span className={styles.layer}>L{object.zIndex}</span>
            <span>{object.label}</span>
            <span className={styles.type}>{object.type}</span>
          </button>
          <div className={styles.controls}>
            <button type="button" onClick={() => onToggleVisible(object.id)}>
              {object.visible ? '👁' : '🚫'}
            </button>
            <button type="button" onClick={() => onToggleLocked(object.id)}>
              {object.locked ? '🔒' : '🔓'}
            </button>
            <button type="button" onClick={() => onMoveLayer(object.id, 'up')}>
              ▲
            </button>
            <button type="button" onClick={() => onMoveLayer(object.id, 'down')}>
              ▼
            </button>
            <button type="button" onClick={() => onDelete(object.id)}>
              ✕
            </button>
          </div>
        </div>
      ))}
    </aside>
  );
}
