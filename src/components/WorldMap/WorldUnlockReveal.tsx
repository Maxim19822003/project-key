import { useEffect, useState } from 'react';
import type { WorldHotspotView } from '@/game/world/types';
import styles from './WorldUnlockReveal.module.css';

type WorldUnlockRevealProps = {
  sector: WorldHotspotView;
  onComplete: () => void;
};

export function WorldUnlockReveal({ sector, onComplete }: WorldUnlockRevealProps) {
  const [phase, setPhase] = useState<'dim' | 'flash' | 'text' | 'fade'>('dim');

  useEffect(() => {
    const dimTimer = window.setTimeout(() => setPhase('flash'), 280);
    const textTimer = window.setTimeout(() => setPhase('text'), 520);
    const fadeTimer = window.setTimeout(() => setPhase('fade'), 2520);
    const doneTimer = window.setTimeout(() => onComplete(), 2800);

    return () => {
      window.clearTimeout(dimTimer);
      window.clearTimeout(textTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={[
        styles.overlay,
        phase === 'fade' ? styles.overlayFadeOut : '',
      ]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-live="polite"
    >
      <div
        className={[
          styles.flash,
          phase === 'flash' || phase === 'text' ? styles.flashActive : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          left: `${sector.iconPosition.x}%`,
          top: `${sector.iconPosition.y}%`,
        }}
      />

      <div
        className={[
          styles.banner,
          phase === 'text' ? styles.bannerVisible : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          left: `${sector.labelPosition.x}%`,
          top: `${sector.labelPosition.y}%`,
        }}
      >
        <span className={styles.kicker}>Новый район открыт</span>
        <span className={styles.worldName}>{sector.title}</span>
      </div>
    </div>
  );
}
