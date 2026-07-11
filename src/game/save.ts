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

let cachedRaw: string | null = null;
let cachedSave: GameSave = { ...DEFAULT_SAVE };

function setCache(save: GameSave, raw: string | null): GameSave {
  cachedSave = save;
  cachedRaw = raw;
  return cachedSave;
}

export function loadSave(): GameSave {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw === cachedRaw) {
      return cachedSave;
    }

    if (!raw) {
      return setCache({ ...DEFAULT_SAVE }, null);
    }

    return setCache(
      { ...DEFAULT_SAVE, ...JSON.parse(raw) as Partial<GameSave> },
      raw,
    );
  } catch {
    return setCache({ ...DEFAULT_SAVE }, null);
  }
}

export function writeSave(save: GameSave): void {
  const raw = JSON.stringify(save);
  localStorage.setItem(STORAGE_KEY, raw);
  setCache(save, raw);
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
  setCache({ ...DEFAULT_SAVE }, null);
}
