import { getWorldMapStateVisuals } from '@/game/world/uiLayout';
import type { SectorStateVisualDef } from '@/game/world/uiLayout';
import type { SectorStatus, SectorVisualState } from '@/game/world/types';

export function mapStatusToVisualState(status: SectorStatus): SectorVisualState {
  if (status === 'locked') {
    return 'locked';
  }

  if (status === 'completed') {
    return 'completed';
  }

  return 'available';
}

export function getSectorStateVisual(
  visualState: SectorVisualState,
): SectorStateVisualDef {
  return getWorldMapStateVisuals()[visualState];
}

export function getSectorInteractiveStyle(
  visualState: SectorVisualState,
  debug: boolean,
  isActive = false,
): {
  fill: string;
  stroke: string;
  strokeWidth: number;
  opacity: number;
} {
  const state = isActive ? 'active' : visualState;
  const visual = getSectorStateVisual(state);

  if (!debug) {
    return {
      fill: 'transparent',
      stroke: 'transparent',
      strokeWidth: 0,
      opacity: 0,
    };
  }

  return visual;
}
