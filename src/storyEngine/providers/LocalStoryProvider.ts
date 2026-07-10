import type { IStoryProvider } from '@/storyEngine/providers/IStoryProvider';
import type {
  AssetCategory,
  ProjectManifest,
  Scene,
  Story,
} from '@/storyEngine/types';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

const projectPaths = {
  manifest: (projectId: string) => `/projects/${projectId}/manifest.json`,
  story: (projectId: string, storyId: string) =>
    `/projects/${projectId}/stories/${storyId}/story.json`,
  scene: (projectId: string, storyId: string, sceneId: string) =>
    `/projects/${projectId}/stories/${storyId}/scenes/${sceneId}.json`,
  asset: (
    projectId: string,
    storyId: string,
    category: AssetCategory,
    filename: string,
  ) => `/projects/${projectId}/stories/${storyId}/assets/${category}/${filename}`,
};

export class LocalStoryProvider implements IStoryProvider {
  async loadProjectManifest(projectId: string): Promise<ProjectManifest> {
    const manifest = await fetchJson<ProjectManifest>(projectPaths.manifest(projectId));

    if (!manifest.id || !Array.isArray(manifest.stories)) {
      throw new Error(`Invalid project manifest: ${projectPaths.manifest(projectId)}`);
    }

    return manifest;
  }

  async loadStory(projectId: string, storyId: string): Promise<Story> {
    const story = await fetchJson<Story>(projectPaths.story(projectId, storyId));

    if (!story.id || !story.startScene) {
      throw new Error(`Invalid story manifest: ${projectPaths.story(projectId, storyId)}`);
    }

    return story;
  }

  async loadScene(
    projectId: string,
    storyId: string,
    sceneId: string,
  ): Promise<Scene> {
    const scene = await fetchJson<Scene>(
      projectPaths.scene(projectId, storyId, sceneId),
    );

    if (!scene.id) {
      throw new Error(
        `Invalid scene: ${projectPaths.scene(projectId, storyId, sceneId)}`,
      );
    }

    return scene;
  }

  loadAssets(
    projectId: string,
    storyId: string,
    category: AssetCategory,
    filename: string,
  ): string {
    return projectPaths.asset(projectId, storyId, category, filename);
  }
}

export const localStoryProvider = new LocalStoryProvider();
