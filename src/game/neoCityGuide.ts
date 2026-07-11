import type { HotspotConfig } from '@/game/types';
import type { StoryActionsLayout } from '@/game/storyLayout/types';
import type { StoryActionItem } from '@/game/storyLayout/actions';

export type NeoCityActionDef = {
  id: string;
  label: string;
  nextScene: string;
};

export const NEO_CITY_SCENE_ACTIONS: Partial<Record<string, NeoCityActionDef[]>> = {
  scene_003: [
    { id: 'power_off', label: 'Выключить', nextScene: 'scene_004' },
    { id: 'find_battery', label: 'Найти батарейку', nextScene: 'scene_005' },
  ],
};

export const NEO_CITY_AUTO_NAVIGATE: Partial<Record<string, string>> = {
  scene_013: 'scene_007',
};

export const NEO_CITY_SILENT_REWARDS: Partial<Record<string, string>> = {
  scene_013: 'battery',
};

export const NEO_CITY_ENDING_SCENES = new Set(['scene_004', 'scene_007']);

const LOCKED_KEY_MESSAGE = 'Понадобится другой Ключ.';
const LOCKED_ITEM_MESSAGE = 'Пока это не пригодится.';

export const NEO_CITY_HOTSPOTS: Record<string, HotspotConfig[]> = {
  scene_001: [
    {
      id: 'box',
      label: 'Коробка',
      x: 38,
      y: 58,
      width: 22,
      height: 18,
      action: 'navigate',
      nextScene: 'scene_003',
      primary: true,
      animation: ['pulse', 'glow', 'sway'],
    },
  ],
  scene_003: [
    {
      id: 'robot',
      label: 'Зверёк',
      x: 28,
      y: 32,
      width: 44,
      height: 48,
      action: 'dialog',
      dialog: '«У меня закончилась энергия... Поможешь?»',
      primary: true,
      animation: ['sway', 'glow', 'blink', 'float'],
    },
  ],
  scene_005: [
    {
      id: 'storage_door',
      label: 'Кладовка',
      x: 4,
      y: 22,
      width: 24,
      height: 52,
      action: 'navigate',
      nextScene: 'scene_006',
      primary: true,
      animation: ['pulse', 'glow'],
    },
    {
      id: 'lift_door',
      label: 'Лифт',
      x: 36,
      y: 18,
      width: 26,
      height: 58,
      action: 'locked',
      lockedMessage: LOCKED_KEY_MESSAGE,
    },
    {
      id: 'basement_door',
      label: 'Подвал',
      x: 70,
      y: 28,
      width: 24,
      height: 48,
      action: 'locked',
      lockedMessage: LOCKED_KEY_MESSAGE,
    },
  ],
  scene_006: [
    {
      id: 'battery',
      label: 'Батарейка',
      x: 12,
      y: 48,
      width: 20,
      height: 22,
      action: 'navigate',
      nextScene: 'scene_013',
      primary: true,
      animation: ['pulse', 'glow'],
    },
    {
      id: 'bolt',
      label: 'Болт',
      x: 40,
      y: 46,
      width: 20,
      height: 22,
      action: 'locked',
      lockedMessage: LOCKED_ITEM_MESSAGE,
    },
    {
      id: 'cassette',
      label: 'Кассета',
      x: 68,
      y: 48,
      width: 20,
      height: 22,
      action: 'locked',
      lockedMessage: LOCKED_ITEM_MESSAGE,
    },
  ],
};

function actionDefToHotspot(action: NeoCityActionDef): HotspotConfig {
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
  return NEO_CITY_HOTSPOTS[sceneId] ?? [];
}

export function isNeoCityEndingScene(sceneId: string): boolean {
  return NEO_CITY_ENDING_SCENES.has(sceneId);
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

  const sceneActions = NEO_CITY_SCENE_ACTIONS[sceneId];
  if (sceneActions?.length) {
    return sceneActions.map((action) => ({
      id: action.id,
      label: action.label,
      type: 'hotspot' as const,
      hotspot: actionDefToHotspot(action),
    }));
  }

  const actionable = hotspots.filter((hotspot) => hotspot.action === 'navigate');

  if (actionable.length === 0) {
    return [];
  }

  if (actionable.length === 1) {
    const hotspot = actionable[0];
    return [
      {
        id: hotspot.id,
        label: hotspot.label,
        type: 'hotspot',
        hotspot,
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
