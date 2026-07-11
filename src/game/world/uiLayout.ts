import uiLayoutSource from '../../../docs/UI_LAYOUT.md?raw';
import { extractLayoutJson } from '@/game/layout/parseUiLayout';
import type {
  SectorBoundingBox,
  SectorCenter,
  SectorEffectSlots,
  SectorShape,
  SectorStatus,
  SectorVisualState,
} from '@/game/world/types';

export type LayoutRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type SectorStateVisualDef = {
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
};

export type SectorStateVisuals = Record<SectorVisualState, SectorStateVisualDef>;

export type SectorLayoutDef = {
  id: string;
  title: string;
  shape: SectorShape;
  center: SectorCenter;
  boundingBox: SectorBoundingBox;
  safePadding: number;
  labelPosition: SectorCenter;
  iconPosition: SectorCenter;
  status: SectorStatus;
  storyId: string | null;
  effects: SectorEffectSlots;
};

export type WorldMapDebugConfig = {
  enabled: boolean;
  note: string;
};

export type WorldMapLayout = {
  screen: 'world_map';
  coordinateSystem: { x: [number, number]; y: [number, number] };
  regions: {
    topBar: LayoutRect;
    gameArea: LayoutRect;
    bottomMenu: LayoutRect;
  };
  map: {
    projectId: string;
    imageSrc: string;
    imageAlt: string;
  };
  debug: WorldMapDebugConfig;
  stateVisuals: SectorStateVisuals;
  effectSlots: {
    note: string;
    fields: Array<keyof SectorEffectSlots>;
  };
  sectors: SectorLayoutDef[];
};

function extractWorldMapLayout(source: string): WorldMapLayout {
  return extractLayoutJson<WorldMapLayout>(source, 'world_map');
}

const worldMapLayout = extractWorldMapLayout(uiLayoutSource);

export function getWorldMapLayout(): WorldMapLayout {
  return worldMapLayout;
}

export function getWorldMapRegions() {
  return worldMapLayout.regions;
}

export function getWorldMapSectorDefs(): SectorLayoutDef[] {
  return worldMapLayout.sectors;
}

export function getWorldMapMeta() {
  return worldMapLayout.map;
}

export function getWorldMapStateVisuals(): SectorStateVisuals {
  return worldMapLayout.stateVisuals;
}

export function getWorldMapDebugConfig(): WorldMapDebugConfig {
  return worldMapLayout.debug;
}

/**
 * DEBUG-режим карты: контуры, координаты и подписи секторов.
 * Включается через ?worldMapDebug=1 в URL, VITE_WORLD_MAP_DEBUG=true
 * или debug.enabled в UI_LAYOUT.md.
 */
export function isWorldMapDebugEnabled(): boolean {
  if (worldMapLayout.debug.enabled) {
    return true;
  }

  if (import.meta.env.VITE_WORLD_MAP_DEBUG === 'true') {
    return true;
  }

  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search).has('worldMapDebug');
  }

  return false;
}
