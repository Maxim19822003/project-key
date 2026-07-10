import type { Item, ItemCatalog } from '@/storyEngine/types';

const ITEMS_CATALOG_PATH = '/content/items/items.json';

export class ItemLoader {
  private catalog: Item[] | null = null;

  async loadCatalog(): Promise<Item[]> {
    if (this.catalog) {
      return this.catalog;
    }

    const response = await fetch(ITEMS_CATALOG_PATH);

    if (!response.ok) {
      throw new Error(`Failed to load items catalog: ${response.status}`);
    }

    const data = (await response.json()) as ItemCatalog;
    this.catalog = data.items;
    return this.catalog;
  }

  async getItem(itemId: string): Promise<Item | undefined> {
    const items = await this.loadCatalog();
    return items.find((item) => item.id === itemId);
  }
}

export const itemLoader = new ItemLoader();
