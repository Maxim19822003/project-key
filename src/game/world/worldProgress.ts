import type { GameSave } from '@/game/types';
import { getWorldSectorDefs } from '@/game/world/sectors';
import type { SectorStatus } from '@/game/world/types';

export type WorldId =
  | 'neo_city'
  | 'forest'
  | 'ice'
  | 'dark_zone'
  | 'metro'
  | 'ruins'
  | 'desert';

export type WorldProgressState = {
  unlocked: string[];
  completed: string[];
  shownUnlockAnimations: string[];
};

/**
 * Дерево открытия миров. Каждый ключ — id мира, значение — миры,
 * которые открываются после его прохождения. Поддерживает ветвление.
 */
export const WORLD_UNLOCK_TREE: Record<string, string[]> = {
  neo_city: ['forest'],
  forest: ['ice'],
  ice: ['dark_zone'],
  dark_zone: ['metro'],
  metro: ['ruins'],
  ruins: ['desert'],
  desert: [],
};

export const INITIAL_UNLOCKED_WORLDS: string[] = ['neo_city'];

export function getWorldState(save: GameSave): WorldProgressState {
  return {
    unlocked: save.unlockedWorlds ?? [...INITIAL_UNLOCKED_WORLDS],
    completed: save.completedWorlds ?? [],
    shownUnlockAnimations: save.shownUnlockAnimations ?? [],
  };
}

export function getNextWorlds(id: string): string[] {
  return WORLD_UNLOCK_TREE[id] ?? [];
}

export function isUnlocked(id: string, save: GameSave): boolean {
  return getWorldState(save).unlocked.includes(id);
}

export function isCompleted(id: string, save: GameSave): boolean {
  return getWorldState(save).completed.includes(id);
}

export function unlockWorld(id: string, save: GameSave): GameSave {
  const state = getWorldState(save);

  if (state.unlocked.includes(id)) {
    return save;
  }

  return {
    ...save,
    unlockedWorlds: [...state.unlocked, id],
  };
}

export function completeWorld(id: string, save: GameSave): GameSave {
  const state = getWorldState(save);
  let next = save;

  if (!state.completed.includes(id)) {
    next = {
      ...next,
      completedWorlds: [...state.completed, id],
    };
  }

  for (const worldId of getNextWorlds(id)) {
    next = unlockWorld(worldId, next);
  }

  return next;
}

export function storyIdToWorldId(storyId: string): string {
  return storyId;
}

export function applyStoryCompletion(storyId: string, save: GameSave): GameSave {
  const worldId = storyIdToWorldId(storyId);
  return completeWorld(worldId, save);
}

export function resolveWorldSectorStatus(worldId: string, save: GameSave): SectorStatus {
  if (isCompleted(worldId, save)) {
    return 'completed';
  }

  if (isUnlocked(worldId, save)) {
    return 'open';
  }

  return 'locked';
}

export type PendingUnlockAnimation = {
  id: string;
  title: string;
};

export function getPendingUnlockAnimation(
  save: GameSave,
): PendingUnlockAnimation | null {
  const state = getWorldState(save);
  const titles = new Map(
    getWorldSectorDefs().map((sector) => [sector.id, sector.title]),
  );

  for (const worldId of state.unlocked) {
    if (worldId === 'neo_city') {
      continue;
    }

    if (!state.shownUnlockAnimations.includes(worldId)) {
      return {
        id: worldId,
        title: titles.get(worldId) ?? worldId,
      };
    }
  }

  return null;
}

export function markUnlockAnimationShown(worldId: string, save: GameSave): GameSave {
  const state = getWorldState(save);

  if (state.shownUnlockAnimations.includes(worldId)) {
    return save;
  }

  return {
    ...save,
    shownUnlockAnimations: [...state.shownUnlockAnimations, worldId],
  };
}

export function getWorldProgressSavePatch(
  save: GameSave,
): Pick<GameSave, 'unlockedWorlds' | 'completedWorlds' | 'shownUnlockAnimations'> {
  const state = getWorldState(save);
  return {
    unlockedWorlds: state.unlocked,
    completedWorlds: state.completed,
    shownUnlockAnimations: state.shownUnlockAnimations,
  };
}
