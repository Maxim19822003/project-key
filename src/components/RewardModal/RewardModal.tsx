import { getRewardDisplay } from '@/app/rewards';
import styles from './RewardModal.module.css';

type RewardModalProps = {
  rewardId: string;
  visible: boolean;
  onContinue: () => void;
};

export function RewardModal({ rewardId, visible, onContinue }: RewardModalProps) {
  if (!visible) {
    return null;
  }

  const reward = getRewardDisplay(rewardId);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <p className={styles.caption}>Получена находка</p>
        <div className={styles.reward}>
          <span className={styles.emoji} aria-hidden="true">
            {reward.emoji}
          </span>
          <span className={styles.label}>{reward.label}</span>
        </div>
        <button type="button" className={styles.button} onClick={onContinue}>
          Продолжить
        </button>
      </div>
    </div>
  );
}
