import { BottomBar, CollectionView, TopBar } from '@/components';
import { getCollectionRegions } from '@/game/inventory';
import { useCollection } from '@/hooks/useCollection';
import styles from './InventoryScreen.module.css';

const regions = getCollectionRegions();

export function InventoryScreen() {
  const {
    categories,
    activeCategory,
    slots,
    selectedItem,
    selectedItemId,
    isItemFound,
    handleCategorySelect,
    handleItemSelect,
    handlePopupClose,
  } = useCollection();

  return (
    <div
      className={styles.collectionScreen}
      style={{
        gridTemplateRows: `${regions.topBar.h}% ${regions.categories.h}% ${regions.bottomMenu.h}%`,
      }}
    >
      <div className={styles.topZone}>
        <TopBar title="Коллекция" subtitle="Находки" />
      </div>
      <div className={styles.contentZone}>
        <CollectionView
          categories={categories}
          activeCategory={activeCategory}
          slots={slots}
          selectedItem={selectedItem}
          selectedItemId={selectedItemId}
          isItemFound={isItemFound}
          onCategorySelect={handleCategorySelect}
          onItemSelect={handleItemSelect}
          onPopupClose={handlePopupClose}
        />
      </div>
      <div className={styles.bottomZone}>
        <BottomBar />
      </div>
    </div>
  );
}
