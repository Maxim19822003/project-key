export type ScreenId =
  | 'splash'
  | 'world'
  | 'story'
  | 'inventory'
  | 'settings';

export type NavItem = {
  id: ScreenId;
  label: string;
  path: string;
};
