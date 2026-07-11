import type { SectorCenter, SectorShape } from '@/game/world/types';

export type SectorShapeRenderData =
  | {
      kind: 'ellipse';
      cx: number;
      cy: number;
      rx: number;
      ry: number;
    }
  | {
      kind: 'polygon';
      points: string;
    }
  | {
      kind: 'customPath';
      d: string;
    };

export function pointsToSvg(points: SectorCenter[]): string {
  return points.map((point) => `${point.x},${point.y}`).join(' ');
}

export function getSectorShapeRenderData(
  shape: SectorShape,
  center: SectorCenter,
): SectorShapeRenderData {
  if (shape.type === 'ellipse') {
    return {
      kind: 'ellipse',
      cx: center.x,
      cy: center.y,
      rx: shape.rx,
      ry: shape.ry,
    };
  }

  if (shape.type === 'polygon') {
    return {
      kind: 'polygon',
      points: pointsToSvg(shape.points),
    };
  }

  return {
    kind: 'customPath',
    d: shape.d,
  };
}

export function formatCoordinate(point: SectorCenter): string {
  return `${point.x.toFixed(1)}, ${point.y.toFixed(1)}`;
}
