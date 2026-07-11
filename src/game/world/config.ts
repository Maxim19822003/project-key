import { getWorldMapMeta } from '@/game/world/uiLayout';
import type { WorldMapConfig } from '@/game/world/types';

export function getWorldMapConfigFromLayout(): WorldMapConfig {
  const map = getWorldMapMeta();

  return {
    projectId: map.projectId,
    imageSrc: map.imageSrc,
    imageAlt: map.imageAlt,
  };
}
