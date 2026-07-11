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

const HIDDEN_STYLE = {
  fill: 'transparent',
  stroke: 'transparent',
  strokeWidth: 0,
  opacity: 0,
} as const;

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
  if (!debug) {
    return HIDDEN_STYLE;
  }

  const state = isActive ? 'active' : visualState;
  return getSectorStateVisual(state);
}
