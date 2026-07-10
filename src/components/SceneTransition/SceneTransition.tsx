import type { ReactNode } from 'react';
import styles from './SceneTransition.module.css';

type SceneTransitionProps = {
  sceneKey: string;
  children: ReactNode;
};

export function SceneTransition({ sceneKey, children }: SceneTransitionProps) {
  return (
    <div key={sceneKey} className={styles.transition}>
      {children}
    </div>
  );
}
