import type { EditorSettings } from '@/editor/types';
import styles from './EditorToolbar.module.css';

const STORY_SCENES = [
  'scene_001',
  'scene_003',
  'scene_004',
  'scene_005',
  'scene_006',
  'scene_007',
  'scene_013',
];

type EditorToolbarProps = {
  settings: EditorSettings;
  onChange: (patch: Partial<EditorSettings>) => void;
};

function ToggleButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={[styles.toggle, active ? styles.toggleActive : ''].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export function EditorToolbar({ settings, onChange }: EditorToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <span className={styles.brand}>Editor Mode</span>
      <ToggleButton
        active={settings.showGrid}
        label="Сетка 10×"
        onClick={() => onChange({ showGrid: !settings.showGrid })}
      />
      <ToggleButton
        active={settings.snapToGrid}
        label="Snap"
        onClick={() => onChange({ snapToGrid: !settings.snapToGrid })}
      />
      <ToggleButton
        active={settings.showSafeZone}
        label="Safe Zone"
        onClick={() => onChange({ showSafeZone: !settings.showSafeZone })}
      />
      <ToggleButton
        active={settings.showCenters}
        label="Центры"
        onClick={() => onChange({ showCenters: !settings.showCenters })}
      />
      <ToggleButton
        active={settings.showLayers}
        label="Слои"
        onClick={() => onChange({ showLayers: !settings.showLayers })}
      />
      <ToggleButton
        active={settings.showGlobalUi}
        label="Global UI"
        onClick={() => onChange({ showGlobalUi: !settings.showGlobalUi })}
      />
      <ToggleButton
        active={settings.showPopup}
        label="Popup"
        onClick={() => onChange({ showPopup: !settings.showPopup })}
      />
      <label className={styles.sceneSelect}>
        Сцена
        <select
          value={settings.storySceneId}
          onChange={(event) => onChange({ storySceneId: event.target.value })}
        >
          {STORY_SCENES.map((sceneId) => (
            <option key={sceneId} value={sceneId}>
              {sceneId}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
