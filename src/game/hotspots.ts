import { getNeoCityHotspots } from '@/game/neoCityGuide';

export function getHotspotsForScene(sceneId: string) {
  return getNeoCityHotspots(sceneId);
}
