import uiLayoutSource from '../../../docs/UI_LAYOUT.md?raw';
import { extractLayoutJson } from '@/game/layout/parseUiLayout';
import type { CollectionLayout } from '@/game/inventory/types';

const collectionLayout = extractLayoutJson<CollectionLayout>(
  uiLayoutSource,
  'collection',
);

export function getCollectionLayout(): CollectionLayout {
  return collectionLayout;
}

export function getCollectionRegions() {
  return collectionLayout.regions;
}

export function getCollectionCategories() {
  return collectionLayout.categories;
}

export function getCollectionGrid() {
  return collectionLayout.grid;
}

export function getCollectionCardLayout() {
  return collectionLayout.card;
}

export function getCollectionPopupLayout() {
  return collectionLayout.popup;
}

export function getCollectionBackground() {
  return collectionLayout.background;
}
