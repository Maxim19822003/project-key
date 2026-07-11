export { rectToPercentStyle } from '@/game/layout/rectToStyle';

export function getMenuItemStateClass(
  isActive: boolean,
  activeState: string,
  inactiveState: string,
): string {
  return isActive ? activeState : inactiveState;
}

const TOAST_LABELS = {
  item_found: 'Получена находка',
  key_received: 'Получен Ключ',
  error: 'Ошибка',
  saved: 'Сохранено',
} as const;

export function getToastLabel(type: keyof typeof TOAST_LABELS): string {
  return TOAST_LABELS[type];
}
