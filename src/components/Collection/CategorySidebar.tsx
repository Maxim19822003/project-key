import type { CollectionCategoryDef } from '@/game/inventory/types';
import type { ItemCategory } from '@/game/types';
import styles from './CategorySidebar.module.css';

type CategorySidebarProps = {
  categories: CollectionCategoryDef[];
  activeCategory: ItemCategory;
  onSelect: (categoryId: ItemCategory) => void;
};

export function CategorySidebar({
  categories,
  activeCategory,
  onSelect,
}: CategorySidebarProps) {
  return (
    <nav className={styles.sidebar} aria-label="Категории коллекции">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={[
            styles.category,
            activeCategory === category.id ? styles.active : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => onSelect(category.id as ItemCategory)}
        >
          <span className={styles.icon} aria-hidden="true">
            {category.icon}
          </span>
          <span className={styles.label}>{category.title}</span>
        </button>
      ))}
    </nav>
  );
}
