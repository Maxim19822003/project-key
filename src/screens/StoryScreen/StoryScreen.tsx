import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  BottomBar,
  InteractiveScene,
  Loading,
  RewardModal,
  SceneTransition,
  StoryPanel,
  TopBar,
} from '@/components';
import { getHotspotsForScene } from '@/game/hotspots';
import type { HotspotConfig } from '@/game/types';
import { useGameSave } from '@/hooks/useGameSave';
import { useSceneAudio } from '@/hooks/useSceneAudio';
import { useStoryPlay } from '@/hooks/useStoryPlay';
import '@/styles/screen.css';
import styles from './StoryScreen.module.css';

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

  const handleRewardContinue = () => {
    setShowReward(false);
    completeStory();
    navigate('/world');
  };

  const handleEndingContinue = () => {
    completeStory();
    navigate('/world');
  };

  return (
    <div className="screen">
      <TopBar title="Нео-Сити" subtitle="История 1/10" />
      <div className={`screen__body ${styles.body}`}>
        {loading && !scene ? (
          <Loading label="Загрузка истории" />
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : scene ? (
          <SceneTransition sceneKey={scene.id}>
            <InteractiveScene
              imageSrc={backgroundUrl}
              alt={scene.title ?? 'Сцена'}
              hotspots={hotspots}
              hotspotsEnabled={textComplete && !showReward}
              dimmed={transitioning || showReward}
              onHotspotClick={handleHotspotClick}
            />
            <StoryPanel
              text={panelText}
              onTextComplete={handleTextComplete}
              actionLabel={isEnding && textComplete ? 'Продолжить' : undefined}
              onAction={isEnding && textComplete ? handleEndingContinue : undefined}
            />
            {transitioning && <div className={styles.fadeOverlay} aria-hidden="true" />}
            {pendingReward && (
              <RewardModal
                rewardId={pendingReward}
                visible={showReward}
                onContinue={handleRewardContinue}
              />
            )}
          </SceneTransition>
        ) : null}
      </div>
      <BottomBar />
    </div>
  );
}
