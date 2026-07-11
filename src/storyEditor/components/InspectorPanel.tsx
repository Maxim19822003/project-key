import type { SceneObject, SceneObjectAction, SceneObjectType } from '@/game/sceneLayout/types';
import styles from './InspectorPanel.module.css';

type InspectorPanelProps = {
  object: SceneObject | null;
  onChange: (patch: Partial<SceneObject>) => void;
  onCopyObject: () => void;
  onPasteObject: () => void;
};

const TYPES: SceneObjectType[] = [
  'hotspot',
  'item',
  'npc',
  'effect',
  'dialog',
  'reward',
];

const ACTIONS: SceneObjectAction[] = ['navigate', 'dialog', 'locked'];

export function InspectorPanel({
  object,
  onChange,
  onCopyObject,
  onPasteObject,
}: InspectorPanelProps) {
  if (!object) {
    return (
      <aside className={styles.panel}>
        <h2 className={styles.title}>Inspector</h2>
        <p className={styles.hint}>Выберите объект на сцене.</p>
      </aside>
    );
  }

  return (
    <aside className={styles.panel}>
      <h2 className={styles.title}>Inspector</h2>
      <div className={styles.field}>
        <label>id</label>
        <input value={object.id} onChange={(e) => onChange({ id: e.target.value })} />
      </div>
      <div className={styles.field}>
        <label>label</label>
        <input value={object.label} onChange={(e) => onChange({ label: e.target.value })} />
      </div>
      <div className={styles.field}>
        <label>type</label>
        <select
          value={object.type}
          onChange={(e) => onChange({ type: e.target.value as SceneObjectType })}
        >
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label>shape</label>
        <select
          value={object.shape.type}
          onChange={(e) => {
            const type = e.target.value;
            if (type === 'polygon') {
              onChange({
                shape: {
                  type: 'polygon',
                  points: [
                    { x: 0, y: 0 },
                    { x: 100, y: 0 },
                    { x: 100, y: 100 },
                    { x: 0, y: 100 },
                  ],
                },
              });
              return;
            }

            if (type === 'customPath') {
              onChange({ shape: { type: 'customPath', d: 'M 0 0 L 100 0 L 100 100 Z' } });
              return;
            }

            onChange({ shape: { type: type as 'rectangle' | 'ellipse' } });
          }}
        >
          <option value="rectangle">rectangle</option>
          <option value="ellipse">ellipse</option>
          <option value="polygon">polygon</option>
          <option value="customPath">customPath</option>
        </select>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>X</label>
          <input
            type="number"
            value={object.x}
            onChange={(e) => onChange({ x: Number(e.target.value) })}
          />
        </div>
        <div className={styles.field}>
          <label>Y</label>
          <input
            type="number"
            value={object.y}
            onChange={(e) => onChange({ y: Number(e.target.value) })}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Width</label>
          <input
            type="number"
            value={object.width}
            onChange={(e) => onChange({ width: Number(e.target.value) })}
          />
        </div>
        <div className={styles.field}>
          <label>Height</label>
          <input
            type="number"
            value={object.height}
            onChange={(e) => onChange({ height: Number(e.target.value) })}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>rotation</label>
          <input
            type="number"
            value={object.rotation}
            onChange={(e) => onChange({ rotation: Number(e.target.value) })}
          />
        </div>
        <div className={styles.field}>
          <label>scale</label>
          <input
            type="number"
            step="0.1"
            value={object.scale}
            onChange={(e) => onChange({ scale: Number(e.target.value) })}
          />
        </div>
      </div>
      <div className={styles.field}>
        <label>z-index</label>
        <input
          type="number"
          value={object.zIndex}
          onChange={(e) => onChange({ zIndex: Number(e.target.value) })}
        />
      </div>
      <div className={styles.field}>
        <label>animation</label>
        <input
          value={object.animation.join(', ')}
          onChange={(e) =>
            onChange({
              animation: e.target.value
                .split(',')
                .map((item) => item.trim())
                .filter(Boolean),
            })
          }
        />
      </div>
      <div className={styles.field}>
        <label>cursor</label>
        <input value={object.cursor} onChange={(e) => onChange({ cursor: e.target.value })} />
      </div>
      <div className={styles.field}>
        <label>tooltip</label>
        <input value={object.tooltip} onChange={(e) => onChange({ tooltip: e.target.value })} />
      </div>
      <div className={styles.field}>
        <label>visible</label>
        <input
          type="checkbox"
          checked={object.visible}
          onChange={(e) => onChange({ visible: e.target.checked })}
        />
      </div>
      {object.action !== undefined && (
        <div className={styles.field}>
          <label>action</label>
          <select
            value={object.action}
            onChange={(e) => onChange({ action: e.target.value as SceneObjectAction })}
          >
            {ACTIONS.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>
      )}
      {object.action === 'navigate' && (
        <div className={styles.field}>
          <label>nextScene</label>
          <input
            value={object.nextScene ?? ''}
            onChange={(e) => onChange({ nextScene: e.target.value })}
          />
        </div>
      )}
      {object.action === 'dialog' && (
        <div className={styles.field}>
          <label>dialog</label>
          <textarea
            value={object.dialog ?? ''}
            onChange={(e) => onChange({ dialog: e.target.value })}
          />
        </div>
      )}
      {object.action === 'locked' && (
        <div className={styles.field}>
          <label>lockedMessage</label>
          <input
            value={object.lockedMessage ?? ''}
            onChange={(e) => onChange({ lockedMessage: e.target.value })}
          />
        </div>
      )}
      <div className={styles.actions}>
        <button type="button" onClick={onCopyObject}>
          Copy object
        </button>
        <button type="button" onClick={onPasteObject}>
          Paste object
        </button>
      </div>
    </aside>
  );
}
