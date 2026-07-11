import type { GameSave } from '@/game/types';

const STORAGE_KEY = 'key_game_save';

export const DEFAULT_SAVE: GameSave = {
  projectId: 'key',
  storyId: 'neo_city',
  currentSceneId: null,
  foundItems: [],
  storyStarted: false,
  storyCompleted: false,
};

export function loadSave(): GameSave {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_SAVE };
    }
    return { ...DEFAULT_SAVE, ...JSON.parse(raw) as Partial<GameSave> };
  } catch {
    return { ...DEFAULT_SAVE };
  }
}

export function writeSave(save: GameSave): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(save));
}

export function updateSave(patch: Partial<GameSave>): GameSave {
  const next = { ...loadSave(), ...patch };
  writeSave(next);
  return next;
}

export function addFoundItem(itemId: string): GameSave {
  const save = loadSave();
  if (save.foundItems.includes(itemId)) {
    return save;
  }
  return updateSave({ foundItems: [...save.foundItems, itemId] });
}

export function resetSave(): void {
  localStorage.removeItem(STORAGE_KEY);
}
