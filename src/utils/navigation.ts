import type { NavItem } from '@/types';
import { DEFAULT_STORY_PATH } from '@/app/config';

export const NAV_ITEMS: NavItem[] = [
  { id: 'world', label: 'Мир', path: '/world' },
  { id: 'story', label: 'История', path: DEFAULT_STORY_PATH },
  { id: 'inventory', label: 'Коллекция', path: '/inventory' },
  { id: 'settings', label: 'Настройки', path: '/settings' },
];
