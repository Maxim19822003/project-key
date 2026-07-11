export type HotspotShape = 'rect' | 'circle' | 'ellipse';

export type HotspotAction = 'navigate' | 'dialog' | 'locked';

export type HotspotAnimation = 'pulse' | 'glow' | 'float' | 'sway' | 'blink' | 'fade';

export type HotspotConfig = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  shape?: HotspotShape;
  action: HotspotAction;
  primary?: boolean;
  animation?: HotspotAnimation | HotspotAnimation[];
  nextScene?: string;
  dialog?: string;
  lockedMessage?: string;
};

export type GameSave = {
  projectId: string;
  storyId: string;
  currentSceneId: string | null;
  foundItems: string[];
  storyStarted: boolean;
  storyCompleted: boolean;
};

export type ItemCategory =
  | 'all'
  | 'keys'
  | 'artifacts'
  | 'materials'
  | 'records'
  | 'other';

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export type InventoryItemDef = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: Exclude<ItemCategory, 'all'>;
  rarity: ItemRarity;
  usage: string;
  slotX: number;
  slotY: number;
  slotSize: number;
};
