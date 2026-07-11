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

const AVAILABLE_GLOW = {
  fill: 'rgba(108, 92, 231, 0.22)',
  stroke: 'rgba(108, 92, 231, 0.85)',
  strokeWidth: 0.45,
  opacity: 0.9,
} as const;

const COMPLETED_GLOW = {
  fill: 'rgba(46, 204, 113, 0.22)',
  stroke: 'rgba(72, 160, 255, 0.85)',
  strokeWidth: 0.45,
  opacity: 0.95,
} as const;

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
  if (debug) {
    const state = isActive ? 'active' : visualState;
    return getSectorStateVisual(state);
  }

  if (visualState === 'locked' || !isActive) {
    return HIDDEN_STYLE;
  }

  if (visualState === 'completed') {
    return COMPLETED_GLOW;
  }

  if (visualState === 'available') {
    return AVAILABLE_GLOW;
  }

  return HIDDEN_STYLE;
}
