import { useMemo } from 'react';
import { StoryActions } from '@/components/Story/StoryActions';
import { StoryIllustration } from '@/components/Story/StoryIllustration';
import { StoryRewardPopup } from '@/components/Story/StoryRewardPopup';
import { StorySceneTitle } from '@/components/Story/StorySceneTitle';
import { StoryTextPanel } from '@/components/Story/StoryTextPanel';
import {
  buildStoryActions,
  getStoryActionsLayout,
  getStoryHeaderLayout,
  getStoryRegions,
  getStoryRewardPopupLayout,
  getStoryTextLayout,
} from '@/game/storyLayout';
import type { StoryActionItem } from '@/game/storyLayout';
import type { HotspotConfig } from '@/game/types';
import styles from './StoryView.module.css';

const regions = getStoryRegions();
const headerLayout = getStoryHeaderLayout();
const textLayout = getStoryTextLayout();
const actionsLayout = getStoryActionsLayout();
const rewardPopupLayout = getStoryRewardPopupLayout();

type StoryViewProps = {
  sceneTitle?: string;
  sceneSubtitle?: string;
  panelText: string;
  imageSrc?: string;
  imageAlt: string;
  hotspots: HotspotConfig[];
  hotspotsEnabled: boolean;
  dimmed: boolean;
  textComplete: boolean;
  isEnding: boolean;
  showReward: boolean;
  pendingReward: string | null;
  onTextComplete: () => void;
  onHotspotClick: (hotspot: HotspotConfig) => void;
  onAction: (action: StoryActionItem) => void;
  onRewardContinue: () => void;
};

export function StoryView({
  sceneTitle,
  sceneSubtitle,
  panelText,
  imageSrc,
  imageAlt,
  hotspots,
  hotspotsEnabled,
  dimmed,
  textComplete,
  isEnding,
  showReward,
  pendingReward,
  onTextComplete,
  onHotspotClick,
  onAction,
  onRewardContinue,
}: StoryViewProps) {
  const actions = useMemo(
    () => buildStoryActions(hotspots, textComplete, isEnding, actionsLayout),
    [hotspots, textComplete, isEnding],
  );

  return (
    <div className={styles.storyView}>
      <StoryIllustration
        region={regions.illustration}
        imageSrc={imageSrc}
        alt={imageAlt}
        hotspots={hotspots}
        hotspotsEnabled={hotspotsEnabled}
        dimmed={dimmed}
        onHotspotClick={onHotspotClick}
      />
      <StorySceneTitle
        region={regions.sceneTitle}
        header={headerLayout}
        title={sceneTitle}
        subtitle={sceneSubtitle}
      />
      <StoryTextPanel
        region={regions.text}
        textLayout={textLayout}
        text={panelText}
        onTextComplete={onTextComplete}
      />
      <StoryActions
        region={regions.actions}
        actionsLayout={actionsLayout}
        actions={actions}
        onAction={onAction}
      />
      {showReward && pendingReward && (
        <StoryRewardPopup
          popup={rewardPopupLayout}
          rewardId={pendingReward}
          continueLabel={actionsLayout.singleActionLabel}
          onContinue={onRewardContinue}
        />
      )}
    </div>
  );
}
