import { rectToPercentStyle } from '@/game/layout/rectToStyle';
import type { CollectionLayout } from '@/game/inventory/types';
import type { InventoryItemDef } from '@/game/types';
import styles from './ItemPopup.module.css';

const RARITY_LABELS: Record<InventoryItemDef['rarity'], string> = {
  common: 'Обычный',
  uncommon: 'Необычный',
  rare: 'Редкий',
  legendary: 'Легендарный',
};

type ItemPopupProps = {
  popup: CollectionLayout['popup'];
  item: InventoryItemDef;
  found: boolean;
  onClose: () => void;
};

export function ItemPopup({ popup, item, found, onClose }: ItemPopupProps) {
  const { sections } = popup;

  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <div
        className={styles.popup}
        style={rectToPercentStyle(popup)}
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          style={rectToPercentStyle(sections.closeButton)}
          aria-label="Закрыть"
          onClick={onClose}
        >
          ✕
        </button>

        <div className={styles.iconArea} style={rectToPercentStyle(sections.icon)}>
          <span className={styles.icon} aria-hidden="true">
            {found ? item.emoji : '░'}
          </span>
        </div>

        <div className={styles.titleArea} style={rectToPercentStyle(sections.title)}>
          <h2 className={styles.title}>{found ? item.name : '???'}</h2>
        </div>

        <div className={styles.rarityArea} style={rectToPercentStyle(sections.rarity)}>
          <p className={styles.rarity}>
            {found ? RARITY_LABELS[item.rarity] : 'Неизвестно'}
          </p>
        </div>

        <div
          className={styles.descriptionArea}
          style={rectToPercentStyle(sections.description)}
        >
          <p className={styles.description}>
            {found ? item.description : 'Этот предмет ещё не найден.'}
          </p>
        </div>

        <div className={styles.usageArea} style={rectToPercentStyle(sections.usage)}>
          <p className={styles.usage}>
            {found ? `Где используется: ${item.usage}` : '—'}
          </p>
        </div>
      </div>
    </div>
  );
}
