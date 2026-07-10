export const APP_DEFAULT_STORY = {
  projectId: 'key',
  storyId: 'neo_city',
} as const;

export const DEFAULT_STORY_PATH =
  `/story/${APP_DEFAULT_STORY.projectId}/${APP_DEFAULT_STORY.storyId}`;
