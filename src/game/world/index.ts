export type {
  SectorClickResult,
  SectorStatus,
  WorldAnimation,
  WorldHotspotView,
  WorldMapConfig,
  WorldSector,
  WorldSectorDef,
} from '@/game/world/types';

export type {
  LayoutRect,
  SectorCenter,
  SectorLayoutDef,
  WorldMapLayout,
} from '@/game/world/uiLayout';

export { LOCKED_SECTOR_MESSAGE } from '@/game/world/types';
export { getWorldMapConfigFromLayout } from '@/game/world/config';
export { getWorldSectorDefs } from '@/game/world/sectors';
export {
  getWorldMapLayout,
  getWorldMapMeta,
  getWorldMapRegions,
  getWorldMapSectorDefs,
} from '@/game/world/uiLayout';
export {
  buildWorldSector,
  getStoryPath,
  getWorldHotspots,
  getWorldMapConfig,
  getWorldSectors,
  resolveSectorClick,
  resolveSectorProgress,
  resolveSectorStatus,
  toHotspotView,
} from '@/game/world/worldMap';
