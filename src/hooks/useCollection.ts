import { useCallback, useMemo, useState } from 'react';
import {
  getCollectionCategories,
  getCollectionGrid,
  INVENTORY_ITEMS,
} from '@/game/inventory';
import type { InventoryItemDef, ItemCategory } from '@/game/types';
import { useGameSave } from '@/hooks/useGameSave';

export type CollectionSlot = {
  item: InventoryItemDef | null;
  index: number;
};

export function useCollection() {
  const { save } = useGameSave();
  const grid = getCollectionGrid();
  const categories = getCollectionCategories();

  const [activeCategory, setActiveCategory] = useState<ItemCategory>('all');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return INVENTORY_ITEMS;
    }

    return INVENTORY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const slots = useMemo(() => {
    const total = grid.columns * grid.rows;
    const result: CollectionSlot[] = [];

    for (let index = 0; index < total; index += 1) {
      result.push({
        item: filteredItems[index] ?? null,
        index,
      });
    }

    return result;
  }, [filteredItems, grid.columns, grid.rows]);

  const selectedItem = useMemo(
    () => INVENTORY_ITEMS.find((item) => item.id === selectedItemId) ?? null,
    [selectedItemId],
  );

  const isItemFound = useCallback(
    (itemId: string) => save.foundItems.includes(itemId),
    [save.foundItems],
  );

  const handleCategorySelect = useCallback((categoryId: ItemCategory) => {
    setActiveCategory(categoryId);
    setSelectedItemId(null);
  }, []);

  const handleItemSelect = useCallback((itemId: string) => {
    setSelectedItemId(itemId);
  }, []);

  const handlePopupClose = useCallback(() => {
    setSelectedItemId(null);
  }, []);

  return {
    categories,
    activeCategory,
    slots,
    selectedItem,
    selectedItemId,
    isItemFound,
    handleCategorySelect,
    handleItemSelect,
    handlePopupClose,
  };
}
