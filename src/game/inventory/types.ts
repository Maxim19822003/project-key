import type { LayoutRect } from '@/game/layout/types';

export type { LayoutRect };

export type CollectionCategoryDef = {
  id: string;
  title: string;
  icon: string;
};

export type CollectionGridLayout = {
  columns: number;
  rows: number;
  gap: number;
  padding: number;
  cardAspectRatio: number;
};

export type CollectionCardLayout = {
  icon: { size: number };
  title: { maxLines: number };
  rarity: { visible: boolean };
  count: { visible: boolean };
  lockedOverlay: { opacity: number };
  selectedState: { borderWidth: number };
  hoverState: { opacity: number };
};

export type CollectionPopupSections = {
  icon: LayoutRect;
  title: LayoutRect;
  rarity: LayoutRect;
  description: LayoutRect;
  usage: LayoutRect;
  closeButton: LayoutRect;
};

export type CollectionLayout = {
  screen: 'collection';
  coordinateSystem: { x: [number, number]; y: [number, number] };
  regions: {
    topBar: LayoutRect;
    categories: LayoutRect;
    items: LayoutRect;
    bottomMenu: LayoutRect;
  };
  background: {
    imageSrc: string;
    imageAlt: string;
  };
  categories: CollectionCategoryDef[];
  grid: CollectionGridLayout;
  card: CollectionCardLayout;
  popup: LayoutRect & {
    sections: CollectionPopupSections;
  };
};
