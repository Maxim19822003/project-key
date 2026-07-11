import type { LayoutRect } from '@/game/layout/types';
import { EDITOR_GRID_STEP } from '@/editor/types';

export function rectCenter(rect: LayoutRect): { x: number; y: number } {
  return {
    x: rect.x + rect.w / 2,
    y: rect.y + rect.h / 2,
  };
}

export function nestedToScreen(local: LayoutRect, parent: LayoutRect): LayoutRect {
  return {
    x: parent.x + (local.x / 100) * parent.w,
    y: parent.y + (local.y / 100) * parent.h,
    w: (local.w / 100) * parent.w,
    h: (local.h / 100) * parent.h,
  };
}

export function screenToNested(screen: LayoutRect, parent: LayoutRect): LayoutRect {
  return {
    x: ((screen.x - parent.x) / parent.w) * 100,
    y: ((screen.y - parent.y) / parent.h) * 100,
    w: (screen.w / parent.w) * 100,
    h: (screen.h / parent.h) * 100,
  };
}

export function snapValue(value: number, enabled: boolean): number {
  const rounded = Math.round(value * 10) / 10;

  if (!enabled) {
    return rounded;
  }

  return Math.round(rounded / EDITOR_GRID_STEP) * EDITOR_GRID_STEP;
}

export function snapRect(rect: LayoutRect, enabled: boolean): LayoutRect {
  return {
    x: snapValue(rect.x, enabled),
    y: snapValue(rect.y, enabled),
    w: Math.max(EDITOR_GRID_STEP, snapValue(rect.w, enabled)),
    h: Math.max(EDITOR_GRID_STEP, snapValue(rect.h, enabled)),
  };
}

export function pointerToPercent(
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

export function findAreaLabel(
  x: number,
  y: number,
  parents: Array<{ id: string; label: string; rect: LayoutRect }>,
): string {
  const hit = [...parents].reverse().find(
    (parent) =>
      x >= parent.rect.x &&
      x <= parent.rect.x + parent.rect.w &&
      y >= parent.rect.y &&
      y <= parent.rect.y + parent.rect.h,
  );

  return hit?.label ?? 'Экран';
}

export function hotspotToRect(hotspot: {
  x: number;
  y: number;
  width: number;
  height: number;
}): LayoutRect {
  return {
    x: hotspot.x,
    y: hotspot.y,
    w: hotspot.width,
    h: hotspot.height,
  };
}

export function rectToHotspot(rect: LayoutRect) {
  return {
    x: rect.x,
    y: rect.y,
    width: rect.w,
    height: rect.h,
  };
}
