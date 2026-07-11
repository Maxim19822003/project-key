import type { HotspotConfig } from '@/game/types';
import type { StoryActionsLayout } from '@/game/storyLayout/types';

export type StoryActionItem = {
  id: string;
  label: string;
  type: 'ending' | 'hotspot';
  hotspot?: HotspotConfig;
};

export function buildStoryActions(
  hotspots: HotspotConfig[],
  textComplete: boolean,
  isEnding: boolean,
  actionsLayout: StoryActionsLayout,
): StoryActionItem[] {
  if (!textComplete) {
    return [];
  }

  if (isEnding) {
    return [
      {
        id: 'ending-continue',
        label: actionsLayout.singleActionLabel,
        type: 'ending',
      },
    ];
  }

  const actionable = hotspots.filter((hotspot) => hotspot.action !== 'locked');

  if (actionable.length === 0) {
    return [];
  }

  if (actionable.length === 1) {
    return [
      {
        id: actionable[0].id,
        label: actionsLayout.singleActionLabel,
        type: 'hotspot',
        hotspot: actionable[0],
      },
    ];
  }

  return actionable.slice(0, actionsLayout.maxActions).map((hotspot) => ({
    id: hotspot.id,
    label: hotspot.label,
    type: 'hotspot' as const,
    hotspot,
  }));
}
