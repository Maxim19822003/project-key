import { getWorldMapSectorDefs } from '@/game/world/uiLayout';
import type { WorldSectorDef } from '@/game/world/types';

function toWorldSectorDef(
  sector: ReturnType<typeof getWorldMapSectorDefs>[number],
): WorldSectorDef {
  return {
    id: sector.id,
    title: sector.title,
    storyId: sector.storyId,
    defaultStatus: sector.status,
    shape: sector.shape,
    center: sector.center,
    boundingBox: sector.boundingBox,
    safePadding: sector.safePadding,
    labelPosition: sector.labelPosition,
    iconPosition: sector.iconPosition,
    effects: sector.effects,
  };
}

export function getWorldSectorDefs(): WorldSectorDef[] {
  return getWorldMapSectorDefs().map(toWorldSectorDef);
}
