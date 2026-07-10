import type { Choice } from '@/types';
import { Navigate, useParams } from 'react-router-dom';
import {
  BottomBar,
  ChoiceButton,
  Dialog,
  Loading,
  SceneImage,
  TopBar,
  TypewriterText,
} from '@/components';
import { useStoryEngine } from '@/hooks';
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
  const {
    scene,
    story,
    choices,
    backgroundUrl,
    loading,
    error,
    selectChoice,
  } = useStoryEngine(projectId, storyId);

  const screenTitle = scene?.title ?? story?.title ?? 'Story';

  return (
    <div className="screen">
      <TopBar title={screenTitle} />
      <div className={`screen__body ${styles.body}`}>
        {loading && !scene ? (
          <Loading label="Loading story" />
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <>
            <SceneImage
              src={backgroundUrl}
              alt={scene?.title ?? 'Scene background'}
            />
            <Dialog>
              <TypewriterText text={scene?.text ?? ''} />
              {choices.length > 0 && (
                <div className={styles.choices}>
                  {choices.map((choice: Choice, index: number) => (
                    <ChoiceButton
                      key={`${choice.text}-${index}`}
                      label={choice.text}
                      disabled={loading}
                      onClick={() => selectChoice(index)}
                    />
                  ))}
                </div>
              )}
            </Dialog>
          </>
        )}
      </div>
      <BottomBar />
    </div>
  );
}
