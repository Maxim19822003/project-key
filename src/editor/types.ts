import type { LayoutRect } from '@/game/layout/types';

export type EditorRegionType =
  | 'region'
  | 'sector'
  | 'hotspot'
  | 'element'
  | 'popup'
  | 'safeZone';

export type EditorScreenId =
  | 'world_map'
  | 'story'
  | 'collection'
  | 'global_ui'
  | 'popup';

export type EditorRegion = {
  id: string;
  group: EditorScreenId;
  label: string;
  type: EditorRegionType;
  layer: number;
  rect: LayoutRect;
  localRect: LayoutRect;
  center: { x: number; y: number };
  parentId?: string;
  shape?: string;
  status?: string;
  debugColor: string;
  jsonKey: string;
  data: Record<string, unknown>;
};

export type EditorSettings = {
  showGrid: boolean;
  snapToGrid: boolean;
  showSafeZone: boolean;
  showCenters: boolean;
  showLayers: boolean;
  showGlobalUi: boolean;
  showPopup: boolean;
  storySceneId: string;
};

export type EditorHoverCoords = {
  x: number;
  y: number;
  areaLabel: string;
};

export const EDITOR_GRID_STEP = 1;
export const EDITOR_MAJOR_GRID_STEP = 10;

export const EDITOR_TYPE_COLORS: Record<EditorRegionType, string> = {
  region: 'rgba(80, 140, 255, 0.35)',
  sector: 'rgba(46, 204, 113, 0.35)',
  hotspot: 'rgba(255, 160, 60, 0.35)',
  element: 'rgba(180, 120, 255, 0.35)',
  popup: 'rgba(255, 220, 80, 0.35)',
  safeZone: 'rgba(255, 80, 80, 0.2)',
};

export const EDITOR_TYPE_STROKES: Record<EditorRegionType, string> = {
  region: 'rgba(80, 140, 255, 0.9)',
  sector: 'rgba(46, 204, 113, 0.9)',
  hotspot: 'rgba(255, 160, 60, 0.9)',
  element: 'rgba(180, 120, 255, 0.9)',
  popup: 'rgba(255, 220, 80, 0.9)',
  safeZone: 'rgba(255, 80, 80, 0.6)',
};
