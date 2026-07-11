import { useCallback, useEffect, useRef, useState } from 'react';
import { localStoryProvider } from '@/storyEngine';
import { loadSave } from '@/game/save';
import type { Scene, Story } from '@/storyEngine/types';

type UseStoryPlayParams = {
  projectId: string;
  storyId: string;
  onSceneChange?: (sceneId: string) => void;
};

export function useStoryPlay({
  projectId,
  storyId,
  onSceneChange,
}: UseStoryPlayParams) {
  const [story, setStory] = useState<Story | null>(null);
  const [scene, setScene] = useState<Scene | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const onSceneChangeRef = useRef(onSceneChange);

  useEffect(() => {
    onSceneChangeRef.current = onSceneChange;
  }, [onSceneChange]);

  const backgroundUrl = scene?.background
    ? localStoryProvider.loadAssets(projectId, storyId, 'backgrounds', scene.background)
    : undefined;

  const persistScene = useCallback((sceneId: string) => {
    onSceneChangeRef.current?.(sceneId);
  }, []);

  const loadScene = useCallback(
    async (sceneId: string) => {
      setTransitioning(true);
      setError(null);

      try {
        const nextScene = await localStoryProvider.loadScene(
          projectId,
          storyId,
          sceneId,
        );
        setScene(nextScene);
        persistScene(sceneId);

        window.setTimeout(() => setTransitioning(false), 220);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Ошибка загрузки сцены';
        setError(message);
        setTransitioning(false);
      }
    },
    [persistScene, projectId, storyId],
  );

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setLoading(true);
      setError(null);

      try {
        await localStoryProvider.loadProjectManifest(projectId);
        const storyData = await localStoryProvider.loadStory(projectId, storyId);
        const save = loadSave();
        const sceneId = save.currentSceneId ?? storyData.startScene;
        const initialScene = await localStoryProvider.loadScene(
          projectId,
          storyId,
          sceneId,
        );

        if (!cancelled) {
          setStory(storyData);
          setScene(initialScene);

          if (save.currentSceneId !== sceneId) {
            persistScene(sceneId);
          } else if (!save.storyStarted) {
            persistScene(sceneId);
          }
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Ошибка загрузки истории';
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void init();

    return () => {
      cancelled = true;
    };
  }, [persistScene, projectId, storyId]);

  return {
    story,
    scene,
    backgroundUrl,
    loading,
    error,
    transitioning,
    navigateToScene: loadScene,
  };
}
