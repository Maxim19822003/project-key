import uiLayoutSource from '../../../docs/UI_LAYOUT.md?raw';
import { extractLayoutJson } from '@/game/layout/parseUiLayout';
import type { SectorStatus } from '@/game/world/types';

export type LayoutRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type SectorCenter = {
  x: number;
  y: number;
};

export type SectorLayoutDef = {
  id: string;
  title: string;
  center: SectorCenter;
  radius: number;
  status: SectorStatus;
  storyId: string | null;
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
