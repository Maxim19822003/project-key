import type { LayoutRect } from '@/game/layout/types';

export const STORY_EDITOR_GRID_STEP = 1;
export const STORY_EDITOR_MAJOR_GRID_STEP = 10;

export function snapStoryValue(value: number, enabled: boolean): number {
  const rounded = Math.round(value * 10) / 10;

  if (!enabled) {
    return rounded;
  }

  return Math.round(rounded / STORY_EDITOR_GRID_STEP) * STORY_EDITOR_GRID_STEP;
}

export function snapObjectRect(
  rect: Pick<LayoutRect, 'x' | 'y' | 'w' | 'h'>,
  enabled: boolean,
) {
  return {
    x: snapStoryValue(rect.x, enabled),
    y: snapStoryValue(rect.y, enabled),
    w: Math.max(STORY_EDITOR_GRID_STEP, snapStoryValue(rect.w, enabled)),
    h: Math.max(STORY_EDITOR_GRID_STEP, snapStoryValue(rect.h, enabled)),
  };
}

export function pointerToLocalPercent(
  clientX: number,
  clientY: number,
  bounds: DOMRect,
): { x: number; y: number } {
  const x = ((clientX - bounds.left) / bounds.width) * 100;
  const y = ((clientY - bounds.top) / bounds.height) * 100;

  return {
    x: Math.max(0, Math.min(100, Math.round(x * 10) / 10)),
    y: Math.max(0, Math.min(100, Math.round(y * 10) / 10)),
  };
}

export const OBJECT_TYPE_COLORS: Record<string, string> = {
  hotspot: 'rgba(255, 160, 60, 0.35)',
  item: 'rgba(80, 200, 120, 0.35)',
  npc: 'rgba(120, 180, 255, 0.35)',
  effect: 'rgba(200, 120, 255, 0.35)',
  dialog: 'rgba(255, 220, 120, 0.35)',
  reward: 'rgba(255, 100, 140, 0.35)',
};

export const OBJECT_TYPE_STROKES: Record<string, string> = {
  hotspot: 'rgba(255, 160, 60, 0.95)',
  item: 'rgba(80, 200, 120, 0.95)',
  npc: 'rgba(120, 180, 255, 0.95)',
  effect: 'rgba(200, 120, 255, 0.95)',
  dialog: 'rgba(255, 220, 120, 0.95)',
  reward: 'rgba(255, 100, 140, 0.95)',
};
