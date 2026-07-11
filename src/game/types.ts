export type HotspotAction = 'navigate' | 'dialog' | 'locked';

export type HotspotAnimation = 'glow' | 'pulse' | 'sway' | 'blink' | 'flicker';

export type HotspotConfig = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  action: HotspotAction;
  animation?: HotspotAnimation;
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

export type InventoryItemDef = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  slotX: number;
  slotY: number;
  slotSize: number;
};
