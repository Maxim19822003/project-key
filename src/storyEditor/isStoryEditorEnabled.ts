export function isStoryEditorEnabled(): boolean {
  if (import.meta.env.VITE_STORY_EDITOR === 'true') {
    return true;
  }

  if (typeof window === 'undefined') {
    return false;
  }

  const params = new URLSearchParams(window.location.search);

  if (params.has('storyEditor')) {
    return true;
  }

  return params.has('editor') && params.get('story') === '1';
}
