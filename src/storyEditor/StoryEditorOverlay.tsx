/**
 * Story Visual Editor — оверлей поверх сцены истории.
 *
 * Как создать новую сцену без изменения кода:
 * 1. Откройте сцену с ?storyEditor=1
 * 2. Расставьте объекты, настройте Inspector
 * 3. Export Scene → сохраните JSON в projects/.../layouts/
 * 4. StoryEngine продолжит читать готовые hotspot-данные через sceneLayout-адаптер
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { LayoutRect } from '@/game/layout/types';
import { getSceneLayout } from '@/game/sceneLayout';
import type { SceneLayout, SceneObject, SceneObjectType } from '@/game/sceneLayout/types';
import { rectToPercentStyle } from '@/game/layout/rectToStyle';
import { InspectorPanel } from '@/storyEditor/components/InspectorPanel';
import { ObjectsPanel } from '@/storyEditor/components/ObjectsPanel';
import { SceneObjectSelection } from '@/storyEditor/components/SceneObjectSelection';
import { SceneObjectView } from '@/storyEditor/components/SceneObjectView';
import { StoryEditorGrid } from '@/storyEditor/components/StoryEditorGrid';
import {
  StoryEditorToolbar,
  type StoryEditorSettings,
} from '@/storyEditor/components/StoryEditorToolbar';
import { pointerToLocalPercent } from '@/storyEditor/coordinates';
import {
  copySceneLayout,
  exportSceneLayout,
  parseSceneLayoutJson,
} from '@/storyEditor/sceneIo';
import {
  createDefaultObject,
  createEmptySceneLayout,
  getStoryEditorSafeZone,
  normalizeSceneLayout,
} from '@/storyEditor/sceneHelpers';
import styles from './StoryEditorOverlay.module.css';

type StoryEditorOverlayProps = {
  projectId: string;
  storyId: string;
  sceneId: string;
  illustrationRegion: LayoutRect;
};

const DEFAULT_SETTINGS: StoryEditorSettings = {
  showGrid: true,
  snapToGrid: true,
  showSafeZone: true,
  showLayers: true,
  activeSpace: 'all',
};

export function StoryEditorOverlay({
  projectId,
  storyId,
  sceneId,
  illustrationRegion,
}: StoryEditorOverlayProps) {
  const [layout, setLayout] = useState<SceneLayout>(() => {
    const existing = getSceneLayout(projectId, storyId, sceneId);
    return normalizeSceneLayout(
      existing ?? createEmptySceneLayout(projectId, storyId, sceneId),
    );
  });
  const [settings, setSettings] = useState<StoryEditorSettings>(DEFAULT_SETTINGS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverCoords, setHoverCoords] = useState<{ x: number; y: number } | null>(null);
  const [copiedScene, setCopiedScene] = useState(false);
  const [clipboardObject, setClipboardObject] = useState<SceneObject | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = getSceneLayout(projectId, storyId, sceneId);
    setLayout(
      normalizeSceneLayout(
        existing ?? createEmptySceneLayout(projectId, storyId, sceneId),
      ),
    );
    setSelectedId(null);
  }, [projectId, storyId, sceneId]);

  const visibleObjects = useMemo(() => {
    return layout.objects.filter((object) => {
      if (settings.activeSpace === 'all') {
        return true;
      }

      return object.space === settings.activeSpace;
    });
  }, [layout.objects, settings.activeSpace]);

  const selectedObject =
    layout.objects.find((object) => object.id === selectedId) ?? null;

  const updateObject = useCallback((id: string, patch: Partial<SceneObject>) => {
    setLayout((current) => ({
      ...current,
      objects: current.objects.map((object) =>
        object.id === id ? { ...object, ...patch } : object,
      ),
    }));
  }, []);

  const handleAddObject = (type: SceneObjectType) => {
    const nextZ = Math.max(0, ...layout.objects.map((object) => object.zIndex)) + 1;
    const object = createDefaultObject(type, nextZ);
    setLayout((current) => ({
      ...current,
      objects: [...current.objects, object],
    }));
    setSelectedId(object.id);
  };

  const handleDeleteObject = (id: string) => {
    setLayout((current) => ({
      ...current,
      objects: current.objects.filter((object) => object.id !== id),
    }));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const handleToggleVisible = (id: string) => {
    const object = layout.objects.find((item) => item.id === id);
    if (object) {
      updateObject(id, { visible: !object.visible });
    }
  };

  const handleToggleLocked = (id: string) => {
    const object = layout.objects.find((item) => item.id === id);
    if (object) {
      updateObject(id, { locked: !object.locked });
    }
  };

  const handleMoveLayer = (id: string, direction: 'up' | 'down') => {
    const sorted = [...layout.objects].sort((a, b) => a.zIndex - b.zIndex);
    const index = sorted.findIndex((object) => object.id === id);

    if (index < 0) {
      return;
    }

    const swapIndex = direction === 'up' ? index + 1 : index - 1;

    if (swapIndex < 0 || swapIndex >= sorted.length) {
      return;
    }

    const current = sorted[index];
    const swap = sorted[swapIndex];

    setLayout((state) => ({
      ...state,
      objects: state.objects.map((object) => {
        if (object.id === current.id) {
          return { ...object, zIndex: swap.zIndex };
        }

        if (object.id === swap.id) {
          return { ...object, zIndex: current.zIndex };
        }

        return object;
      }),
    }));
  };

  const handleCopyScene = async () => {
    await copySceneLayout(layout);
    setCopiedScene(true);
    window.setTimeout(() => setCopiedScene(false), 1500);
  };

  const handleExportScene = () => {
    exportSceneLayout(layout);
  };

  const handleImportScene = () => {
    try {
      const imported = normalizeSceneLayout(parseSceneLayoutJson(importText));
      setLayout(imported);
      setImportOpen(false);
      setImportText('');
      setSelectedId(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Import failed';
      window.alert(message);
    }
  };

  const handleCopyObject = () => {
    if (selectedObject) {
      setClipboardObject(selectedObject);
    }
  };

  const handlePasteObject = () => {
    if (!clipboardObject) {
      return;
    }

    const nextZ = Math.max(0, ...layout.objects.map((object) => object.zIndex)) + 1;
    const pasted: SceneObject = {
      ...clipboardObject,
      id: `${clipboardObject.type}_${Date.now()}`,
      x: clipboardObject.x + 2,
      y: clipboardObject.y + 2,
      zIndex: nextZ,
      locked: false,
    };

    setLayout((current) => ({
      ...current,
      objects: [...current.objects, pasted],
    }));
    setSelectedId(pasted.id);
  };

  const safeZone = getStoryEditorSafeZone();

  return (
    <div className={styles.overlay} aria-label="Story Editor">
      <StoryEditorToolbar
        settings={settings}
        onSettingsChange={(patch) => setSettings((current) => ({ ...current, ...patch }))}
        onAddObject={handleAddObject}
        onCopyScene={() => void handleCopyScene()}
        onExportScene={handleExportScene}
        onImportScene={() => setImportOpen(true)}
        copied={copiedScene}
      />
      <ObjectsPanel
        objects={layout.objects}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onToggleVisible={handleToggleVisible}
        onToggleLocked={handleToggleLocked}
        onDelete={handleDeleteObject}
        onMoveLayer={handleMoveLayer}
      />
      <InspectorPanel
        object={selectedObject}
        onChange={(patch) => {
          if (selectedId) {
            updateObject(selectedId, patch);
          }
        }}
        onCopyObject={handleCopyObject}
        onPasteObject={handlePasteObject}
      />

      <div className={styles.screenCanvas}>
        {settings.showSafeZone && (
          <div
            className={styles.safeZone}
            style={{
              top: `${safeZone.yFrom}%`,
              height: `${safeZone.yTo - safeZone.yFrom}%`,
            }}
          />
        )}

        <div
          className={styles.illustrationCanvas}
          style={rectToPercentStyle(illustrationRegion)}
        >
          <div
            ref={canvasRef}
            className={styles.canvas}
            data-editor-canvas="illustration"
            onPointerMove={(event) => {
              const bounds = canvasRef.current?.getBoundingClientRect();
              if (!bounds) {
                return;
              }

              setHoverCoords(pointerToLocalPercent(event.clientX, event.clientY, bounds));
            }}
            onPointerLeave={() => setHoverCoords(null)}
            onPointerDown={() => setSelectedId(null)}
          >
            <StoryEditorGrid enabled={settings.showGrid} />
            {visibleObjects
              .filter((object) => object.space === 'illustration')
              .map((object) => (
                <SceneObjectView
                  key={object.id}
                  object={object}
                  selected={selectedId === object.id}
                  onSelect={setSelectedId}
                />
              ))}
            {selectedObject?.space === 'illustration' && !selectedObject.locked && (
              <SceneObjectSelection
                object={selectedObject}
                snapEnabled={settings.snapToGrid}
                onChange={(patch) => updateObject(selectedObject.id, patch)}
              />
            )}
          </div>
        </div>

        <div className={styles.screenObjects} data-editor-canvas="screen">
          {visibleObjects
            .filter((object) => object.space === 'screen')
            .map((object) => (
              <SceneObjectView
                key={object.id}
                object={object}
                selected={selectedId === object.id}
                onSelect={setSelectedId}
              />
            ))}
          {selectedObject?.space === 'screen' && !selectedObject.locked && (
            <SceneObjectSelection
              object={selectedObject}
              snapEnabled={settings.snapToGrid}
              onChange={(patch) => updateObject(selectedObject.id, patch)}
            />
          )}
        </div>
      </div>

      {hoverCoords && (
        <div className={styles.cursorBadge}>
          X {hoverCoords.x.toFixed(1)} · Y {hoverCoords.y.toFixed(1)}
        </div>
      )}

      {settings.showLayers && (
        <div className={styles.layerBadge}>
          Layers: {layout.objects.length}
        </div>
      )}

      {importOpen && (
        <div className={styles.importModal}>
          <div className={styles.importCard}>
            <h3>Import Scene</h3>
            <textarea
              value={importText}
              onChange={(event) => setImportText(event.target.value)}
              placeholder="Вставьте Scene Layout JSON"
            />
            <div className={styles.importActions}>
              <button type="button" onClick={() => setImportOpen(false)}>
                Cancel
              </button>
              <button type="button" onClick={handleImportScene}>
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
