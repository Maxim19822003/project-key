import { ItemCard } from '@/components/Collection/ItemCard';
import type { CollectionGridLayout, CollectionCardLayout } from '@/game/inventory/types';
import type { CollectionSlot } from '@/hooks/useCollection';
import styles from './ItemGrid.module.css';

type ItemGridProps = {
  slots: CollectionSlot[];
  grid: CollectionGridLayout;
  cardLayout: CollectionCardLayout;
  selectedItemId: string | null;
  isItemFound: (itemId: string) => boolean;
  onItemSelect: (itemId: string) => void;
};

export function ItemGrid({
  slots,
  grid,
  cardLayout,
  selectedItemId,
  isItemFound,
  onItemSelect,
}: ItemGridProps) {
  return (
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
        gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
        gap: `${grid.gap}%`,
        padding: `${grid.padding}%`,
        ['--card-aspect-ratio' as string]: String(grid.cardAspectRatio),
      }}
    >
      {slots.map((slot) => (
        <ItemCard
          key={slot.index}
          item={slot.item}
          found={slot.item ? isItemFound(slot.item.id) : false}
          selected={slot.item?.id === selectedItemId}
          cardLayout={cardLayout}
          onSelect={onItemSelect}
        />
      ))}
    </div>
  );
}
