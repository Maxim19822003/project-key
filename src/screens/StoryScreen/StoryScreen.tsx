import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { SceneEffect } from '@/components/InteractiveScene';
import { Loading, SceneTransition, StoryView, TopBar } from '@/components';
import { getHotspotsForScene } from '@/game/hotspots';
import {
  NEO_CITY_AUTO_NAVIGATE,
  NEO_CITY_SILENT_REWARDS,
} from '@/game/neoCityGuide';
import { getStoryRegions } from '@/game/storyLayout';
import type { StoryActionItem } from '@/game/storyLayout';
import type { HotspotConfig } from '@/game/types';
import { useGameSave } from '@/hooks/useGameSave';
import { useSceneAudio } from '@/hooks/useSceneAudio';
import { useStoryPlay } from '@/hooks/useStoryPlay';
import styles from './StoryScreen.module.css';

const regions = getStoryRegions();
const BOX_OPEN_DURATION_MS = 700;
const AUTO_NAVIGATE_DELAY_MS = 700;
const POWER_ON_DURATION_MS = 1200;
const SCENES_WITH_EARLY_HOTSPOTS = new Set(['scene_001']);

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
  const [sceneEffect, setSceneEffect] = useState<SceneEffect>('none');
  const [interactionLocked, setInteractionLocked] = useState(false);
  const autoNavigateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const sceneEffectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const hotspots = useMemo(
    () => (scene ? getHotspotsForScene(scene.id) : []),
    [scene],
  );

  const isEnding = Boolean(scene && !scene.reward && hotspots.length === 0);
  const rewardId = scene?.reward;
  const earlyHotspots = scene
    ? SCENES_WITH_EARLY_HOTSPOTS.has(scene.id)
    : false;

  const clearTimers = useCallback(() => {
    if (autoNavigateTimerRef.current) {
      clearTimeout(autoNavigateTimerRef.current);
      autoNavigateTimerRef.current = null;
    }

    if (sceneEffectTimerRef.current) {
      clearTimeout(sceneEffectTimerRef.current);
      sceneEffectTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearTimers();
    setTextComplete(false);
    setShowReward(false);
    setPendingReward(null);
    setInteractionLocked(false);
    setPanelText(scene?.text ?? '');

    if (scene?.id === 'scene_007') {
      setSceneEffect('power-on');
      sceneEffectTimerRef.current = setTimeout(() => {
        setSceneEffect('none');
      }, POWER_ON_DURATION_MS);
    } else {
      setSceneEffect('none');
    }

    return clearTimers;
  }, [clearTimers, scene?.id, scene?.text]);

  const handleTextComplete = useCallback(() => {
    setTextComplete(true);

    const silentReward = scene ? NEO_CITY_SILENT_REWARDS[scene.id] : undefined;
    if (silentReward) {
      collectItem(silentReward);
    }

    const autoNext = scene ? NEO_CITY_AUTO_NAVIGATE[scene.id] : undefined;
    if (autoNext) {
      setInteractionLocked(true);
      autoNavigateTimerRef.current = setTimeout(() => {
        void navigateToScene(autoNext);
      }, AUTO_NAVIGATE_DELAY_MS);
      return;
    }

    if (rewardId) {
      setPendingReward(rewardId);
      setShowReward(true);
      collectItem(rewardId);
    }
  }, [collectItem, navigateToScene, rewardId, scene]);

  const handleHotspotClick = (hotspot: HotspotConfig) => {
    if (interactionLocked || showReward) {
      return;
    }

    if (!earlyHotspots && !textComplete) {
      return;
    }

    if (hotspot.action === 'locked') {
      setPanelText(hotspot.lockedMessage ?? 'Закрыто.');
      setTextComplete(true);
      return;
    }

    if (hotspot.action === 'dialog' && hotspot.dialog) {
      setPanelText(hotspot.dialog);
      setTextComplete(true);
      return;
    }

    if (hotspot.action === 'navigate' && hotspot.nextScene) {
      if (hotspot.id === 'box') {
        setInteractionLocked(true);
        setSceneEffect('box-open');
        sceneEffectTimerRef.current = setTimeout(() => {
          setSceneEffect('none');
          void navigateToScene(hotspot.nextScene!);
        }, BOX_OPEN_DURATION_MS);
        return;
      }

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

  const hotspotsEnabled =
    !interactionLocked &&
    !showReward &&
    sceneEffect !== 'box-open' &&
    (earlyHotspots || textComplete);

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
              sceneId={scene.id}
              sceneTitle={scene.title}
              panelText={panelText}
              imageSrc={backgroundUrl}
              imageAlt={scene.title ?? 'Сцена'}
              hotspots={hotspots}
              hotspotsEnabled={hotspotsEnabled}
              dimmed={transitioning || showReward || interactionLocked}
              sceneEffect={sceneEffect}
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
