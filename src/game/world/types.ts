export type SectorStatus = 'locked' | 'open' | 'completed';

export type WorldAnimation = 'pulse' | 'none';

export type WorldSectorDef = {
  id: string;
  title: string;
  storyId: string | null;
  defaultStatus: SectorStatus;
  center: { x: number; y: number };
  radius: number;
  animation?: WorldAnimation;
};

export type WorldSector = WorldSectorDef & {
  status: SectorStatus;
  progress: number;
};

export type WorldHotspotView = {
  id: string;
  title: string;
  center: { x: number; y: number };
  radius: number;
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
