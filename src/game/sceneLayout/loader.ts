import type { SceneLayout } from '@/game/sceneLayout/types';

const layoutModules = import.meta.glob(
  '../../../projects/key/stories/**/layouts/*.layout.json',
  { eager: true, import: 'default' },
) as Record<string, SceneLayout>;

function layoutKey(storyId: string, sceneId: string): string {
  return `../../../projects/key/stories/${storyId}/layouts/${sceneId}.layout.json`;
}

export function getSceneLayout(
  _projectId: string,
  storyId: string,
  sceneId: string,
): SceneLayout | null {
  const key = layoutKey(storyId, sceneId);
  const layout = layoutModules[key];

  if (!layout || layout.sceneId !== sceneId) {
    return null;
  }

  return layout;
}

export function getAllSceneLayoutKeys(): string[] {
  return Object.keys(layoutModules);
}
