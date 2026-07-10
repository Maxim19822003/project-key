import type {
  AssetCategory,
  ProjectManifest,
  Scene,
  Story,
} from '@/storyEngine/types';

export interface IStoryProvider {
  loadProjectManifest(projectId: string): Promise<ProjectManifest>;
  loadStory(projectId: string, storyId: string): Promise<Story>;
  loadScene(projectId: string, storyId: string, sceneId: string): Promise<Scene>;
  loadAssets(
    projectId: string,
    storyId: string,
    category: AssetCategory,
    filename: string,
  ): string;
}
