import type { SceneLayout } from '@/game/sceneLayout/types';

export function serializeSceneLayout(layout: SceneLayout): string {
  return JSON.stringify(layout, null, 2);
}

export async function copySceneLayout(layout: SceneLayout): Promise<void> {
  await navigator.clipboard.writeText(serializeSceneLayout(layout));
}

export function exportSceneLayout(layout: SceneLayout, filename?: string): void {
  const blob = new Blob([serializeSceneLayout(layout)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename ?? `${layout.sceneId}.layout.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function parseSceneLayoutJson(source: string): SceneLayout {
  const parsed = JSON.parse(source) as SceneLayout;

  if (!parsed || parsed.version !== 1 || !parsed.sceneId || !Array.isArray(parsed.objects)) {
    throw new Error('Некорректный Scene Layout JSON');
  }

  return parsed;
}
