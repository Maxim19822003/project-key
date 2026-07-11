import type { EditorRegion } from '@/editor/types';
import { rectToHotspot } from '@/editor/coordinates';

export function buildRegionJson(region: EditorRegion): string {
  const payload = buildRegionPayload(region);
  return JSON.stringify(payload, null, 2);
}

function buildRegionPayload(region: EditorRegion): Record<string, unknown> {
  if (region.type === 'hotspot') {
    const hotspotRect = rectToHotspot(region.localRect);
    return {
      ...region.data,
      x: Math.round(hotspotRect.x * 10) / 10,
      y: Math.round(hotspotRect.y * 10) / 10,
      width: Math.round(hotspotRect.width * 10) / 10,
      height: Math.round(hotspotRect.height * 10) / 10,
    };
  }

  if (region.type === 'sector') {
    const center = {
      x: Math.round((region.localRect.x + region.localRect.w / 2) * 10) / 10,
      y: Math.round((region.localRect.y + region.localRect.h / 2) * 10) / 10,
    };

    return {
      ...region.data,
      center,
      boundingBox: {
        x: Math.round(region.localRect.x * 10) / 10,
        y: Math.round(region.localRect.y * 10) / 10,
        w: Math.round(region.localRect.w * 10) / 10,
        h: Math.round(region.localRect.h * 10) / 10,
      },
    };
  }

  return {
    ...region.data,
    x: Math.round(region.localRect.x * 10) / 10,
    y: Math.round(region.localRect.y * 10) / 10,
    w: Math.round(region.localRect.w * 10) / 10,
    h: Math.round(region.localRect.h * 10) / 10,
  };
}

export async function copyRegionJson(region: EditorRegion): Promise<void> {
  const json = buildRegionJson(region);
  await navigator.clipboard.writeText(json);
}
