import { getSceneLayout } from '@/game/sceneLayout';
import type { SceneFlow, SceneFlowAction } from '@/game/sceneLayout/types';
import type { HotspotConfig } from '@/game/types';
import { sceneLayoutToHotspots } from '@/game/sceneLayout/adapter';
import type { StoryActionsLayout } from '@/game/storyLayout/types';
import type { StoryActionItem } from '@/game/storyLayout/actions';

const PROJECT_ID = 'key';
const STORY_ID = 'neo_city';

const FALLBACK_SCENE_ACTIONS: Record<string, SceneFlowAction[]> = {
  scene_003: [
    { id: 'power_off', label: 'Выключить', nextScene: 'scene_004' },
    { id: 'find_battery', label: 'Найти батарейку', nextScene: 'scene_005' },
  ],
};

const FALLBACK_AUTO_NAVIGATE: Record<string, string> = {
  scene_013: 'scene_007',
};

const FALLBACK_SILENT_REWARDS: Record<string, string> = {
  scene_013: 'battery',
};

const FALLBACK_ENDING_SCENES = new Set(['scene_004', 'scene_007']);
const FALLBACK_EARLY_HOTSPOTS = new Set(['scene_001']);

function getSceneFlow(sceneId: string): SceneFlow | undefined {
  return getSceneLayout(PROJECT_ID, STORY_ID, sceneId)?.flow;
}

function actionDefToHotspot(action: SceneFlowAction): HotspotConfig {
  return {
    id: action.id,
    label: action.label,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    action: 'navigate',
    nextScene: action.nextScene,
  };
}

export function getNeoCityHotspots(sceneId: string): HotspotConfig[] {
  const layout = getSceneLayout(PROJECT_ID, STORY_ID, sceneId);

  if (layout) {
    return sceneLayoutToHotspots(layout);
  }

  return [];
}

export function isNeoCityEndingScene(sceneId: string): boolean {
  const flow = getSceneFlow(sceneId);
  if (flow?.ending !== undefined) {
    return flow.ending;
  }

  return FALLBACK_ENDING_SCENES.has(sceneId);
}

export function isNeoCityEarlyHotspotScene(sceneId: string): boolean {
  const flow = getSceneFlow(sceneId);
  if (flow?.earlyHotspots !== undefined) {
    return flow.earlyHotspots;
  }

  return FALLBACK_EARLY_HOTSPOTS.has(sceneId);
}

export function getNeoCityAutoNavigate(sceneId: string): string | undefined {
  const flow = getSceneFlow(sceneId);
  return flow?.autoNavigate ?? FALLBACK_AUTO_NAVIGATE[sceneId];
}

export function getNeoCitySilentReward(sceneId: string): string | undefined {
  const flow = getSceneFlow(sceneId);
  return flow?.silentReward ?? FALLBACK_SILENT_REWARDS[sceneId];
}

export function buildNeoCityStoryActions(
  sceneId: string,
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

  const navigateHotspots = hotspots.filter(
    (hotspot) => hotspot.action === 'navigate',
  );

  if (navigateHotspots.length > 0) {
    return [];
  }

  const flow = getSceneFlow(sceneId);
  const sceneActions = flow?.actions ?? FALLBACK_SCENE_ACTIONS[sceneId];

  if (sceneActions?.length) {
    return sceneActions.map((action) => ({
      id: action.id,
      label: action.label,
      type: 'hotspot' as const,
      hotspot: actionDefToHotspot(action),
    }));
  }

  return [];
}
