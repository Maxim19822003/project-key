import type { InventoryItemDef } from '@/game/types';

export const INVENTORY_ITEMS: InventoryItemDef[] = [
  {
    id: 'battery',
    name: 'Батарейка',
    description: 'Ещё тёплая на ощупь. Зверёк был бы рад.',
    emoji: '🔋',
    slotX: 8,
    slotY: 38,
    slotSize: 16,
  },
  {
    id: 'bolt',
    name: 'Болт',
    description: 'Тяжёлый болт. Зверёк сказал, что пригодится.',
    emoji: '🔩',
    slotX: 28,
    slotY: 38,
    slotSize: 16,
  },
  {
    id: 'cassette',
    name: 'Кассета',
    description: 'Старая кассета с пометкой «Запись №7».',
    emoji: '📼',
    slotX: 48,
    slotY: 38,
    slotSize: 16,
  },
  {
    id: 'damaged_robot',
    name: 'Повреждённый зверёк',
    description: 'Механический зверёк, которого ты выключил.',
    emoji: '🤖',
    slotX: 68,
    slotY: 38,
    slotSize: 16,
  },
  {
    id: 'old_token',
    name: 'Старый жетон',
    description: 'Потёртый металлический жетон с незнакомым символом.',
    emoji: '🎟',
    slotX: 88,
    slotY: 38,
    slotSize: 12,
  },
];
