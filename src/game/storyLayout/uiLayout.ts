import uiLayoutSource from '../../../docs/UI_LAYOUT.md?raw';
import { extractLayoutJson } from '@/game/layout/parseUiLayout';
import type { StoryLayout } from '@/game/storyLayout/types';

const storyLayout = extractLayoutJson<StoryLayout>(uiLayoutSource, 'story');

export function getStoryLayout(): StoryLayout {
  return storyLayout;
}

export function getStoryRegions() {
  return storyLayout.regions;
}

export function getStoryHeaderLayout() {
  return storyLayout.header;
}

export function getStoryTextLayout() {
  return storyLayout.textLayout;
}

export function getStoryActionsLayout() {
  return storyLayout.actionsLayout;
}

export function getStoryRewardPopupLayout() {
  return storyLayout.rewardPopup;
}

export function getStorySafeZone() {
  return storyLayout.safeZone;
}
