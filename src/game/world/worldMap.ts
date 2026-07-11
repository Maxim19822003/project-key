import type { GameSave } from '@/game/types';
import { WORLD_MAP_CONFIG } from '@/game/world/config';
import { WORLD_SECTOR_DEFS } from '@/game/world/sectors';
import {
  LOCKED_SECTOR_MESSAGE,
  type SectorClickResult,
  type SectorStatus,
  type WorldHotspotView,
  type WorldMapConfig,
  type WorldSector,
  type WorldSectorDef,
} from '@/game/world/types';

export { LOCKED_SECTOR_MESSAGE };

function hasRequiredKey(sector: WorldSectorDef, save: GameSave): boolean {
  if (!sector.requiredKey) {
    return true;
  }

  return save.foundItems.includes(sector.requiredKey);
}

function resolveStoryProgress(sector: WorldSectorDef, save: GameSave): number {
  if (!sector.storyId || save.storyId !== sector.storyId) {
    return 0;
  }

  if (save.storyCompleted) {
    return 1;
  }

  if (save.storyStarted) {
    return 0.5;
  }

  return 0;
}

export function resolveSectorStatus(
  sector: WorldSectorDef,
  save: GameSave,
): SectorStatus {
  if (sector.storyId && save.storyId === sector.storyId && save.storyCompleted) {
    return 'completed';
  }

  if (sector.defaultStatus === 'locked' && !hasRequiredKey(sector, save)) {
    return 'locked';
  }

  return 'open';
}

export function resolveSectorProgress(
  sector: WorldSectorDef,
  save: GameSave,
): number {
  if (sector.storyId) {
    return resolveStoryProgress(sector, save);
  }

  return resolveSectorStatus(sector, save) === 'completed' ? 1 : 0;
}

export function buildWorldSector(
  sector: WorldSectorDef,
  save: GameSave,
): WorldSector {
  return {
    ...sector,
    status: resolveSectorStatus(sector, save),
    progress: resolveSectorProgress(sector, save),
  };
}

export function getWorldSectors(save: GameSave): WorldSector[] {
  return WORLD_SECTOR_DEFS.map((sector) => buildWorldSector(sector, save));
}

export function toHotspotView(sector: WorldSector): WorldHotspotView {
  return {
    id: sector.id,
    title: sector.title,
    description: sector.description,
    shape: sector.shape,
    coordinates: sector.coordinates,
    status: sector.status,
    animation: sector.animation ?? 'none',
    storyId: sector.storyId,
  };
}

export function getWorldHotspots(save: GameSave): WorldHotspotView[] {
  return getWorldSectors(save).map(toHotspotView);
}

export function getWorldMapConfig(): WorldMapConfig {
  return WORLD_MAP_CONFIG;
}

export function resolveSectorClick(
  sector: WorldSector,
  projectId: string,
): SectorClickResult {
  if (sector.status === 'locked') {
    return {
      type: 'locked',
      message: LOCKED_SECTOR_MESSAGE,
    };
  }

  if (sector.storyId) {
    return {
      type: 'navigate',
      projectId,
      storyId: sector.storyId,
    };
  }

  return {
    type: 'info',
    message: sector.description,
  };
}

export function getStoryPath(projectId: string, storyId: string): string {
  return `/story/${projectId}/${storyId}`;
}
