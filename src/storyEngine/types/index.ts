import type { Scene } from './scene';
import type { Story } from './story';
import type { ProjectManifest } from './project';

export type { AssetCategory, StoryContext } from './context';
export type { Choice } from './choice';
export type { Item, ItemCatalog } from './item';
export type { ProjectManifest } from './project';
export type { Scene } from './scene';
export type { Story } from './story';

export type StoryEngineState = {
  projectId: string;
  storyId: string;
  project: ProjectManifest | null;
  story: Story | null;
  scene: Scene | null;
  loading: boolean;
  error: string | null;
};

export type StoryEngineListener = (state: StoryEngineState) => void;
