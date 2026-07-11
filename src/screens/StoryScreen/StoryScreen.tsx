import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Loading, SceneTransition, StoryView, TopBar } from '@/components';
import { getHotspotsForScene } from '@/game/hotspots';
import { getStoryRegions } from '@/game/storyLayout';
import type { StoryActionItem } from '@/game/storyLayout';
import type { HotspotConfig } from '@/game/types';
import { useGameSave } from '@/hooks/useGameSave';
import { useSceneAudio } from '@/hooks/useSceneAudio';
import { useStoryPlay } from '@/hooks/useStoryPlay';
import styles from './StoryScreen.module.css';

const regions = getStoryRegions();

export function StoryScreen() {
  const { projectId, storyId } = useParams<{
    projectId: string;
    storyId: string;
  }>();

  if (!projectId || !storyId) {
    return <Navigate to="/" replace />;
  }

  return <StoryPlayer projectId={projectId} storyId={storyId} />;
}

type StoryPlayerProps = {
  projectId: string;
  storyId: string;
};

function StoryPlayer({ projectId, storyId }: StoryPlayerProps) {
  const navigate = useNavigate();
  const { collectItem, setScene, completeStory } = useGameSave();

  const {
    scene,
    backgroundUrl,
    loading,
    error,
    transitioning,
    navigateToScene,
  } = useStoryPlay({
    projectId,
    storyId,
    onSceneChange: setScene,
  });

  useSceneAudio({ scene, projectId, storyId });

  const [textComplete, setTextComplete] = useState(false);
  const [panelText, setPanelText] = useState('');
  const [showReward, setShowReward] = useState(false);
  const [pendingReward, setPendingReward] = useState<string | null>(null);

  const hotspots = useMemo(
    () => (scene ? getHotspotsForScene(scene.id) : []),
    [scene],
  );

  const isEnding = Boolean(scene && !scene.reward && hotspots.length === 0);
  const rewardId = scene?.reward;

  useEffect(() => {
    setTextComplete(false);
    setShowReward(false);
    setPendingReward(null);
    setPanelText(scene?.text ?? '');
  }, [scene?.id, scene?.text]);

  const handleTextComplete = useCallback(() => {
    setTextComplete(true);

    if (rewardId) {
      setPendingReward(rewardId);
      setShowReward(true);
      collectItem(rewardId);
    }
  }, [collectItem, rewardId]);

  const handleHotspotClick = (hotspot: HotspotConfig) => {
    if (!textComplete) {
      return;
    }

    if (hotspot.action === 'locked') {
      setPanelText(hotspot.lockedMessage ?? 'Закрыто.');
      setTextComplete(true);
      return;
    }

    if (hotspot.action === 'dialog' && hotspot.dialog) {
      setPanelText(hotspot.dialog);
      setTextComplete(false);
      return;
    }

    if (hotspot.action === 'navigate' && hotspot.nextScene) {
      void navigateToScene(hotspot.nextScene);
    }
  };

  const handleAction = (action: StoryActionItem) => {
    if (action.type === 'ending') {
      completeStory();
      navigate('/world');
      return;
    }

    if (action.hotspot) {
      handleHotspotClick(action.hotspot);
    }
  };

  const handleRewardContinue = () => {
    setShowReward(false);
    completeStory();
    navigate('/world');
  };

  return (
    <div className={styles.storyScreen}>
      <div className={styles.layoutLayer}>
        {loading && !scene ? (
          <Loading label="Загрузка истории" />
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : scene ? (
          <SceneTransition sceneKey={scene.id}>
            <StoryView
              sceneTitle={scene.title}
              panelText={panelText}
              imageSrc={backgroundUrl}
              imageAlt={scene.title ?? 'Сцена'}
              hotspots={hotspots}
              hotspotsEnabled={textComplete && !showReward}
              dimmed={transitioning || showReward}
              textComplete={textComplete}
              isEnding={isEnding}
              showReward={showReward}
              pendingReward={pendingReward}
              onTextComplete={handleTextComplete}
              onHotspotClick={handleHotspotClick}
              onAction={handleAction}
              onRewardContinue={handleRewardContinue}
            />
            {transitioning && (
              <div className={styles.fadeOverlay} aria-hidden="true" />
            )}
          </SceneTransition>
        ) : null}
      </div>
      <div
        className={styles.topZone}
        style={{ height: `${regions.topBar.h}%` }}
      >
        <TopBar title="Нео-Сити" subtitle="История 1/10" />
      </div>
    </div>
  );
}
