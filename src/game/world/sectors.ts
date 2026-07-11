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
    center: sector.center,
    radius: sector.radius,
    animation: sector.status === 'open' ? 'pulse' : 'none',
  };
}

export function getWorldSectorDefs(): WorldSectorDef[] {
  return getWorldMapSectorDefs().map(toWorldSectorDef);
}
