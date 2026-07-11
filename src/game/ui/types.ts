import type { LayoutRect } from '@/game/layout/types';

export type GlobalSafeZone = {
  topBar: { yFrom: number; yTo: number };
  bottomMenu: { yFrom: number; yTo: number };
  note: string;
};

export type TopBarElements = {
  avatar: LayoutRect;
  playerName: LayoutRect;
  level: LayoutRect;
  keys: LayoutRect;
  energy: LayoutRect;
  settings: LayoutRect;
};

export type TopBarLayout = {
  height: number;
  region: LayoutRect;
  elements: TopBarElements;
};

export type BottomMenuItemLayout = {
  id: string;
  icon: string;
  label: string;
  region: LayoutRect;
  path: string;
  activeState: string;
  inactiveState: string;
};

export type BottomMenuLayout = {
  height: number;
  region: LayoutRect;
  items: BottomMenuItemLayout[];
};

export type PopupSections = {
  title: LayoutRect;
  content: LayoutRect;
  buttons: LayoutRect;
  close: LayoutRect;
};

export type PopupLayout = {
  region: LayoutRect;
  sections: PopupSections;
};

export type DialogSections = {
  portrait: LayoutRect;
  name: LayoutRect;
  text: LayoutRect;
  buttons: LayoutRect;
};

export type DialogLayout = {
  region: LayoutRect;
  sections: DialogSections;
};

export type ToastType = 'item_found' | 'key_received' | 'error' | 'saved';

export type ToastLayout = {
  region: LayoutRect;
  types: ToastType[];
};

export type LoadingSections = {
  logo: LayoutRect;
  progressBar: LayoutRect;
  hint: LayoutRect;
};

export type LoadingLayout = {
  region: LayoutRect;
  sections: LoadingSections;
};

export type GlobalUILayout = {
  screen: 'global_ui';
  coordinateSystem: { x: [number, number]; y: [number, number] };
  rules: string[];
  globalSafeZone: GlobalSafeZone;
  topBar: TopBarLayout;
  bottomMenu: BottomMenuLayout;
  popup: PopupLayout;
  dialog: DialogLayout;
  toast: ToastLayout;
  loading: LoadingLayout;
};
