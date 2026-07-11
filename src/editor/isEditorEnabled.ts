/**
 * Editor Mode включается только при разработке разметки.
 * В обычной игре этот модуль не загружается и не влияет на производительность.
 */
export function isEditorEnabled(): boolean {
  if (import.meta.env.VITE_EDITOR === 'true') {
    return true;
  }

  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search).has('editor');
  }

  return false;
}
