import type { GameSave } from '@/game/types';
import { getWorldMapConfigFromLayout } from '@/game/world/config';
import { getWorldSectorDefs } from '@/game/world/sectors';
import { mapStatusToVisualState } from '@/game/world/sectorVisuals';
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

  if (sector.defaultStatus === 'locked') {
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
  return getWorldSectorDefs().map((sector) => buildWorldSector(sector, save));
}

export function toHotspotView(sector: WorldSector): WorldHotspotView {
  return {
    id: sector.id,
    title: sector.title,
    shape: sector.shape,
    center: sector.center,
    boundingBox: sector.boundingBox,
    safePadding: sector.safePadding,
    labelPosition: sector.labelPosition,
    iconPosition: sector.iconPosition,
    status: sector.status,
    visualState: mapStatusToVisualState(sector.status),
    storyId: sector.storyId,
    effects: sector.effects,
  };
}

export function getWorldHotspots(save: GameSave): WorldHotspotView[] {
  return getWorldSectors(save).map(toHotspotView);
}

export function getWorldMapConfig(): WorldMapConfig {
  return getWorldMapConfigFromLayout();
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
    message: sector.title,
  };
}

export function getStoryPath(projectId: string, storyId: string): string {
  return `/story/${projectId}/${storyId}`;
}
