export type HotspotShape = 'rect' | 'circle' | 'ellipse';

export type HotspotAction = 'navigate' | 'dialog' | 'locked';

export type HotspotAnimation = 'sway';

export type HotspotConfig = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  shape?: HotspotShape;
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
