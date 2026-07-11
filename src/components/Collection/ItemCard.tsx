import type { CollectionCardLayout } from '@/game/inventory/types';
import type { InventoryItemDef } from '@/game/types';
import styles from './ItemCard.module.css';

const RARITY_LABELS: Record<InventoryItemDef['rarity'], string> = {
  common: 'Обычный',
  uncommon: 'Необычный',
  rare: 'Редкий',
  legendary: 'Легендарный',
};

type ItemCardProps = {
  item: InventoryItemDef | null;
  found: boolean;
  selected: boolean;
  cardLayout: CollectionCardLayout;
  onSelect: (itemId: string) => void;
};

export function ItemCard({
  item,
  found,
  selected,
  cardLayout,
  onSelect,
}: ItemCardProps) {
  const isEmpty = !item;
  const isLocked = isEmpty || !found;

  return (
    <button
      type="button"
      className={[
        styles.card,
        isLocked ? styles.locked : '',
        selected ? styles.selected : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ['--card-locked-opacity' as string]: String(cardLayout.lockedOverlay.opacity),
        ['--card-selected-border' as string]: `${cardLayout.selectedState.borderWidth}px`,
        ['--card-hover-opacity' as string]: String(cardLayout.hoverState.opacity),
      }}
      disabled={isEmpty}
      aria-label={item?.name ?? 'Пустой слот'}
      onClick={() => item && onSelect(item.id)}
    >
      {isLocked && <span className={styles.lockedOverlay} aria-hidden="true" />}
      {item ? (
        <>
          <span className={styles.icon} aria-hidden="true">
            {found ? item.emoji : '░'}
          </span>
          <span
            className={styles.title}
            style={{ WebkitLineClamp: cardLayout.title.maxLines }}
          >
            {found ? item.name : '???'}
          </span>
          {cardLayout.rarity.visible && (
            <span className={styles.rarity}>
              {found ? RARITY_LABELS[item.rarity] : '—'}
            </span>
          )}
          {cardLayout.count.visible && (
            <span className={styles.count}>{found ? '×1' : ''}</span>
          )}
        </>
      ) : (
        <span className={styles.empty}>—</span>
      )}
    </button>
  );
}
