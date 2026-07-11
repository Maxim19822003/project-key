export type {
  SectorClickResult,
  SectorStatus,
  SectorVisualState,
  WorldHotspotView,
  WorldMapConfig,
  WorldSector,
  WorldSectorDef,
  SectorShape,
  SectorEffectSlots,
  SectorBoundingBox,
  SectorCenter,
} from '@/game/world/types';

export type {
  LayoutRect,
  SectorLayoutDef,
  SectorStateVisualDef,
  SectorStateVisuals,
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
  getWorldMapStateVisuals,
  getWorldMapDebugConfig,
  isWorldMapDebugEnabled,
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
export {
  applyStoryCompletion,
  completeWorld,
  getNextWorlds,
  getPendingUnlockAnimation,
  getWorldProgressSavePatch,
  getWorldState,
  INITIAL_UNLOCKED_WORLDS,
  isCompleted,
  isUnlocked,
  markUnlockAnimationShown,
  resolveWorldSectorStatus,
  storyIdToWorldId,
  unlockWorld,
  WORLD_UNLOCK_TREE,
} from '@/game/world/worldProgress';
export type {
  PendingUnlockAnimation,
  WorldId,
  WorldProgressState,
} from '@/game/world/worldProgress';
