import type { SceneLayout, SceneObject, SceneObjectType } from '@/game/sceneLayout/types';
import { getStorySafeZone } from '@/game/storyLayout/uiLayout';

export function createEmptySceneLayout(
  projectId: string,
  storyId: string,
  sceneId: string,
): SceneLayout {
  return {
    version: 1,
    sceneId,
    storyId,
    projectId,
    objects: [],
  };
}

export function createDefaultObject(type: SceneObjectType, zIndex: number): SceneObject {
  return {
    id: `${type}_${Date.now()}`,
    type,
    label: 'New Object',
    shape: { type: 'rectangle' },
    space: type === 'reward' || type === 'dialog' ? 'screen' : 'illustration',
    x: 20,
    y: 20,
    width: 20,
    height: 20,
    rotation: 0,
    scale: 1,
    zIndex,
    animation: [],
    cursor: 'pointer',
    tooltip: '',
    visible: true,
    locked: false,
    action: type === 'hotspot' || type === 'item' || type === 'npc' ? 'navigate' : undefined,
  };
}

export function getStoryEditorSafeZone() {
  const safeZone = getStorySafeZone();
  return {
    yFrom: safeZone.forbiddenYFrom,
    yTo: safeZone.forbiddenYTo,
  };
}

export function sortObjectsByLayer(objects: SceneObject[]): SceneObject[] {
  return [...objects].sort((left, right) => left.zIndex - right.zIndex);
}

export function normalizeSceneLayout(layout: SceneLayout): SceneLayout {
  return {
    ...layout,
    version: 1,
    objects: sortObjectsByLayer(layout.objects).map((object, index) => ({
      ...object,
      zIndex: object.zIndex ?? index + 1,
      rotation: object.rotation ?? 0,
      scale: object.scale ?? 1,
      animation: object.animation ?? [],
      cursor: object.cursor ?? 'pointer',
      tooltip: object.tooltip ?? object.label,
      visible: object.visible ?? true,
      locked: object.locked ?? false,
    })),
  };
}
