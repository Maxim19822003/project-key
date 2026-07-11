import { rectToPercentStyle } from '@/game/layout/rectToStyle';
import { INVENTORY_ITEMS } from '@/game/inventory';
import type { StoryLayout } from '@/game/storyLayout/types';
import styles from './StoryRewardPopup.module.css';

const RARITY_LABELS = {
  common: 'Обычный',
  uncommon: 'Необычный',
  rare: 'Редкий',
  legendary: 'Легендарный',
} as const;

type StoryRewardPopupProps = {
  popup: StoryLayout['rewardPopup'];
  rewardId: string;
  continueLabel: string;
  onContinue: () => void;
};

export function StoryRewardPopup({
  popup,
  rewardId,
  continueLabel,
  onContinue,
}: StoryRewardPopupProps) {
  const item = INVENTORY_ITEMS.find((entry) => entry.id === rewardId);
  const emoji = item?.emoji ?? '✨';
  const name = item?.name ?? rewardId;
  const description = item?.description ?? 'Новая находка для коллекции.';
  const rarity = item ? RARITY_LABELS[item.rarity] : 'Неизвестно';
  const { sections } = popup;

  return (
    <div className={styles.backdrop} role="presentation">
      <div
        className={styles.popup}
        style={rectToPercentStyle(popup)}
        role="dialog"
        aria-modal="true"
        aria-label="Найдена находка"
      >
        <div className={styles.iconArea} style={rectToPercentStyle(sections.icon)}>
          <span className={styles.icon} aria-hidden="true">
            {emoji}
          </span>
        </div>

        <div className={styles.titleArea} style={rectToPercentStyle(sections.title)}>
          <h2 className={styles.title}>{name}</h2>
        </div>

        <div
          className={styles.descriptionArea}
          style={rectToPercentStyle(sections.description)}
        >
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.rarityArea} style={rectToPercentStyle(sections.rarity)}>
          <p className={styles.rarity}>{rarity}</p>
        </div>

        <button
          type="button"
          className={styles.continueButton}
          style={rectToPercentStyle(sections.continueButton)}
          onClick={onContinue}
        >
          {continueLabel}
        </button>
      </div>
    </div>
  );
}
