import { useCallback, useSyncExternalStore } from 'react';
import {
  addFoundItem,
  loadSave,
  updateSave,
  writeSave,
  DEFAULT_SAVE,
} from '@/game/save';
import { applyStoryCompletion } from '@/game/world/worldProgress';
import type { GameSave } from '@/game/types';

function subscribe(callback: () => void): () => void {
  const handler = () => callback();
  window.addEventListener('storage', handler);
  window.addEventListener('key-save-updated', handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener('key-save-updated', handler);
  };
}

function notifySaveUpdated(): void {
  window.dispatchEvent(new Event('key-save-updated'));
}

function getSnapshot(): GameSave {
  return loadSave();
}

export function useGameSave() {
  const save = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const patchSave = useCallback((patch: Partial<GameSave>) => {
    const next = updateSave(patch);
    notifySaveUpdated();
    return next;
  }, []);

  const collectItem = useCallback((itemId: string) => {
    const next = addFoundItem(itemId);
    notifySaveUpdated();
    return next;
  }, []);

  const setScene = useCallback((sceneId: string) => {
    const save = loadSave();
    if (save.currentSceneId === sceneId && save.storyStarted) {
      return save;
    }
    return patchSave({ currentSceneId: sceneId, storyStarted: true });
  }, [patchSave]);

  const completeStory = useCallback(() => {
    const save = loadSave();
    const withWorldProgress = applyStoryCompletion(save.storyId, save);
    return patchSave({
      ...withWorldProgress,
      storyCompleted: true,
      currentSceneId: null,
    });
  }, [patchSave]);

  const resetProgress = useCallback(() => {
    writeSave({ ...DEFAULT_SAVE });
    notifySaveUpdated();
  }, []);

  return {
    save,
    patchSave,
    collectItem,
    setScene,
    completeStory,
    resetProgress,
  };
}
