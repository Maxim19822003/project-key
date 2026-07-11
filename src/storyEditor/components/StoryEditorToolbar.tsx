import type { SceneObjectType } from '@/game/sceneLayout/types';
import styles from './StoryEditorToolbar.module.css';

export type StoryEditorSettings = {
  showGrid: boolean;
  snapToGrid: boolean;
  showSafeZone: boolean;
  showLayers: boolean;
  activeSpace: 'illustration' | 'screen' | 'all';
};

type StoryEditorToolbarProps = {
  settings: StoryEditorSettings;
  onSettingsChange: (patch: Partial<StoryEditorSettings>) => void;
  onAddObject: (type: SceneObjectType) => void;
  onCopyScene: () => void;
  onExportScene: () => void;
  onImportScene: () => void;
  copied: boolean;
};

function Toggle({
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

export function StoryEditorToolbar({
  settings,
  onSettingsChange,
  onAddObject,
  onCopyScene,
  onExportScene,
  onImportScene,
  copied,
}: StoryEditorToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <span className={styles.brand}>Story Editor</span>
      <Toggle
        active={settings.showGrid}
        label="Grid"
        onClick={() => onSettingsChange({ showGrid: !settings.showGrid })}
      />
      <Toggle
        active={settings.snapToGrid}
        label="Snap"
        onClick={() => onSettingsChange({ snapToGrid: !settings.snapToGrid })}
      />
      <Toggle
        active={settings.showSafeZone}
        label="Safe Zone"
        onClick={() => onSettingsChange({ showSafeZone: !settings.showSafeZone })}
      />
      <Toggle
        active={settings.showLayers}
        label="Layers"
        onClick={() => onSettingsChange({ showLayers: !settings.showLayers })}
      />
      <select
        className={styles.select}
        value={settings.activeSpace}
        onChange={(event) =>
          onSettingsChange({
            activeSpace: event.target.value as StoryEditorSettings['activeSpace'],
          })
        }
      >
        <option value="all">All spaces</option>
        <option value="illustration">Illustration</option>
        <option value="screen">Screen</option>
      </select>
      <select
        className={styles.select}
        onChange={(event) => onAddObject(event.target.value as SceneObjectType)}
        defaultValue=""
      >
        <option value="" disabled>
          + Add object
        </option>
        <option value="hotspot">Hotspot</option>
        <option value="item">Item</option>
        <option value="npc">NPC</option>
        <option value="effect">Effect</option>
        <option value="dialog">Dialog</option>
        <option value="reward">Reward</option>
      </select>
      <button type="button" className={styles.action} onClick={onCopyScene}>
        {copied ? 'Copied' : 'Copy Scene JSON'}
      </button>
      <button type="button" className={styles.action} onClick={onExportScene}>
        Export Scene
      </button>
      <button type="button" className={styles.action} onClick={onImportScene}>
        Import Scene
      </button>
    </div>
  );
}
