import { useEffect } from 'react';
import { sceneAudio } from '@/audio/sceneAudio';
import type { Choice, Scene } from '@/storyEngine/types';

type UseSceneAudioParams = {
  scene: Scene | null;
  projectId: string;
  storyId: string;
};

export function useSceneAudio({ scene, projectId, storyId }: UseSceneAudioParams) {
  useEffect(() => {
    sceneAudio.playScene(scene, { projectId, storyId });

    return () => {
      sceneAudio.stopAll();
    };
  }, [scene, projectId, storyId]);

  return {
    playChoiceSound: (choice: Choice) => {
      sceneAudio.playChoiceSound(choice, { projectId, storyId });
    },
    playRewardSound: (rewardId: string) => {
      sceneAudio.playRewardSound(rewardId);
    },
  };
}
