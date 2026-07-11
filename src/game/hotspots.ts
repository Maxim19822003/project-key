import { getSceneLayout, sceneLayoutToHotspots } from '@/game/sceneLayout';
import { getNeoCityHotspots } from '@/game/neoCityGuide';

export function getHotspotsForScene(
  sceneId: string,
  projectId = 'key',
  storyId = 'neo_city',
) {
  const layout = getSceneLayout(projectId, storyId, sceneId);

  if (layout) {
    return sceneLayoutToHotspots(layout);
  }

  return getNeoCityHotspots(sceneId);
}
