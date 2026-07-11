export type SectorStatus = 'locked' | 'open' | 'completed';

export type SectorVisualState = 'locked' | 'available' | 'completed' | 'active';

export type SectorCenter = {
  x: number;
  y: number;
};

export type SectorBoundingBox = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type SectorEllipseShape = {
  type: 'ellipse';
  rx: number;
  ry: number;
};

export type SectorPolygonShape = {
  type: 'polygon';
  points: SectorCenter[];
};

export type SectorCustomPathShape = {
  type: 'customPath';
  d: string;
};

export type SectorShape =
  | SectorEllipseShape
  | SectorPolygonShape
  | SectorCustomPathShape;

/**
 * Слоты для будущих эффектов сектора.
 * Сейчас не используются — только архитектура для финального арта.
 */
export type SectorEffectSlot = {
  id: string;
  enabled: boolean;
} | null;

export type SectorEffectSlots = {
  animation: SectorEffectSlot;
  glow: SectorEffectSlot;
  particle: SectorEffectSlot;
  sound: SectorEffectSlot;
  music: SectorEffectSlot;
};

export type WorldSectorDef = {
  id: string;
  title: string;
  storyId: string | null;
  defaultStatus: SectorStatus;
  shape: SectorShape;
  center: SectorCenter;
  boundingBox: SectorBoundingBox;
  safePadding: number;
  labelPosition: SectorCenter;
  iconPosition: SectorCenter;
  effects: SectorEffectSlots;
};

export type WorldSector = WorldSectorDef & {
  status: SectorStatus;
  progress: number;
};

export type WorldHotspotView = {
  id: string;
  title: string;
  shape: SectorShape;
  center: SectorCenter;
  boundingBox: SectorBoundingBox;
  safePadding: number;
  labelPosition: SectorCenter;
  iconPosition: SectorCenter;
  status: SectorStatus;
  visualState: SectorVisualState;
  storyId: string | null;
  effects: SectorEffectSlots;
};

export type WorldMapConfig = {
  projectId: string;
  imageSrc: string;
  imageAlt: string;
};

export type SectorClickResult =
  | { type: 'navigate'; projectId: string; storyId: string }
  | { type: 'locked'; message: string }
  | { type: 'info'; message: string };

export const LOCKED_SECTOR_MESSAGE = 'Потребуется новый Ключ';
