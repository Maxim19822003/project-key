import { useEffect, useMemo, useState } from 'react';
import {
  createStoryEngine,
  localStoryProvider,
} from '@/storyEngine';
import type { IStoryProvider, StoryEngineState } from '@/storyEngine';

export function useStoryEngine(
  projectId: string,
  storyId: string,
  provider: IStoryProvider = localStoryProvider,
) {
  const engine = useMemo(() => createStoryEngine(provider), [provider]);
  const [state, setState] = useState<StoryEngineState>(engine.getState());

  useEffect(() => {
    return engine.subscribe(setState);
  }, [engine]);

  useEffect(() => {
    void engine.start(projectId, storyId);
  }, [engine, projectId, storyId]);

  const scene = state.scene;
  const backgroundUrl = scene?.background
    ? provider.loadAssets(projectId, storyId, 'backgrounds', scene.background)
    : undefined;

  return {
    state,
    scene,
    project: state.project,
    story: state.story,
    choices: scene?.choices ?? [],
    backgroundUrl,
    loading: state.loading,
    error: state.error,
    selectChoice: (index: number) => engine.selectChoice(index),
  };
}
