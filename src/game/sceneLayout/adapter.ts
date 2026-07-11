import type { HotspotAnimation, HotspotConfig, HotspotShape } from '@/game/types';
import type { SceneLayout, SceneObject, SceneObjectShape } from '@/game/sceneLayout/types';

function mapShape(shape: SceneObjectShape): HotspotShape | undefined {
  if (shape.type === 'ellipse') {
    return 'ellipse';
  }

  if (shape.type === 'rectangle') {
    return 'rect';
  }

  return 'rect';
}

function mapAnimations(animation: string[]): HotspotAnimation[] | undefined {
  const allowed: HotspotAnimation[] = [
    'pulse',
    'glow',
    'float',
    'sway',
    'blink',
    'fade',
  ];
  const mapped = animation.filter((name): name is HotspotAnimation =>
    allowed.includes(name as HotspotAnimation),
  );

  return mapped.length > 0 ? mapped : undefined;
}

export function sceneObjectToHotspot(object: SceneObject): HotspotConfig | null {
  const interactiveTypes: SceneObject['type'][] = ['hotspot', 'npc', 'item'];

  if (
    !interactiveTypes.includes(object.type) ||
    !object.visible ||
    object.action === undefined
  ) {
    return null;
  }

  return {
    id: object.id,
    label: object.label,
    x: object.x,
    y: object.y,
    width: object.width,
    height: object.height,
    shape: mapShape(object.shape),
    action: object.action,
    primary: object.primary,
    animation: mapAnimations(object.animation),
    nextScene: object.nextScene,
    dialog: object.dialog,
    lockedMessage: object.lockedMessage,
  };
}

export function sceneLayoutToHotspots(layout: SceneLayout | null): HotspotConfig[] {
  if (!layout) {
    return [];
  }

  return layout.objects
    .filter((object) => object.space === 'illustration')
    .sort((left, right) => left.zIndex - right.zIndex)
    .map(sceneObjectToHotspot)
    .filter((hotspot): hotspot is HotspotConfig => hotspot !== null);
}

export function hotspotToSceneObject(hotspot: HotspotConfig, zIndex: number): SceneObject {
  const shape: SceneObjectShape =
    hotspot.shape === 'ellipse'
      ? { type: 'ellipse' }
      : hotspot.shape === 'circle'
        ? { type: 'ellipse' }
        : { type: 'rectangle' };

  return {
    id: hotspot.id,
    type: 'hotspot',
    label: hotspot.label,
    shape,
    space: 'illustration',
    x: hotspot.x,
    y: hotspot.y,
    width: hotspot.width,
    height: hotspot.height,
    rotation: 0,
    scale: 1,
    zIndex,
    animation: Array.isArray(hotspot.animation)
      ? hotspot.animation
      : hotspot.animation
        ? [hotspot.animation]
        : [],
    cursor: 'pointer',
    tooltip: hotspot.label,
    visible: true,
    locked: false,
    primary: hotspot.primary,
    action: hotspot.action,
    nextScene: hotspot.nextScene,
    dialog: hotspot.dialog,
    lockedMessage: hotspot.lockedMessage,
  };
}
