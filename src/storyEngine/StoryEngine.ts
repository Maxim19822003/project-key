import type { IStoryProvider } from '@/storyEngine/providers/IStoryProvider';
import type {
  Choice,
  ProjectManifest,
  Scene,
  Story,
  StoryEngineListener,
  StoryEngineState,
} from '@/storyEngine/types';

export class StoryEngine {
  private state: StoryEngineState = {
    projectId: '',
    storyId: '',
    project: null,
    story: null,
    scene: null,
    loading: false,
    error: null,
  };

  private listeners = new Set<StoryEngineListener>();
  private readonly provider: IStoryProvider;

  constructor(provider: IStoryProvider) {
    this.provider = provider;
  }

  subscribe(listener: StoryEngineListener): () => void {
    this.listeners.add(listener);
    listener(this.state);

    return () => {
      this.listeners.delete(listener);
    };
  }

  getState(): StoryEngineState {
    return this.state;
  }

  getProvider(): IStoryProvider {
    return this.provider;
  }

  async start(projectId: string, storyId: string): Promise<void> {
    this.updateState({
      projectId,
      storyId,
      project: null,
      story: null,
      scene: null,
      loading: true,
      error: null,
    });

    try {
      const project = await this.provider.loadProjectManifest(projectId);

      if (!project.stories.includes(storyId)) {
        throw new Error(`Story "${storyId}" is not listed in project manifest`);
      }

      const story = await this.provider.loadStory(projectId, storyId);
      const scene = await this.provider.loadScene(
        projectId,
        storyId,
        story.startScene,
      );

      this.updateState({
        project,
        story,
        scene,
        loading: false,
        error: null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown story error';

      this.updateState({
        project: null,
        story: null,
        scene: null,
        loading: false,
        error: message,
      });
    }
  }

  async selectChoice(choiceIndex: number): Promise<void> {
    const { projectId, storyId, scene } = this.state;

    if (!scene?.choices?.length) {
      return;
    }

    const choice = scene.choices[choiceIndex];

    if (!choice?.next) {
      return;
    }

    this.updateState({ loading: true, error: null });

    try {
      const nextScene = await this.provider.loadScene(
        projectId,
        storyId,
        choice.next,
      );

      this.updateState({
        scene: nextScene,
        loading: false,
        error: null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown scene error';

      this.updateState({
        loading: false,
        error: message,
      });
    }
  }

  getProject(): ProjectManifest | null {
    return this.state.project;
  }

  getStory(): Story | null {
    return this.state.story;
  }

  getScene(): Scene | null {
    return this.state.scene;
  }

  getChoices(): Choice[] {
    return this.state.scene?.choices ?? [];
  }

  private updateState(patch: Partial<StoryEngineState>): void {
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((listener) => listener(this.state));
  }
}

export function createStoryEngine(provider: IStoryProvider): StoryEngine {
  return new StoryEngine(provider);
}
