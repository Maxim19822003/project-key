import type { Choice, Scene } from '@/storyEngine/types';

type AudioContext = {
  projectId: string;
  storyId: string;
};

type SceneAudioController = {
  playScene(scene: Scene | null, context: AudioContext): void;
  playChoiceSound(choice: Choice, context: AudioContext): void;
  playRewardSound(rewardId: string): void;
  stopAll(): void;
};

function logAudio(channel: string, value: string | undefined): void {
  if (!value) {
    return;
  }

  console.debug(`[audio:${channel}]`, value);
}

export const sceneAudio: SceneAudioController = {
  playScene(scene, context) {
    if (!scene) {
      return;
    }

    logAudio('music', scene.music);
    logAudio('ambient', scene.ambient);
    logAudio('sfx', scene.sound);
    logAudio('effect', scene.effect);
    console.debug('[audio:context]', context);
  },

  playChoiceSound(choice) {
    logAudio('choice', choice.sound);
  },

  playRewardSound(rewardId) {
    logAudio('reward', `item_received_${rewardId}.mp3`);
  },

  stopAll() {
    console.debug('[audio] stop all');
  },
};
