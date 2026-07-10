export type RewardDisplay = {
  emoji: string;
  label: string;
};

export const REWARD_DISPLAY: Record<string, RewardDisplay> = {
  old_token: { emoji: '🪙', label: 'Старый жетон' },
  bolt: { emoji: '🔩', label: 'Болт' },
  damaged_robot: { emoji: '🤖', label: 'Повреждённый робот' },
  cassette: { emoji: '📼', label: 'Кассета' },
};

export function getRewardDisplay(rewardId: string): RewardDisplay {
  return (
    REWARD_DISPLAY[rewardId] ?? {
      emoji: '✨',
      label: rewardId,
    }
  );
}
