import { useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { Choice } from '@/types';
import { getRewardDisplay } from '@/app/rewards';
import {
  BottomBar,
  ChoiceButton,
  Dialog,
  Loading,
  RewardModal,
  SceneImage,
  SceneTransition,
  TopBar,
  TypewriterText,
} from '@/components';
import { useStoryEngine } from '@/hooks';
import { useSceneAudio } from '@/hooks/useSceneAudio';
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
  const {
    scene,
    story,
    choices,
    backgroundUrl,
    loading,
    error,
    selectChoice,
  } = useStoryEngine(projectId, storyId);

  const { playChoiceSound, playRewardSound } = useSceneAudio({
    scene,
    projectId,
    storyId,
  });

  const [textComplete, setTextComplete] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const screenTitle = scene?.title ?? story?.title ?? 'История';
  const isEnding = choices.length === 0;
  const rewardId = scene?.reward;

  useEffect(() => {
    setTextComplete(false);
    setShowReward(false);
  }, [scene?.id]);

  useEffect(() => {
    if (loading && scene?.id) {
      setIsTransitioning(true);
      const timer = window.setTimeout(() => setIsTransitioning(false), 220);
      return () => window.clearTimeout(timer);
    }

    setIsTransitioning(false);
    return undefined;
  }, [loading, scene?.id]);

  const handleTextComplete = useCallback(() => {
    setTextComplete(true);

    if (rewardId) {
      playRewardSound(rewardId);
      setShowReward(true);
    }
  }, [playRewardSound, rewardId]);

  const handleChoice = (choice: Choice, index: number) => {
    playChoiceSound(choice);
    setTextComplete(false);
    selectChoice(index);
  };

  const handleRewardContinue = () => {
    const reward = getRewardDisplay(rewardId ?? '');
    navigate(`/collection-stub?item=${encodeURIComponent(reward.label)}`);
  };

  const handleEndingContinue = () => {
    navigate('/world');
  };

  const showChoices = textComplete && choices.length > 0 && !loading;
  const showEndingButton = textComplete && isEnding && !rewardId && !loading;

  return (
    <div className="screen">
      <TopBar title={screenTitle} />
      <div className={`screen__body ${styles.body}`}>
        {loading && !scene ? (
          <Loading label="Загрузка истории" />
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : scene ? (
          <SceneTransition sceneKey={scene.id}>
            <SceneImage
              src={backgroundUrl}
              alt={scene.title ?? 'Фон сцены'}
              dimmed={isTransitioning || showReward}
            />
            <Dialog>
              <TypewriterText
                text={scene.text ?? ''}
                onComplete={handleTextComplete}
              />
              {showChoices && (
                <div className={styles.choices}>
                  {choices.map((choice: Choice, index: number) => (
                    <ChoiceButton
                      key={`${choice.text}-${index}`}
                      label={choice.text}
                      disabled={loading}
                      onClick={() => handleChoice(choice, index)}
                    />
                  ))}
                </div>
              )}
              {showEndingButton && (
                <button
                  type="button"
                  className={styles.continueButton}
                  onClick={handleEndingContinue}
                >
                  Продолжить
                </button>
              )}
            </Dialog>
            {isTransitioning && <div className={styles.fadeOverlay} aria-hidden="true" />}
            {rewardId && (
              <RewardModal
                rewardId={rewardId}
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
