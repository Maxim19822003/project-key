import { CategorySidebar } from '@/components/Collection/CategorySidebar';
import { ItemGrid } from '@/components/Collection/ItemGrid';
import { ItemPopup } from '@/components/Collection/ItemPopup';
import {
  getCollectionBackground,
  getCollectionCardLayout,
  getCollectionGrid,
  getCollectionPopupLayout,
  getCollectionRegions,
} from '@/game/inventory';
import type { CollectionCategoryDef } from '@/game/inventory/types';
import type { CollectionSlot } from '@/hooks/useCollection';
import type { ItemCategory, InventoryItemDef } from '@/game/types';
import styles from './CollectionView.module.css';

type CollectionViewProps = {
  categories: CollectionCategoryDef[];
  activeCategory: ItemCategory;
  slots: CollectionSlot[];
  selectedItem: InventoryItemDef | null;
  selectedItemId: string | null;
  isItemFound: (itemId: string) => boolean;
  onCategorySelect: (categoryId: ItemCategory) => void;
  onItemSelect: (itemId: string) => void;
  onPopupClose: () => void;
};

const background = getCollectionBackground();
const grid = getCollectionGrid();
const cardLayout = getCollectionCardLayout();
const popupLayout = getCollectionPopupLayout();
const regions = getCollectionRegions();

export function CollectionView({
  categories,
  activeCategory,
  slots,
  selectedItem,
  selectedItemId,
  isItemFound,
  onCategorySelect,
  onItemSelect,
  onPopupClose,
}: CollectionViewProps) {
  return (
    <div className={styles.collectionView}>
      <img
        className={styles.background}
        src={background.imageSrc}
        alt={background.imageAlt}
      />
      <div
        className={styles.content}
        style={{
          gridTemplateColumns: `${regions.categories.w}% ${regions.items.w}%`,
        }}
      >
        <CategorySidebar
          categories={categories}
          activeCategory={activeCategory}
          onSelect={onCategorySelect}
        />
        <ItemGrid
          slots={slots}
          grid={grid}
          cardLayout={cardLayout}
          selectedItemId={selectedItemId}
          isItemFound={isItemFound}
          onItemSelect={onItemSelect}
        />
      </div>
      {selectedItem && (
        <ItemPopup
          popup={popupLayout}
          item={selectedItem}
          found={isItemFound(selectedItem.id)}
          onClose={onPopupClose}
        />
      )}
    </div>
  );
}
