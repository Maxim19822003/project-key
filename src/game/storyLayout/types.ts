import type { LayoutRect } from '@/game/layout/types';

export type StoryHeaderLayout = {
  title: { visible: boolean };
  subtitle: { visible: boolean };
};

export type StoryTextLayout = {
  padding: number;
  lineHeight: number;
  maxLines: number;
  typewriterArea: LayoutRect;
};

export type StoryActionsLayout = {
  buttonHeight: number;
  gap: number;
  radius: number;
  iconOffset: number;
  textPadding: number;
  minActions: number;
  maxActions: number;
  singleActionLabel: string;
};

export type StoryRewardPopupSections = {
  icon: LayoutRect;
  title: LayoutRect;
  description: LayoutRect;
  rarity: LayoutRect;
  continueButton: LayoutRect;
};

export type StorySafeZone = {
  forbiddenYFrom: number;
  forbiddenYTo: number;
  note: string;
};

export type StoryLayout = {
  screen: 'story';
  coordinateSystem: { x: [number, number]; y: [number, number] };
  regions: {
    topBar: LayoutRect;
    illustration: LayoutRect;
    sceneTitle: LayoutRect;
    text: LayoutRect;
    actions: LayoutRect;
  };
  header: StoryHeaderLayout;
  textLayout: StoryTextLayout;
  actionsLayout: StoryActionsLayout;
  rewardPopup: LayoutRect & {
    sections: StoryRewardPopupSections;
  };
  safeZone: StorySafeZone;
};
