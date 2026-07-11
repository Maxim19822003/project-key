export type SectorStatus = 'locked' | 'open' | 'completed';

export type WorldShapeType = 'circle' | 'ellipse' | 'polygon';

export type WorldAnimation = 'pulse' | 'none';

export type WorldCoordinates = {
  cx: number;
  cy: number;
  rx: number;
  ry?: number;
  points?: Array<{ x: number; y: number }>;
};

export type WorldSectorDef = {
  id: string;
  title: string;
  description: string;
  storyId: string | null;
  requiredKey: string | null;
  defaultStatus: SectorStatus;
  shape: WorldShapeType;
  coordinates: WorldCoordinates;
  animation?: WorldAnimation;
};

export type WorldSector = WorldSectorDef & {
  status: SectorStatus;
  progress: number;
};

export type WorldHotspotView = {
  id: string;
  title: string;
  description: string;
  shape: WorldShapeType;
  coordinates: WorldCoordinates;
  status: SectorStatus;
  animation: WorldAnimation;
  storyId: string | null;
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
