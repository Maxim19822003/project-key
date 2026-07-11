/**
 * Visual Editor Mode — оверлей для подбора координат UI без правки кода.
 *
 * Как художнику/верстальщику заменить карту или область:
 * 1. Откройте нужный экран с `?editor=1` (или VITE_EDITOR=true).
 * 2. Выделите область, перетащите или измените размер маркерами.
 * 3. Нажмите Copy JSON в правой панели.
 * 4. Вставьте JSON в соответствующий блок docs/UI_LAYOUT.md.
 * 5. Пересоберите проект — игровая логика менять не нужно.
 */
import { useCallback, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { LayoutRect } from '@/game/layout/types';
import {
  collectEditorRegions,
  getEditorAreaParents,
} from '@/editor/collectRegions';
import {
  findAreaLabel,
  pointerToPercent,
  rectCenter,
  rectToHotspot,
  screenToNested,
} from '@/editor/coordinates';
import { EditorCursor } from '@/editor/components/EditorCursor';
import { EditorGrid } from '@/editor/components/EditorGrid';
import { EditorLayerList } from '@/editor/components/EditorLayerList';
import { EditorPanel } from '@/editor/components/EditorPanel';
import { EditorRegionBox } from '@/editor/components/EditorRegionBox';
import { EditorSelection } from '@/editor/components/EditorSelection';
import { EditorToolbar } from '@/editor/components/EditorToolbar';
import type { EditorHoverCoords, EditorSettings } from '@/editor/types';
import styles from './EditorOverlay.module.css';

const DEFAULT_SETTINGS: EditorSettings = {
  showGrid: true,
  snapToGrid: true,
  showSafeZone: true,
  showCenters: true,
  showLayers: true,
  showGlobalUi: true,
  showPopup: false,
  storySceneId: 'scene_001',
};

export function EditorOverlay() {
  const location = useLocation();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<EditorSettings>(DEFAULT_SETTINGS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<Record<string, LayoutRect>>({});
  const [hoverCoords, setHoverCoords] = useState<EditorHoverCoords | null>(null);

  const baseRegions = useMemo(
    () =>
      collectEditorRegions({
        pathname: location.pathname,
        storySceneId: settings.storySceneId,
        showGlobalUi: settings.showGlobalUi,
        showPopup: settings.showPopup,
      }),
    [
      location.pathname,
      settings.showGlobalUi,
      settings.showPopup,
      settings.storySceneId,
    ],
  );

  const areaParents = useMemo(() => getEditorAreaParents(baseRegions), [baseRegions]);

  const regions = useMemo(() => {
    return baseRegions.map((region) => {
      const override = overrides[region.id];

      if (!override) {
        return region;
      }

      const parent = region.parentId
        ? baseRegions.find((item) => item.id === region.parentId)
        : undefined;
      const localRect = parent
        ? screenToNested(override, parent.rect)
        : override;

      let data: Record<string, unknown> = { ...region.data };

      if (region.type === 'hotspot') {
        data = { ...data, ...rectToHotspot(localRect) };
      } else if (region.type === 'sector') {
        data = {
          ...data,
          center: rectCenter(localRect),
          boundingBox: {
            x: localRect.x,
            y: localRect.y,
            w: localRect.w,
            h: localRect.h,
          },
        };
      } else {
        data = {
          ...data,
          x: localRect.x,
          y: localRect.y,
          w: localRect.w,
          h: localRect.h,
        };
      }

      return {
        ...region,
        rect: override,
        localRect,
        center: rectCenter(override),
        data,
      };
    });
  }, [baseRegions, overrides]);

  const selectedRegion = regions.find((region) => region.id === selectedId) ?? null;

  const visibleRegions = regions.filter((region) => {
    if (region.type === 'safeZone') {
      return settings.showSafeZone;
    }

    return true;
  });

  const updateSettings = useCallback((patch: Partial<EditorSettings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = canvasRef.current?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    const point = pointerToPercent(event.clientX, event.clientY, bounds);

    setHoverCoords({
      x: point.x,
      y: point.y,
      areaLabel: findAreaLabel(point.x, point.y, areaParents),
    });
  };

  const handleRegionChange = (rect: LayoutRect) => {
    if (!selectedId) {
      return;
    }

    setOverrides((current) => ({
      ...current,
      [selectedId]: rect,
    }));
  };

  return (
    <div className={styles.overlay} aria-label="Editor Mode">
      <EditorToolbar settings={settings} onChange={updateSettings} />
      <div
        ref={canvasRef}
        className={styles.canvas}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverCoords(null)}
        onPointerDown={() => setSelectedId(null)}
      >
        <EditorGrid enabled={settings.showGrid} />
        {visibleRegions.map((region) => (
          <EditorRegionBox
            key={region.id}
            region={region}
            selected={region.id === selectedId}
            showCenter={settings.showCenters}
            interactive={region.type !== 'safeZone'}
            onSelect={(next) => setSelectedId(next.id)}
          />
        ))}
        {selectedRegion && selectedRegion.type !== 'safeZone' && (
          <EditorSelection
            rect={selectedRegion.rect}
            snapEnabled={settings.snapToGrid}
            onChange={handleRegionChange}
          />
        )}
        <EditorCursor coords={hoverCoords} />
        {settings.showLayers && <EditorLayerList regions={regions} />}
      </div>
      <EditorPanel region={selectedRegion} />
    </div>
  );
}
