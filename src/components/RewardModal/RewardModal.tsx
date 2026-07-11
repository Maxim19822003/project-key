import { INVENTORY_ITEMS } from '@/game/inventory';
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

  const item = INVENTORY_ITEMS.find((entry) => entry.id === rewardId);
  const emoji = item?.emoji ?? '✨';
  const label = item?.name ?? rewardId;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <p className={styles.caption}>Найдена находка</p>
        <div className={styles.reward}>
          <span className={styles.emoji} aria-hidden="true">
            {emoji}
          </span>
          <span className={styles.label}>{label}</span>
        </div>
        <p className={styles.note}>Добавлено в коллекцию</p>
        <button type="button" className={styles.button} onClick={onContinue}>
          Продолжить
        </button>
      </div>
    </div>
  );
}
