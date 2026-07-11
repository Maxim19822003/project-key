export type {
  SectorClickResult,
  SectorStatus,
  WorldAnimation,
  WorldCoordinates,
  WorldHotspotView,
  WorldMapConfig,
  WorldSector,
  WorldSectorDef,
  WorldShapeType,
} from '@/game/world/types';

export { LOCKED_SECTOR_MESSAGE } from '@/game/world/types';
export { WORLD_MAP_CONFIG } from '@/game/world/config';
export { WORLD_SECTOR_DEFS } from '@/game/world/sectors';
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
