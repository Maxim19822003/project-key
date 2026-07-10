import type { Choice } from './choice';

export type Scene = {
  id: string;
  background?: string;
  title?: string;
  text?: string;
  music?: string;
  ambient?: string;
  animation?: string;
  choices?: Choice[];
  reward?: string;
  item?: string;
  sound?: string;
  effect?: string;
  flags?: Record<string, boolean | string | number>;
};
